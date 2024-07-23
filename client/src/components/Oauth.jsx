import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInScuccess } from "../redux/user/userSlice";
import {useNavigate} from "react-router-dom";

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInScuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Error signing in with Google:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold "
    >
      Continue with Google
    </button>
  );
}
