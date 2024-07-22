import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInScuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useSelector } from "react-redux";

import Oauth from "../components/Oauth";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const submitData = async (e) => {
    try {
      e.preventDefault();

      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        window.alert(data.message);
        return;
      }

      dispatch(signInScuccess(data));
      navigate("/"); // Use navigate to redirect to "/"
    } catch (error) {
      dispatch(signInFailure(error.message));
      window.alert("Username or password is incorrect");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Sign In
      </h1>
      <form className="flex flex-col gap-6" onSubmit={submitData}>
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
        <Oauth />
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
