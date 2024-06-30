import { LogOutIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming initially logged in

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLogin = Cookies.get("isLogin");
      setIsLoggedIn(!!isLogin);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const nav = useNavigate();

  const logout = async () => {
    await axios.post("http://localhost:5000/api/logout").then((response) => {
      console.log("Logout successful", response.data);
      Cookies.remove("isLogin");
      setIsLoggedIn(false);
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  };

  useEffect(() => {
    const isLogin = Cookies.get("isLogin");
    if (!isLogin) {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <div className="flex items-center">
          <li className="mx-2">
            <Link
              to="/login"
              className="px-4 p-1.5 border flex-shrink-1 bg-blue-500 hover:bg-transparent hover:border-blue-500 border-blue-500 hover:text-black text-white transition ease-in-out duration-300 w-full rounded-md flex items-center justify-center"
            >
              Login
            </Link>
          </li>
          <li className="mx-2">
            <Link
              to="/signup"
              className="px-4 p-1.5 border flex-shrink-1 border-blue-500 hover:bg-blue-500 hover:text-white transition ease-in-out duration-300 w-full rounded-md flex items-center justify-center"
            >
              Sign Up
            </Link>
          </li>
        </div>
      </>
    );
  }
  return (
    <>
      <button
        className="px-4 p-1.5 border flex-shrink-1 border-blue-500 hover:bg-blue-400 hover:text-white transition ease-in-out duration-300 w-full rounded-md flex items-center justify-center"
        onClick={logout}
      >
        <div className="flex items-center gap-2">
          <span>Logout</span>
          <LogOutIcon className="h-4 w-4" />
        </div>
      </button>
    </>
  );
};
export default AuthButtons;
