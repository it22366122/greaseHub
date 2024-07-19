import React from "react";
import logo from "../images/logo.jpeg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-300 p-5 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-3">
        <div className="flex items-center space-x-3 ml-0 ">
          <a href="/">
            <img
              src={logo}
              alt="GreaseHub Logo"
              className="h-20 w-20 rounded-full"
            />
          </a>
          <h1 className="font-bold text-xl flex flex-wrap">
            <span className="text-slate-500">Grease</span>
            <span className="text-slate-700">Hub</span>
          </h1>
        </div>

        <ul className="flex gap-4 text-gray-800">
          <Link to="/" className="hover:font-bold">
            Home
          </Link>
          <Link to="/join" className="hover:font-bold">
            Join Us
          </Link>
          <Link to="/about" className="hover:font-bold">
            About
          </Link>
          <Link to="/signin" className="hover:font-bold">
            Sign In
          </Link>
        </ul>
      </div>
    </header>
  );
}
