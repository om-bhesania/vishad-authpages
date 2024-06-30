// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLogin = Cookies.get("isLogin");
      setIsLoggedIn(!!isLogin);
    };

    checkLoginStatus(); // Initial check
    window.addEventListener("storage", checkLoginStatus); // Listen for storage changes

    return () => {
      window.removeEventListener("storage", checkLoginStatus); // Clean up listener
    };
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: username,
        password,
      });
      console.log("Login successful", response.data);
      Cookies.set("isLogin", "true", { path: "/" });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout");
      console.log("Logout successful");
      Cookies.remove("isLogin");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
