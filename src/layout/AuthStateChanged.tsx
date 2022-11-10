import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { auth } from "../services/firebaseConnection";

const AuthStateChanged = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [signed, setSigned] = useState(false)

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email
        };

        localStorage.setItem("@detailUser", JSON.stringify(userData));
        setIsLoading(false);
        setSigned(true);
      } else {
        setIsLoading(false);
        setSigned(false);
      }
    });

    AuthCheck();
  }, []);

  if(isLoading) {
    return (
      <Loading />
    )
  }

  return children
}

export default AuthStateChanged;