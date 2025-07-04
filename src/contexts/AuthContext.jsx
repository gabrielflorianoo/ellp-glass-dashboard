
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Usuários mock para demonstração
const mockUsers = {
  'admin@ellp.com': {
    id: 1,
    email: 'admin@ellp.com',
    password: 'admin123',
    name: 'Administrador Sistema',
    role: 'admin',
    avatar: null
  },
  'professor@ellp.com': {
    id: 2,
    email: 'professor@ellp.com',
    password: 'prof123',
    name: 'João Silva',
    role: 'volunteer',
    avatar: null
  },
  'coordenador@ellp.com': {
    id: 3,
    email: 'coordenador@ellp.com',
    password: 'coord123',
    name: 'Prof. Antonio Carlos',
    role: 'coordinator',
    avatar: null
  },
  'responsavel@ellp.com': {
    id: 4,
    email: 'responsavel@ellp.com',
    password: 'resp123',
    name: 'Maria Santos',
    role: 'parent',
    avatar: null
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ellp_token');
    const userData = localStorage.getItem('ellp_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('ellp_token');
        localStorage.removeItem('ellp_user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const mockUser = mockUsers[email];
    
    if (mockUser && mockUser.password === password) {
      const userData = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        avatar: mockUser.avatar
      };
      
      localStorage.setItem('ellp_token', 'mock_token_' + Date.now());
      localStorage.setItem('ellp_user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true, user: userData };
    }
    
    return { success: false, error: 'Credenciais inválidas' };
  };

  const logout = () => {
    localStorage.removeItem('ellp_token');
    localStorage.removeItem('ellp_user');
    setUser(null);
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('ellp_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
