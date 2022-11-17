import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { CircleNotch, LinkSimpleHorizontal, Trash } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LinkProps } from "..";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import { Input } from "../../components/ui/Input";
import { withProtected } from "../../hooks/routes";
import { db } from "../../services/firebaseConnection";

interface Props {
  links?: LinkProps[];
}

const Admin = ({ links }: Props) => {
  const router = useRouter();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [bgColorInput, setBgColorInput] = useState("#f1f1f1");
  const [txtColorInput, setTxtColorInput] = useState("#121212");

  const [list, setList] = useState<LinkProps[] | null>(links && links);
  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      toast.warn("Preencha todos os campos!");
      return;
    }

    addDoc(collection(db, "links"), {
      bg: bgColorInput,
      name: nameInput,
      url: urlInput,
      color: txtColorInput,
      created: new Date()
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        toast.success("Link cadastrado com sucesso!");
        refreshData();
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar!");
        console.log("Erro ao cadastrar", error);
      });
  };

  const handleDeleteLink = async (id: string) => {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
    refreshData();
  };

  useEffect(() => {
    setList(links);
    setIsRefreshing(false);
  }, [links]);

  return (
    <>
      <Head>
        <title>DevLink - Gerencie seus links</title>
      </Head>
      <div className="h-full flex flex-col items-center min-h-screen p-5">
        <Header />
        {isRefreshing && (
          <CircleNotch
            size={30}
            color="white"
            className="animate-spin absolute right-3"
          />
        )}

        <Logo />

        <form
          onSubmit={handleRegister}
          className="flex flex-col w-full max-w-xl mt-5 gap-5"
        >
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
          {list?.map((link) => {
            return (
              <div
                key={link?.id}
                style={{
                  backgroundColor: link?.bg,
                  color: link?.color
                }}
                className={`
                ${!link?.bg && "bg-gray-600"}
                flex items-center justify-between p-2 w-full mb-5 py-2 select-none rounded hover:scale-105 transform transition duration-500 cursor-pointer
              `}
              >
                <a href={link?.url} target="_blank" rel="noreferrer">
                  <span
                    style={{
                      color: link?.color ? link?.color : "white"
                    }}
                    className="text-lg leading-tight font-semibold"
                  >
                    {link?.name}
                  </span>
                </a>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="border border-dashed border-white bg-black py-1 px-2 rounded"
                >
                  <Trash size={28} color="white" />
                </button>
              </div>
            );
          })}
        </article>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const res = await getDocs(queryRef);

    let list = [];

    res.forEach((doc) => {
      list.push({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
        bg: doc.data().bg,
        color: doc.data().color
      });
    });

    if (list === undefined || list === null || list.length === 0) {
      return {
        props: {
          links: null
        }
      };
    }

    return {
      props: {
        links: list
      }
    };
  } catch (err) {
    console.log(err);
    return {
      props: null
    };
  }
};

export default withProtected(Admin);
