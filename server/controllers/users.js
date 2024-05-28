import mongoose from "mongoose";
import User from "../models/User.js";

/* READ */
export const getBalance = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('balance bonusBalance cpaBalance revShareBalance');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            balance: user.balance,
            bonusBalance: user.bonusBalance,
            cpaBalance: user.cpaBalance,
            revShareBalance: user.revShareBalance,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAffiliateData = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findOne({ _id: userId })
            .select('cpaBalance revShareBalance referredUsers');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const referredUsersCount = user.referredUsers.length;

        res.status(200).json({
            cpaBalance: user.cpaBalance,
            revShareBalance: user.revShareBalance,
            referredUsers: referredUsersCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

