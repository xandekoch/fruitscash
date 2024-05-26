import mongoose from "mongoose";
import schedule from 'node-schedule';
import Bet from "../models/Bet.js";
import User from "../models/User.js";
import AffiliateOperation from "../models/affiliateOperation.js";

/* CREATE */
export const createBet = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId } = req.params;
        const { betAmount } = req.body;
        const returnedAmount = 0;
        const outcomeAmount = returnedAmount - betAmount;

        const user = await User.findById(userId).session(session);
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the user has sufficient funds
        const totalBalance = user.balance + user.bonusBalance;
        if (totalBalance < betAmount) {
            throw new Error('Insufficient balance');
        }

        // Deduct betAmount from bonusBalance first, then from balance if needed
        if (user.bonusBalance >= betAmount) {
            user.bonusBalance -= betAmount;
        } else {
            const remainingBetAmount = betAmount - user.bonusBalance;
            user.bonusBalance = 0;
            user.balance -= remainingBetAmount;
        }

        const bet = new Bet({ userId, betAmount, result: 'loss', returnedAmount, outcomeAmount });
        await bet.save({ session });

        user.bets.push(bet._id);
        await user.save({ session });

        await session.commitTransaction();
        res.status(201).json({ bet });

        // Schedule affiliate operation to run after 15 minutes
        schedule.scheduleJob(bet._id.toString(), new Date(Date.now() + 15 * 60000), async () => {
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                const updatedBet = await Bet.findById(bet._id).session(session);
                if (updatedBet.result === 'loss') {
                    const referrerUser = await User.findById(user.referrerUser).session(session);
                    if (referrerUser) {
                        const operationAmount = betAmount * 0.1;
                        const newAffiliateOperation = new AffiliateOperation({
                            userId: referrerUser._id,
                            referredUserId: userId,
                            operation: 'revShare',
                            operationAmount,
                        });

                        await newAffiliateOperation.save({ session });

                        referrerUser.affiliateBalance += operationAmount;
                        referrerUser.affiliateOperations.push(newAffiliateOperation._id);
                        await referrerUser.save({ session });

                        await session.commitTransaction();
                    }
                }
            } catch (error) {
                await session.abortTransaction();
                console.error('Error executing scheduled affiliate operation:', error);
            } finally {
                session.endSession();
            }
        });

    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ error: err.message });
    } finally {
        session.endSession();
    }
}

/* UPDATE */
export const updateBet = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId, betId } = req.params;
        const { score } = req.body;
        const returnedAmount = score;

        const bet = await Bet.findById(betId).select('betAmount').session(session);

        if (!bet) {
            return res.status(404).json({ error: 'Aposta não encontrada' });
        }

        const betAmount = bet.betAmount;
        const outcomeAmount = returnedAmount - betAmount;

        bet.result = 'win';
        bet.returnedAmount = returnedAmount;
        bet.outcomeAmount = outcomeAmount;

        await bet.save({ session });

        const user = await User.findById(userId).session(session);
        if (!user) {
            throw new Error('User not found');
        }

        user.balance += score;
        await user.save({ session });

        await session.commitTransaction();
        res.status(201).json({ bet });
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ error: err.message });
    } finally {
        session.endSession();
    }
}