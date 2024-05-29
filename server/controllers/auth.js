import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const register = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {
            email,
            password,
            code,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
        });

        await newUser.save({ session });

        if (code) {
            try {
                const referrerUser = await User.findById(code).session(session);
                if (referrerUser) {
                    referrerUser.referredUsers.push(newUser._id);
                    await referrerUser.save({ session });
    
                    newUser.referrerUser = code;
                    await newUser.save({ session });
                }
            } catch (error) {
                
            }
        }

        await session.commitTransaction();
        res.status(201).json({ message: 'Conta criada com sucesso.' });
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ error: err.message });
    } finally {
        session.endSession();
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ msg: "User not found. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '12h' });
        delete user.password;

        const { _id, isAdmin, isInfluencer } = user;
        res.status(200).json({ user: { _id, email, isAdmin, isInfluencer }, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* RECOVER PASSWORD */
const generateRandomPassword = (length = 8) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
};

const sendEmail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        text: text
    };

    await transporter.sendMail(mailOptions);
};

export const recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newPassword = generateRandomPassword();

        const salt = await bcrypt.genSalt();
        const newPasswordHash = await bcrypt.hash(newPassword, salt);

        user.password = newPasswordHash;
        await user.save();

        await sendEmail(email, 'Recuperação de Senha', `Sua nova senha é: ${newPassword}`);
        delete user.password;
        delete {newPassword};

        res.status(200).json({ message: 'New passwd generated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
