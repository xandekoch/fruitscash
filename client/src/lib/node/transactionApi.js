import axios from 'axios';
import { backendConfig } from './config';

const baseUrl = backendConfig.backendUrl;
const accessToken = JSON.parse(localStorage.getItem('session'))?.token;
const userId = JSON.parse(localStorage.getItem('session'))?.user?._id;

const api = axios.create({
    baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    },
});

axios.defaults.withCredentials = true;

/* CREATE */
export const createDeposit = async (operationAmount) => {
    try {
        const response = await api.post(`/transactions/createDeposit/${userId}`, {operationAmount});
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao criar depósito.');
    }
};