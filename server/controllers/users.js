import User from "../models/User.js";

/* READ */
export const getBalance = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select('balance bonusBalance affiliateBalance');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            balance: user.balance,
            bonusBalance: user.bonusBalance,
            affiliateBalance: user.affiliateBalance,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};