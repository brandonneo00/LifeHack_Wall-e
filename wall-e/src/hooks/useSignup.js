import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Imports from firebase
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = (email, password) => {
    setError(null);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
      })
      .catch((err) => {
        console.log(err.message);
        let finalMessage = "";

        if (err.code === "auth/email-already-in-use") {
          finalMessage = "This email is already in use";
        } else if (err.code === "auth/invalid-email") {
          finalMessage = "Invalid Email";
        } else {
          let msg = err.message;
          let start = msg.indexOf(":") + 2;
          let end = msg.indexOf("(auth");
          finalMessage = msg.substring(start, end);
        }

        console.log(finalMessage);
        setError(finalMessage);
      });
  };

  return { error, signup };
};
