import Head from "next/head";
import Link from "next/link";
import { Logo } from "../components/Logo";

const Error = () => {
  return (
    <>
      <Head>
        <title>DevLink - Página não encontrada</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-screen pt-5">
        <Logo />
        <h1 className="text-2xl sm:text-4xl text-gray-100 font-bold">
          Página não encontrada!
        </h1>
        <span className="text-lg sm:text-xl text-gray-300 mt-5 italic text-center">
          Esta página que está procurando não existe.
        </span>

        <Link href="/" className="mt-5">
          <button className="bg-gray-600 p-2 rounded hover:bg-gray-300 transition-colors">
            <span className="txt-lg sm:text-xl text-gray-100 font-medium">
              Voltar para Home
            </span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Error;
