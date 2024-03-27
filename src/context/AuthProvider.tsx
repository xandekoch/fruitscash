// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: (session: Session) => void;
  logout: () => void;
}

// Define a interface Session
interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  userId: string; 
  issuedAt: string; // Adicionando a data de emissão (issuedAt) à interface Session
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Verifica se há uma sessão válida ao inicializar o componente
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    if (isValidSession(session)) {
      setIsAuthenticated(true);
    }
  }, []);

  // Função para autenticar o usuário localmente
  const authenticate = (session: Session) => {
    if (isValidSession(session)) {
      // Decodifica o token JWT para obter o userId
      const decodedToken = decodeJwt(session.access_token);
      const userId = decodedToken.userId;

      // Adiciona o userId à sessão
      session.userId = userId;

      setIsAuthenticated(true);
      localStorage.setItem('session', JSON.stringify(session));
    } else {
      logout(); // Desautentica se a sessão não for válida
    }
  };

  // Função para desautenticar o usuário
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('session');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};

export const isValidSession = (session: Session): boolean => {
  const issuedAt = new Date(session.issuedAt || 0);
  const expiresInMilliseconds = 43200 * 1000; // Converte o tempo de expiração para milissegundos
  const expirationTime = issuedAt.getTime() + expiresInMilliseconds;
  return expirationTime > Date.now(); // Verifica se o tempo de expiração é posterior ao tempo atual
};

export const getUserIdFromSession = () => {
  const sessionString = localStorage.getItem('session');
  if (sessionString) {
    const session = JSON.parse(sessionString);
    return session.userId;
  } else {
    console.error('Sessão não encontrada');
  }
};

export const getAccessToken = () => {
  const sessionString = localStorage.getItem('session');
  if (sessionString) {
    const session = JSON.parse(sessionString);
    return session.access_token;
  } else {
    console.error('Token não encontrado')
  }
};

const decodeJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
