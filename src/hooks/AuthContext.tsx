import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import Router from "next/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { auth } from "../services/firebaseConnection";

interface UserProps {
  uid: string;
  email: string;
  displayName: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: SignInProps) => Promise<void>;
  logoutUser: () => Promise<void>;
  user: UserProps;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const [isLoading, setIsLoading] = useState(true);
  console.log("user aqui", user)

  const signIn = async ({ email, password }: SignInProps) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Seja Bem Vindo!");
        Router.push("/admin");
      })
      .catch(() => {
        toast.error("Erro ao fazer login!");
        console.log("Error");
      });
  };

  const logoutUser = async () => {
    await signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("@detailUser");
        Router.push("/signin");
      })
      .catch(() => {
        toast.error("Erro ao sair!");
      });
  };

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        };

        setUser({
          uid: userData.uid,
          email: userData.email,
          displayName: userData.displayName
        });

        localStorage.setItem("@detailUser", JSON.stringify(userData));
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setUser(null);
      }
    });

    return () => AuthCheck();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        logoutUser,
        user,
        isLoading
      }}
    >
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
