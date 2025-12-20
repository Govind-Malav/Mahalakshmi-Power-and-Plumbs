import React, { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // persist session
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  // ✅ LOGIN (FIXED)
  const login = async (email, password) => {
    const res = await loginRequest(email, password);

    const loggedInUser = {
      id: res.user.id,
      name: res.user.name,
      email: res.user.email,
      contact: res.user.contact,
      role: res.user.role || "user"
    };

    setUser(loggedInUser);
    setToken(res.token);
    return loggedInUser;
  };

  // ✅ REGISTER (NO AUTO LOGIN)
  const register = async (email, password, name, contact) => {
    await registerRequest(name, email, password, contact);
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
