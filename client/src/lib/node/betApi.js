import axios from 'axios';
import { backendConfig } from './config';

const baseURL = backendConfig.backendUrl;
const accessToken = JSON.parse(localStorage.getItem('session'))?.token;
const userId = JSON.parse(localStorage.getItem('session'))?.user?._id;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    },
});

axios.defaults.withCredentials = true;

/* CREATE */
export const createBet = async (betAmount) => {
    try {
        const response = await api.post(`/bets/createBet/${userId}`, {betAmount});
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao cadastrar usuário');
    }
};

/* UPDATE */
export const updateBet = async (betId, score) => {
    try {
        const response = await api.patch(`/bets/updateBet/${userId}/${betId}`, {score});
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao cadastrar usuário');
    }
};