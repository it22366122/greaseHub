import React from "react";
import logo from "../images/logo.jpeg";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-stone-900  to-red-800 p-5 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <a href="/">
            <img
              src={logo}
              alt="GreaseHub Logo"
              className="h-20 w-20 rounded-full"
            />
          </a>
          <h1 className="font-bold text-2xl text-white flex flex-wrap">
            <span className="text-gray-200">Grease</span>
            <span className="text-white">Hub</span>
          </h1>
        </div>

        <ul className="flex gap-4 text-white">
          <Link to="/" className="hover:font-bold">
            Home
          </Link>
          <Link to="/join" className="hover:font-bold">
            Join Us
          </Link>
          <Link to="/about" className="hover:font-bold">
            About
          </Link>
          <Link
            to="/signup"
            className="inline-block bg-emerald-600 text-white py-1 px-3 rounded-lg font-semibold text-center hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Sign Up
          </Link>
        </ul>
      </div>
    </header>
  );
}
