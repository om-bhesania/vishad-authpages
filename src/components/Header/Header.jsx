import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import AuthButtons from "./../Auth/Logout";

function Header() {
  return (
    <header>
      <div className="container">
        <nav className="flex justify-between items-center py-4">
          <div className="logo">
            <a href="/">Logo</a>
          </div>
          <ul className="flex items-center justify-center gap-2">
            <li className="mx-2">
              <Link to="/home">Home</Link>
            </li>
            <AuthButtons />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
