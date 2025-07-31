import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ACCESS_TOKEN_KEY } from "../constants/common";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const pathname = useLocation();
  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (pathname.pathname === "/login" && token) {
      setCheckingAuth(false);
      setIsAuthenticated(true);
      navigate("/");
    }

    if (token) {
      setIsAuthenticated(true);
    }

    setCheckingAuth(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, checkingAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
