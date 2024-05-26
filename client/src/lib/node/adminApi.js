import axios from 'axios';
import { backendConfig } from './config';

const baseURL = backendConfig.backendUrl;
const accessToken = JSON.parse(localStorage.getItem('session'))?.token;
const adminId = JSON.parse(localStorage.getItem('session'))?.user?._id;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    },
});

export const getUsers = async () => {
    try {
        const response = await api.get(`/admin/getUsers/${adminId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        throw error;
    }
};

export const getTransactions = async () => {
    try {
        const response = await api.get(`/admin/getTransactions/${adminId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter transações:', error);
        throw error;
    }
};

export const setInfluencer = async (userId) => {
    try {
        await api.patch(`/admin/setInfluencer/${adminId}/${userId}`);
        console.log('Usuário definido como influenciador com sucesso!');
    } catch (error) {
        console.error('Erro ao definir usuário como influenciador:', error);
        throw error;
    }
};

export const setBalance = async (userId, newBalance) => {
    try {
        await api.patch(`/admin/setBalance/${adminId}/${userId}`, { balance: newBalance });
        console.log('Saldo do usuário atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar saldo do usuário:', error);
        throw error;
    }
};

export default {
    getUsers,
    getTransactions,
    setInfluencer,
    setBalance,
};
