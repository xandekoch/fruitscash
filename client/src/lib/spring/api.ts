import { getAccessToken, getUserIdFromSession } from "../../context/AuthProvider";
import { backendConfig } from "./config";


const baseUrl = backendConfig.backendUrl;
const accessToken = getAccessToken();
const userId = getUserIdFromSession();

export const createAccount = async (email: string, password: string, code?: string) => {
  try {
    let url = `${baseUrl}/api/user/register`;

    if (code) {
      url += `?code=${encodeURIComponent(code)}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar usuário');
    }

    const data = await response.json();
    console.log('Usuário cadastrado:', data);
    return data
  } catch (error) {
    console.error('Erro:', error);
  }
};

export const login = async (username: string, password: string) => {
  
  try {
    // const authString = btoa('myclientid:myclientsecret');

    const response = await fetch(`${baseUrl}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic bXljbGllbnRpZDpteWNsaWVudHNlY3JldA==`
      },
      body: new URLSearchParams({
        'username': username,
        'password': password,
        'grant_type': 'password'
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer login');
    }

    const session = await response.json();
    session.issuedAt = new Date().toISOString();
    return session;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Erro ao fazer login');
  }
};


export const recoverPassword = async (email: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/user/recovery?email=${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao recuperar senha');
    }

    console.log('Senha recuperada com sucesso');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro:', error);
  }
};

export const sendGameResult = async (description: string, score: number) => {
  try {
    const response = await fetch(`${baseUrl}/api/user/score/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description, score })
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar resultado do jogo');
    }
  } catch (error) {
    throw error;
  }
};

export const requestFreeTrial = async (userId: string): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/api/user/play/free/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao solicitar teste gratuito');
    }

    // Processar a resposta, se necessário
  } catch (error) {
    throw new Error(`Erro ao solicitar teste gratuito: ${error}`);
  }
};

export const getUserBalance = async (userId: string): Promise<number> => {
  try {
    const response = await fetch(`${baseUrl}/api/user/score/${userId}`, { headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }, });

    if (!response.ok) {
      throw new Error('Erro ao buscar saldo do usuário');
    }

    const data = await response.json();

    const balance = data.gameBalance + data.bonusBalance;

    return balance;
  } catch (error) {
    throw new Error(`Erro ao buscar saldo do usuário: ${error}`);
  }
};


export const sendDeposit = async (depositData: { cpf: string, fullName: string, wdValue: number, userModelId: string }): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/api/transactions/deposit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(depositData)
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar o depósito');
    }
  } catch (error) {
    throw new Error(`Erro ao enviar o depósito: ${error}`);
  }
};

export const sendPayout = async (payoutData: { cpf: string, fullName: string, wdValue: number, userModelId: string }): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/api/transactions/game/withdraw`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payoutData)
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar solicitação de saque.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Erro ao enviar solicitação de saque: ${error}`);
  }
};
