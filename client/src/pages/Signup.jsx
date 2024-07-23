import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      window.alert('Registration Successfull ! Please Sign In to continue.')
      navigate("/signin")
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Sign Up
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Full Name"
          id="fullName"
          onChange={handleChange}
        />
        <input
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="E-mail"
          id="email"
          onChange={handleChange}
        />
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
            required
          />
          <label htmlFor="terms" className="text-gray-700">
            I agree to{" "}
            <Link to="/tnc" className="text-red-600 hover:underline">
              Terms and Conditions
            </Link>
          </label>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-red-800 to-stone-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:from-stone-900 hover:to-red-800 font-bold transition duration-500"
        >
          Sign Up
        </button>
        <Oauth /> 
      </form>
      <div>
        <p className="font-mono p-6">
          Already registered?{" "}
          <Link to="/signin">
            <span className="font-mono text-blue-600 hover:underline">
              Sign In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
