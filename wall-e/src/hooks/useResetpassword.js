import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Imports from firebase
import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

export const useResetpassword = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const resetpassword = (email, password) => {
    setError(null);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((err) => {
        console.log(err.message);

        let finalMessage = "";

        if (err.code === "auth/user-not-found") {
          finalMessage = "No Such User";
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

  return { error, resetpassword };
};
