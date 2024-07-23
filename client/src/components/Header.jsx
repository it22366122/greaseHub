// Header.js
import React from "react";
import logo from "../images/logo.jpeg";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { Avatar, Dropdown } from "flowbite-react";
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from "../redux/user/userSlice";

export default function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch()

  const handleSignout = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("api/auth/signout");

      if (!res.ok) {
        dispatch(signOutUserFailure());
        console.error("Failed to sign out:", res.status, res.statusText);
        return;
      }

      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure());
        console.error("Sign out error:", data.message);
        return;
      }

      dispatch(signOutUserSuccess());
    } catch (error) {
      console.error("Error during sign out:", error);
      dispatch(signOutUserFailure());
    }
  };

 

  return (
    <header className="bg-gradient-to-r from-stone-900 to-red-800 p-5 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img
              src={logo}
              alt="GreaseHub Logo"
              className="h-20 w-20 rounded-full"
            />
          </Link>
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

          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="profile pic"
                  img={currentUser.photo}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                   {currentUser.username}
                </span>
                
              </Dropdown.Header>
              <Link to={"/dashboard?tab=dash"}>
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>
              <Dropdown.Divider></Dropdown.Divider>
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Item className="text-red-500" onClick={handleSignout}>Sign Out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/signin">
              <li className="inline-block bg-emerald-600 text-white py-1 px-3 rounded-lg font-semibold text-center hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
