import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
  id: string;
}

// Interface para o método SignIn
interface SignInCredentials {
  username: string;
  password: string;
}

// Interface do meus estado
interface AuthState {
  jwt: string;
  company_id: object;
}

interface AuthContextData {
  company_id: object;
  signIn(credentails: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  // Estado onde será armazenado os dados do usuário dentro da aplicação
  const [data, setData] = useState<AuthState>(() => {
    const jwt = localStorage.getItem('@PedidosPago:jwt');
    const company_id = localStorage.getItem('@PedidosPago:company_id');

    if (jwt && company_id) {
      return { jwt, company_id: JSON.parse(company_id) };
    }

    return {} as AuthState;
  });
  // Context de SignIn
  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('v2/agent/login', {
      username,
      password,
    });

    console.log(response);

    const { jwt, company_id } = response.data;

    localStorage.setItem('@PedidosPago:jwt', jwt);
    localStorage.setItem('@PedidosPago:company_id', JSON.stringify(company_id));

    setData({ jwt, company_id });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@PedidosPago:jwt');
    localStorage.removeItem('@PedidosPago:company_id');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ company_id: data.company_id, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
