import { doc, getDoc, setDoc } from "firebase/firestore";
import Head from "next/head";
import { LinkSimpleHorizontal } from "phosphor-react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { SocialProps } from "../..";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/ui/Input";
import { withProtected } from "../../../hooks/routes";
import { db } from "../../../services/firebaseConnection";

interface Props {
  socials?: SocialProps;
}

const Networks = ({ socials }: Props) => {
  const [urlInstagram, setUrlInstagram] = useState(
    socials && socials?.instagram
  );
  const [urlLinkedin, setUrlLinkedin] = useState(
    socials && socials?.linkedin
  );
  const [urlWhatsapp, setUrlWhatsapp] = useState(
    socials && socials?.whatsapp
  );

  const handleSave = (e: FormEvent) => {
    e.preventDefault();

    if(urlInstagram === "" || urlLinkedin === "" || urlWhatsapp === "") {
      toast.warn("É necessário preencher todos os campos!")
      return;
    }

    setDoc(doc(db, "social", "link"), {
      instagram: urlInstagram,
      linkedin: urlLinkedin,
      whatsapp: urlWhatsapp,
    })
      .then(() => {
        toast.success("Urls salvas com sucesso!");
      })
      .catch((err) => {
        console.log("Erro ao salvar", err);
      });
  };

  return (
    <>
      <Head>
        <title>DevLink - Gerencie seus links</title>
      </Head>

      <div className="h-screen flex flex-col items-center min-h-screen p-5">
        <Header />

        <h1 className="text-5xl sm:text-6xl text-white mt-4 mb-7 px-4">
          Suas redes Sociais
        </h1>

        <form
          onSubmit={handleSave}
          className="flex flex-col w-full max-w-xl mt-5 gap-5"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="linkName" className="text-white">
              Link do Instagram
            </label>
            <Input
              id="linkName"
              placeholder="Digite a url do instagram..."
              value={urlInstagram}
              onChange={(e) => setUrlInstagram(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="linkName" className="text-white">
              Link do Linkedin
            </label>
            <Input
              id="linkName"
              placeholder="Digite a url do linkedin..."
              value={urlLinkedin}
              onChange={(e) => setUrlLinkedin(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="linkName" className="text-white">
              Link do Whatsapp
            </label>
            <Input
              id="linkName"
              placeholder="Digite a url do whatsapp..."
              value={urlWhatsapp}
              onChange={(e) => setUrlInstagram(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-5 mb-7 flex items-center justify-center bg-blue-600 px-2 h-9 rounded font-semibold text-white hover:bg-blue-500 gap-2"
          >
            <LinkSimpleHorizontal size={28} color="white" />
            Salvar links
          </button>
        </form>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const docRef = doc(db, "social", "link");
    const res = await getDoc(docRef);

    if (res.data() === undefined) {
      return {
        props: {
          socials: null,
        }
      };
    }

    return {
      props: {
        socials: res?.data(),
      }
    };
  } catch (err) {
    console.log(err);
    return {
      props: null,
    };
  }
};

export default withProtected(Networks);
