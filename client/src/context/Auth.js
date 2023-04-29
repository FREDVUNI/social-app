import { createContext, useEffect, useState } from "react";
import Person from "../images/person.png";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = () => {
    setCurrentUser({
      id: 1,
      name: "Fred",
      username: "Fred",
      email: "fredvuni809@gmail.com",
      password: "password",
      profileImage: Person,
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
