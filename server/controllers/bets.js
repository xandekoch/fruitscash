import mongoose from "mongoose";
import schedule from 'node-schedule';
import Bet from "../models/Bet.js";
import User from "../models/User.js";
import AffiliateOperation from "../models/affiliateOperation.js";

/* CREATE */
export const createBet = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { userId } = req.params;
    let { betAmount } = req.body;
    const returnedAmount = 0;
    const outcomeAmount = returnedAmount - betAmount;
    let isBonus = 'balance';
    let userBalance = 0; // just to save the balance in case of hybrid bets
    let remainingBetAmount = 0;
    let bet = 0;
    let user = {};
    try {
        user = await User.findById(userId).session(session);
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the user has sufficient funds
        const totalBalance = user.balance + user.bonusBalance;
        if (totalBalance < betAmount) {
            throw new Error('Insufficient balance');
        }

        // Deduct betAmount from bonusBalance first, then from balance if needed
        if (user.balance >= betAmount) {
            user.balance -= betAmount;

        } else if (user.balance === 0) {
            isBonus = 'bonus';
            user.bonusBalance -= betAmount;
        } else {
            isBonus = 'hybrid';
            remainingBetAmount = betAmount - user.balance;
            userBalance = user.balance;
            user.balance = 0;
            user.bonusBalance -= remainingBetAmount;
        }

        if (isBonus === 'balance') {
            bet = new Bet({ userId, betAmount, realBetAmount: betAmount, bonusBetAmount: 0, result: 'loss', returnedAmount, outcomeAmount });
        } else if (isBonus === 'hybrid') {
            bet = new Bet({ userId, betAmount, realBetAmount: userBalance, bonusBetAmount: remainingBetAmount, result: 'loss', returnedAmount, outcomeAmount });
        } else if (isBonus === 'bonus') {
            bet = new Bet({ userId, betAmount, realBetAmount: 0, bonusBetAmount: betAmount, result: 'loss', returnedAmount, outcomeAmount });
        }


        await bet.save({ session });

        user.bets.push(bet._id);
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        console.log('terminou a session');
        res.status(201).json({ bet });

        console.log('mandou a res 200');

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: err.message });
    } finally {
        console.log('finally');
        if (isBonus === 'hybrid') {
            scheduleAffiliate(bet, user, betAmount = userBalance, userId);
        } else if (isBonus === 'balance') {
            scheduleAffiliate(bet, user, betAmount, userId);
        }
    }
}

const scheduleAffiliate = async (bet, user, betAmount, userId) => {
    const scheduledTime = new Date(Date.now() + 1 * 15 * 1000);
    schedule.scheduleJob(scheduledTime, async () => {
        console.log('init')
        const session = await mongoose.startSession();
        session.startTransaction();
        console.log('começou a transação')
        try {
            const updatedBet = await Bet.findById(bet._id).session(session);
            console.log('bet: ', updatedBet)
            console.log('bet.result: ', updatedBet.result)
            if (updatedBet.result === 'loss') {
                console.log('deu loss')
                const referrerUser = await User.findById(user.referrerUser).session(session);
                if (referrerUser) {
                    const operationAmount = betAmount * process.env.REVSHARE_PERCENTAGE;
                    const newAffiliateOperation = new AffiliateOperation({
                        userId: referrerUser._id,
                        referredUserId: userId,
                        betId: bet._id,
                        operation: 'revShare',
                        operationAmount,
                    });

                    await newAffiliateOperation.save({ session });

                    console.log(newAffiliateOperation);

                    referrerUser.revShareBalance += operationAmount;
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
    })
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