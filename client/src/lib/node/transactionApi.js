import axios from 'axios';
import { backendConfig } from './config';
import { getAccessToken } from '../../context/AuthProvider';

const baseURL = backendConfig.backendUrl;

const api = axios.create({
    baseURL
});

axios.defaults.withCredentials = true;

/* CREATE */
export const generatePaymentCode = async (operationAmount, cpf, name) => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const accessToken = getAccessToken();
        const response = await api.post(`/transactions/generatePaymentCode/${userId}`, { operationAmount, cpf, name },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao criar depósito.');
    }
};

// Just for tests, create the deposit on database without real payment
export const createDeposit = async (operationAmount, cpf, name) => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const accessToken = getAccessToken();
        const response = await api.post('/transactions/createDeposit/',
            { statusTransaction: 'PAID_OUT', requestNumber: `${userId}-1`, value: operationAmount, payerName: name, payerTaxId: cpf, idTransaction: (Math.floor(Math.random() * 100000) + 1) },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao criar depósito.');
    }
};

export const createWithdraw = async (operationAmount, cpf, name) => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const accessToken = getAccessToken();
        const response = await api.post(`/transactions/createWithdraw/${userId}`, { operationAmount, cpf, name },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao criar depósito.');
    }
};

export const createAffiliateWithdraw = async (operationAmount, cpf, name) => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const accessToken = getAccessToken();
        const response = await api.post(`/transactions/createAffiliateWithdraw/${userId}`, { operationAmount, cpf, name },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao criar depósito.');
    }
};

/* READ */
export const getWithdrawals = async (operation) => {
    try {
        const userId = JSON.parse(localStorage.getItem('session'))?.user?._id || '';
        const accessToken = getAccessToken();
        const response = await api.get(`/transactions/getWithdrawals/${userId}?operation=${operation}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'Erro ao buscar saques.');
    }
}