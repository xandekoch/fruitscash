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
  issuedAt?: string; // Adicionando a data de emissão (issuedAt) à interface Session
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

  // Função para verificar se a sessão é válida
  const isValidSession = (session: Session): boolean => {
    const issuedAt = new Date(session.issuedAt || 0);
    const expiresInMilliseconds = 43200 * 1000; // Converte o tempo de expiração para milissegundos
    const expirationTime = issuedAt.getTime() + expiresInMilliseconds;
    return expirationTime > Date.now(); // Verifica se o tempo de expiração é posterior ao tempo atual
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
