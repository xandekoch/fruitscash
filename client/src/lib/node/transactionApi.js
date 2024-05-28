import axios from 'axios';
import { backendConfig } from './config';

const baseURL = backendConfig.backendUrl;
const accessToken = JSON.parse(localStorage.getItem('session'))?.token;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    },
});

axios.defaults.withCredentials = true;

/* CREATE */
export const createDeposit = async (operationAmount, cpf, name) => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const response = await api.post(`/transactions/createDeposit/${userId}`, {operationAmount, cpf, name});
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao criar depósito.');
    }
};

export const createWithdraw = async (operationAmount, cpf, name) => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const response = await api.post(`/transactions/createWithdraw/${userId}`, {operationAmount, cpf, name});
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao criar depósito.');
    }
};

export const createAffiliateWithdraw = async (operationAmount, cpf, name) => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const response = await api.post(`/transactions/createAffiliateWithdraw/${userId}`, {operationAmount, cpf, name});
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao criar depósito.');
    }
};

/* READ */
export const getWithdrawals = async (operation) => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const response = await api.get(`/transactions/getWithdrawals/${userId}?operation=${operation}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao buscar saques.');
    }
}