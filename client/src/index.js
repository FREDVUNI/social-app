import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/Auth";
import { ThemeToggleProvider } from "./context/ToggleTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeToggleProvider>
        <App />
      </ThemeToggleProvider>
    </AuthProvider>
  </React.StrictMode>
);
