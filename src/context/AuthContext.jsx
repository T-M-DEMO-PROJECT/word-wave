// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider to wrap the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const userData = await response.json();
      setUser(userData); // Store user data in state
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to create an account");
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null); // Clear user data
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleSignUp, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);
