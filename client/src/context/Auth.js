import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const register = (inputs) => {
    axios.post(`${process.env.BASE_URL}/auth/signup`, inputs);

    setCurrentUser({ inputs });
  };

  const login = (inputs) => {
    axios.post(`${process.env.BASE_URL}/auth/signin`, inputs);

    setCurrentUser({ inputs });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, login, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
