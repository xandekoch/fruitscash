import axios from 'axios';
import { backendConfig } from './config';

const baseURL = `${backendConfig.backendUrl}/api`;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/* CREATE */
export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao cadastrar usuário');
    }
};

/* READ */
export const login = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.msg || 'Erro ao fazer login');
    }
};

/* UPDATE */
export const recoverPassword = async (email) => {
    try {
        const response = await api.post('/auth/recoverPassword', {email});
        return response.data;
    } catch (error) {
        console.log(error.response.data.error);
        throw new Error(error.response.data.error || 'Erro ao solicitar recuperação de senha');
    }
};