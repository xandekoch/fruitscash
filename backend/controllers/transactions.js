import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import affiliateOperation from "../models/affiliateOperation.js";
import { v4 as uuidv4 } from 'uuid';

/* CREATE */
export const createDeposit = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { idTransaction, userId, operationAmount, cpf, name } = req.body;
        const operation = 'deposit';
        const status = 'concluded';

        console.log(idTransaction, userId, operationAmount, cpf, name)

        const newDeposit = new Transaction({
            suitPayTransactionId: idTransaction,
            userId,
            name: name,
            cpf: cpf,
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
        user.sumOfBetAmounts = 0;
        user.bonusBalance += operationAmount;
        user.transactions.push(newDeposit._id);

        try {
            if (user.referrerUser) {
                const referrer = await User.findById(user.referrerUser).session(session);

                if (!referrer) {
                    throw new Error('Referrer not found');
                }

                if (!referrer.isComissionEnabled) {
                    throw new Error('Comission disabled for this user');
                }

                const affiliateOperationAmount = operationAmount * process.env.CPA_PERCENTAGE;

                const newAffiliateOperation = new affiliateOperation({
                    userId: referrer._id,
                    referredUserId: user._id,
                    transactionId: newDeposit._id,
                    operation: 'cpa',
                    operationAmount: affiliateOperationAmount
                });

                await newAffiliateOperation.save({ session });

                referrer.cpaBalance += affiliateOperationAmount;
                referrer.affiliateOperations.push(newAffiliateOperation._id);

                await referrer.save({ session });
            }
        } catch (err) {
            console.log(err)
        }

        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ newDeposit })
    } catch (err) {
        console.log(err.message)
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ error: err.message });
    }
}

export const createWithdraw = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId } = req.params;
        const { operationAmount, cpf, name } = req.body;
        const operation = 'withdraw';
        const status = 'pending';

        if (operationAmount < 50) {
            throw new Error('Saque abaixo de R$50');
        }

        const user = await User.findById(userId).session(session);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        if (user.balance < operationAmount) {
            throw new Error('Saldo Insuficiente');
        }

        if (!user.isInfluencer) {
            const lastDeposit = await Transaction.findOne({
                userId: user._id,
                operation: 'deposit'
            })
                .sort({ createdAt: -1 })
                .exec();

            if (!lastDeposit) {
                throw new Error('Nenhum depósito encontrado');
            }

            const lastDepositAmount = lastDeposit.operationAmount;

            if (user.sumOfBetAmounts < (lastDepositAmount * process.env.MININUM_BET_SUM_TO_WITHDRAW_MULTIPLIER)) {
                throw new Error(`Valor total apostado não é suficiente, falta R$ ${(lastDepositAmount * process.env.MININUM_BET_SUM_TO_WITHDRAW_MULTIPLIER) - user.sumOfBetAmounts}`);
            }
        }

        const newWithdraw = new Transaction({
            userId,
            name,
            cpf,
            operation,
            operationAmount,
            status,
            suitPayTransactionId: `fake${uuidv4()}`
        });

        await newWithdraw.save({ session });

        user.balance -= operationAmount;
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ newWithdraw });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        res.status(500).json({ error: err.message });
    }
}

export const createAffiliateWithdraw = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { userId } = req.params;
        let { operationAmount, cpf, name } = req.body;
        const operation = 'affiliateWithdraw';
        const status = 'pending';

        if (operationAmount < 50) {
            throw new Error('Saque abaixo de R$50');
        }

        const user = await User.findById(userId).session(session);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        let totalBalance = user.cpaBalance + user.revShareBalance;
        if (totalBalance < operationAmount) {
            throw new Error('Saldo de Afiliado insuficiente');
        }

        // Deduzir primeiro do cpaBalance se houver saldo suficiente
        if (user.cpaBalance >= operationAmount) {
            user.cpaBalance -= operationAmount;
        } else {
            // Se não houver saldo suficiente em cpaBalance, deduzir do revShareBalance
            operationAmount -= user.cpaBalance;
            user.cpaBalance = 0;
            user.revShareBalance -= operationAmount;
        }

        const newWithdraw = new Transaction({
            userId,
            name,
            cpf,
            operation,
            operationAmount,
            status,
            suitPayTransactionId: `fake${uuidv4()}`
        });

        await newWithdraw.save({ session });
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ newWithdraw });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        res.status(500).json({ error: err.message });
    }
}

/* READ */
export const getWithdrawals = async (req, res) => {
    try {
        const { userId } = req.params;
        const { operation } = req.query;

        const withdrawals = await Transaction.find({ userId, operation: operation })
            .select('cpf operationAmount status createdAt')
            .sort({ createdAt: -1 });

        res.status(200).json(withdrawals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}