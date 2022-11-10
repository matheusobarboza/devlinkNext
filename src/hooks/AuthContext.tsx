import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import Router from "next/router";
import { createContext, ReactNode } from "react";
import { toast } from "react-toastify";
import { auth } from "../services/firebaseConnection";

interface SignInProps {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: SignInProps) => Promise<void>;
  logoutUser: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const logoutUser = async () => {
  await signOut(auth)
    .then(() => {
      localStorage.removeItem("@detailUser");
      Router.push("/signin");
    })
    .catch(() => {
      toast.error("Erro ao sair!");
    });
};

export function AuthProvider({ children }: AuthProviderProps) {
  async function signIn({ email, password }: SignInProps) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Seja Bem Vindo!");
        Router.push("/admin");
      })
      .catch(() => {
        toast.error("Erro ao fazer login!");
        console.log("Error");
      });
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
