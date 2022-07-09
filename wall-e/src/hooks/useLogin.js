import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Imports from firebase
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setError(null);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
      })
      .catch((err) => {
        console.log(err.message);
        let finalMessage = "";

        if (err.code === "auth/user-not-found") {
          finalMessage = "No Such User";
        } else if (err.code === "auth/wrong-password") {
          finalMessage = "Invalid Password";
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

  return { error, login };
};
