import { createContext, useEffect, useState } from "react";

export const ToggleContext = createContext();
export const ThemeToggleProvider = ({ children }) => {
  const [darkMode, setDarkmode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  const toggler = () => {
    setDarkmode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  return (
    <ToggleContext.Provider value={{ toggler, darkMode }}>
      {children}
    </ToggleContext.Provider>
  );
};
