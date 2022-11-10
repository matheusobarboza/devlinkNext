import { CircleNotch } from "phosphor-react";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { Logo } from "../components/Logo";
import { Input } from "../components/ui/Input";
import { AuthContext } from "../hooks/AuthContext";
import { withPublic } from "../hooks/routes";

const SignIn = () => {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.warn("Preencha todos os campos!");
      return;
    }

    setIsLoading(true);

    await signIn({
      email,
      password
    });

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <Logo />

      <form
        onSubmit={handleSignIn}
        className="flex flex-col gap-3 w-full max-w-xs sm:max-w-[430px] mt-5 mb-5"
      >
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Senha"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 px-2 h-9 rounded font-semibold flex items-center justify-center text-white hover:bg-blue-500"
          type="submit"
        >
          {isLoading ? (
            <CircleNotch size={30} color="white" className="animate-spin" />
          ) : (
            <span>Acessar</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default withPublic(SignIn);
