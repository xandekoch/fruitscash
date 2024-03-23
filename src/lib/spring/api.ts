const baseUrl = 'http://localhost:8080/api';

export const createAccount = async (email: string, password: string) => {
  try {
    // Faz a requisição POST
    const response = await fetch(`${baseUrl}/user/register`, {
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
    // Adicione aqui a lógica para redirecionar o usuário ou exibir uma mensagem de sucesso
  } catch (error) {
    console.error('Erro:', error);
    // Adicione aqui a lógica para exibir uma mensagem de erro ao usuário
  }
};

export const login = async (username: string, password: string) => {
  try {
    // const authString = btoa('myclientid:myclientsecret');
    
    const response = await fetch("http://localhost:8080/oauth2/token", {
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
    const response = await fetch(`${baseUrl}/user/recover-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error('Erro ao recuperar senha');
    }

    console.log('Senha recuperada com sucesso');
    // Adicione aqui a lógica para exibir uma mensagem de sucesso ao usuário
  } catch (error) {
    console.error('Erro:', error);
    // Adicione aqui a lógica para exibir uma mensagem de erro ao usuário
  }
};

export const Pay = async (email: string) => {
  try {
    const response = await fetch(`${baseUrl}/user/recover-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error('Erro ao recuperar senha');
    }

    console.log('Senha recuperada com sucesso');
    // Adicione aqui a lógica para exibir uma mensagem de sucesso ao usuário
  } catch (error) {
    console.error('Erro:', error);
    // Adicione aqui a lógica para exibir uma mensagem de erro ao usuário
  }
};