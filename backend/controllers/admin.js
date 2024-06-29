import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const createUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).json({ error: 'Erro ao obter usuários' });
    }
};

export const releaseWithdraw = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).json({ error: 'Erro ao obter usuários' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        res.status(500).json({ error: 'Erro ao obter usuários' });
    }
};

// Função para obter todas as transações
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Erro ao obter transações:', error);
        res.status(500).json({ error: 'Erro ao obter transações' });
    }
};

// Função para definir um usuário como influenciador
export const setInfluencer = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        user.isInfluencer = true;
        await user.save();
        res.status(200).json({ message: 'Usuário definido como influenciador com sucesso' });
    } catch (error) {
        console.error('Erro ao definir como influenciador:', error);
        res.status(500).json({ error: 'Erro ao definir como influenciador' });
    }
};

// Função para definir o saldo de um usuário
export const setBalance = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        user.balance = 100; // Defina o saldo conforme necessário
        await user.save();
        res.status(200).json({ message: 'Saldo definido com sucesso' });
    } catch (error) {
        console.error('Erro ao definir saldo:', error);
        res.status(500).json({ error: 'Erro ao definir saldo' });
    }
};
