import { createContext, useState } from 'react';
import { api } from '../api/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('admin_token') || null);
  const [usuario, setUsuario] = useState(() => {
    const saved = localStorage.getItem('admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, senha) => {
    const response = await api.post('/auth/login', { email, senha });
    const { token: newToken, usuario: userData } = response.data;

    if (userData.perfil !== 'admin') {
      throw new Error('Acesso negado: apenas usuários administradores podem acessar o painel web.');
    }

    localStorage.setItem('admin_token', newToken);
    localStorage.setItem('admin_user', JSON.stringify(userData));
    setToken(newToken);
    setUsuario(userData);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
