import { addDoc, collection } from "firebase/firestore";
import { GithubLogo, Icon, InstagramLogo, LinkSimpleHorizontal, Trash, User, WhatsappLogo } from "phosphor-react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../components/Header";
import { Logo } from "../components/Logo";
import { Input } from "../components/ui/Input";
import { withProtected } from "../hooks/routes";
import { db } from "../services/firebaseConnection";

interface LinkProps {
  title: string;
  icon: Icon;
  link: string;
  bgLink?: string;
  textColor?: string;
}

const links = [
  { title: "Portfólio", icon: User, link: "https://www.matheusobarboza.com" },
  {
    title: "Github",
    icon: GithubLogo,
    link: "https://github.com/matheusobarboza",
    bgLink: "#472CCE",
    textColor: "white"
  },
  {
    title: "Whatsapp",
    icon: WhatsappLogo,
    link: "https://wa.me/5582999949683",
    bgLink: "#ca1e1e",
    textColor: "white"
  },
  {
    title: "Instagram",
    icon: InstagramLogo,
    link: "https://www.instagram.com/matheusobarboza/",
    bgLink: "#98c41e",
    textColor: "white"
  }
];

const Admin = () => {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [bgColorInput, setBgColorInput] = useState("#f1f1f1");
  const [txtColorInput, setTxtColorInput] = useState("#121212");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    if(nameInput === "" || urlInput === "") {
      toast.warn("Preencha todos os campos!")
      return
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: bgColorInput,
      color: txtColorInput,
      created: new Date(),
    })
    .then(() => {
      setNameInput("")
      setUrlInput("")
      toast.success("Link cadastrado com sucesso!")
    })
    .catch((error) => {
      toast.error("Erro ao cadastrar!")
      console.log("Erro ao cadastrar", error)
    })
  }

  return (
    <div className="h-full flex flex-col items-center min-h-screen p-5">
      <Header />

      <Logo />

      <form onSubmit={handleRegister} className="flex flex-col w-full max-w-xl mt-5 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="linkName" className="text-white">
            Nome do Link
          </label>
          <Input
            id="linkName"
            placeholder="Digite o nome do link..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="text-white">
            Url do Link
          </label>
          <Input
            id="url"
            placeholder="Digite o url..."
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        </div>

        <section className="flex gap-10">
          <div className="flex gap-3 items-center justify-center">
            <label htmlFor="bgLink" className="text-white">
              Fundo do link
            </label>
            <input
              id="bgLink"
              type="color"
              className="cursor-pointer"
              value={bgColorInput}
              onChange={(e) => setBgColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-3 items-center justify-center">
            <label htmlFor="colorLink" className="text-white">
              Cor do link
            </label>
            <input
              id="colorLink"
              type="color"
              className="cursor-pointer"
              value={txtColorInput}
              onChange={(e) => setTxtColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput && (
          <div className="my-10 p-1 border border-gray-300 rounded flex items-center justify-center flex-col">
            <label className="text-lg text-white">
              Veja como está ficando 👇
            </label>
            <article
              style={{
                backgroundColor: bgColorInput
              }}
              className="flex justify-center p-2 w-full mb-5 py-2 select-none rounded mt-5"
            >
              <span
                style={{
                  color: txtColorInput
                }}
              >
                {nameInput}
              </span>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mt-5 mb-7 flex items-center justify-center bg-blue-600 px-2 h-9 rounded font-semibold text-white hover:bg-blue-500 gap-2"
        >
          <LinkSimpleHorizontal size={28} color="white" />
          Cadastrar
        </button>
      </form>

      <h1 className="text-xl text-white font-medium mt-5">Meus links</h1>

      <article className="flex flex-col w-full max-w-xl mt-5 gap-5 animate-pop">
        {links.map(({ title, link, bgLink, textColor }: LinkProps, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: bgLink,
                color: textColor
              }}
              className={`
                ${!bgLink && "bg-gray-600"}
                flex items-center justify-between p-2 w-full mb-5 py-2 select-none rounded hover:scale-105 transform transition duration-500 cursor-pointer
              `}
            >
              <a href={link} target="_blank" rel="noreferrer">
                <span
                  style={{
                    color: textColor ? textColor : "white"
                  }}
                  className="text-lg leading-tight font-semibold"
                >
                  {title}
                </span>
              </a>
              <button className="border border-dashed border-white bg-black py-1 px-2 rounded">
                <Trash size={28} color="white" />
              </button>
            </div>
          );
        })}
      </article>
    </div>
  )
}

export default withProtected(Admin);