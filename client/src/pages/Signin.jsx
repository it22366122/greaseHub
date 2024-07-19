import React from "react";
import { Link } from "react-router-dom";

export default function Signin() {
  const handleChange = (e) => {};

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Sign In
      </h1>
      <form className="flex flex-col gap-6">
        <input
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            className="h-5 w-5 accent-red-600"
          />
          <label htmlFor="terms" className="text-gray-700 font-mono">
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-red-800 to-stone-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:from-stone-900 hover:to-red-800 font-bold transition duration-500"
        >
          Sign In
        </button>
      </form>
      <div>
        <p className="font-mono p-6">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="font-mono text-blue-600 hover:underline">
              Sign Up here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
