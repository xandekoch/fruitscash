const url = 'http://localhost:8080/api/user';

export const createAccount = async (email: string, password: string) => {
  try {
    // Faz a requisição POST
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
    // Adicione aqui a lógica para redirecionar o usuário ou exibir uma mensagem de sucesso
  } catch (error) {
    console.error('Erro:', error);
    // Adicione aqui a lógica para exibir uma mensagem de erro ao usuário
  }
};