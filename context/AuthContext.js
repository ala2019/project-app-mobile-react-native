//AuthContext.js;
import React, { createContext, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ email: "", password: "" });
  const [logedIn, setLogedIn] = useState(false);

  const login = (email, password) => {
    setAuthState({ email, password });
    setLogedIn(true);
  };

  const logout = () => {
    console.log("sdsdf");
    setAuthState({ email: "", password: "" });
    setLogedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, isAuthenticated: logedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
