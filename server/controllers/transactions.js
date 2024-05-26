import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import affiliateOperation from "../models/affiliateOperation.js";

/* CREATE */
export const createDeposit = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId } = req.params;
        const { operationAmount } = req.body;
        const operation = 'deposit';
        const status = 'concluded';

        const newDeposit = new Transaction({
            userId,
            operation,
            operationAmount,
            status
        });

        await newDeposit.save({ session });

        const user = await User.findById(userId).session(session);

        if (!user) {
            throw new Error('User not found');
        }

        user.balance += operationAmount;
        user.bonusBalance += operationAmount;
        user.transactions.push(newDeposit._id);

        if (user.referrerId) {
            const referrer = await User.findById(user.referrerId).session(session);

            if (!referrer) {
                throw new Error('Referrer not found');
            }

            const affiliateOperationAmount = operationAmount * 0.1;

            const newAffiliateOperation = new affiliateOperation({
                userId: referrer._id,
                referredUserId: user._id,
                operation: 'cpa',
                operationAmount: affiliateOperationAmount
            });

            await newAffiliateOperation.save({ session });

            referrer.affiliateBalance += affiliateOperationAmount;
            referrer.affiliateOperations.push(newAffiliateOperation._id);

            await referrer.save({ session });
        }

        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ newDeposit });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        res.status(500).json({ error: err.message });
    }
}

export const createWithdraw = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const createAffiliateWithdraw = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}