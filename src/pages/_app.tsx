import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../hooks/AuthContext";
import AuthStateChanged from "../layout/AuthStateChanged";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthStateChanged>
        <Component {...pageProps} />
      </AuthStateChanged>
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  );
}

export default MyApp;
