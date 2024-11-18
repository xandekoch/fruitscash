import axios from 'axios';
import { backendConfig } from './config';

const baseURL = `${backendConfig.backendUrl}/api`;

const api = axios.create({
    baseURL,
});

axios.defaults.withCredentials = true;

/* CREATE */
export const createBet = async (betAmount) => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id;
        const accessToken = JSON.parse(localStorage.getItem('session'))?.token;

        const response = await api.post(`/bets/createBet/${userId}`, { betAmount }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao cadastrar usuário');
    }
};

/* UPDATE */
export const updateBet = async (betId, score) => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id;
        const accessToken = JSON.parse(localStorage.getItem('session'))?.token;

        const response = await api.patch(`/bets/updateBet/${userId}/${betId}`, { score }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao cadastrar usuário');
    }
};

export const getBet = async (betId) => {
    try {
        const response = await api.get(`/bets/getBet/${betId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao buscar usuário');
    }
};