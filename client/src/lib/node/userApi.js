import axios from 'axios';
import { backendConfig } from './config';
import { getAccessToken } from '../../context/AuthProvider';

const baseURL = backendConfig.backendUrl;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`,
    },
});

axios.defaults.withCredentials = true;

/* CREATE */
export const getBalance = async () => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const token = getAccessToken();
        const response = await api.get(`/users/getBalance/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
        const response = await api.get(`/users/getAffiliateData/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao buscar dados de afiliado.');
    }
}