import axios from 'axios';
import { backendConfig } from './config';

const baseURL = `${backendConfig.backendUrl}/api`;

const api = axios.create({
    baseURL,
});

axios.defaults.withCredentials = true;

/* CREATE */
export const getBalance = async () => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const accessToken = JSON.parse(localStorage.getItem('session'))?.token;
        const response = await api.get(`/users/getBalance/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao buscar saldo.');
    }
};

export const getAffiliateData = async () => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const accessToken = JSON.parse(localStorage.getItem('session'))?.token;
        const response = await api.get(`/users/getAffiliateData/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao buscar dados de afiliado.');
    }
}