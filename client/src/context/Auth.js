import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) !== null
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const register = async (inputs) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/signup`, inputs);
  };

  const login = async (inputs) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/signin`,
      inputs,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
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

export const useLoggedInUser = (userId) => {
  const { data, isLoading, error } = useQuery(["user", userId], async () => {
    if (!userId) {
      return null;
    }

    const response = await makeRequest.get("/users/find/" + userId);
    return response.data;
  });

  return { data, isLoading, error };
};
