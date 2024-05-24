import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const login = async (req, res) => {
    try {
        if (req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }
        const { usernameOrEmail, password } = req.body;

        const user = await User.findOne({ email: usernameOrEmail });

        if (!user) return res.status(400).json({ msg: "User not found. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
        delete user.password;

        const { _id, email, name, balance, bonusBalance, isAdmin, isInfluencer } = user;
        res.status(200).json({ user: { _id, username, email, name, verified, picturePath }, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

/* RECOVER PASSWORD */
export const recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
