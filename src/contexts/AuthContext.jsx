import { createContext, useContext, useEffect, useState } from 'react';
import { ACCESS_TOKEN_KEY } from '../constants/common';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY)

    if (token) {
      setIsAuthenticated(true)
    }

    setCheckingAuth(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
