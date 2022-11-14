import { doc, getDoc, setDoc } from "firebase/firestore";
import Head from "next/head";
import { LinkSimpleHorizontal } from "phosphor-react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/ui/Input";
import { withProtected } from "../../../hooks/routes";
import { db } from "../../../services/firebaseConnection";

interface SocialProps {
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

interface Props {
  socials?: SocialProps;
}

const Networks = (props: Props) => {
  const [urlFacebook, setUrlFacebook] = useState(
    props && props?.socials?.facebook
  );
  const [urlInstagram, setUrlInstagram] = useState(
    props && props?.socials?.instagram
  );
  const [urlYoutube, setUrlYoutube] = useState(
    props && props?.socials?.youtube
  );

  const handleSave = (e: FormEvent) => {
    e.preventDefault();

    if(urlFacebook === "" || urlInstagram === "" || urlYoutube === "") {
      toast.warn("É necessário preencher todos os campos!")
      return;
    }

    setDoc(doc(db, "social", "link"), {
      facebook: urlFacebook,
      instagram: urlInstagram,
      youtube: urlYoutube,
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
              Link do Facebook
            </label>
            <Input
              id="linkName"
              placeholder="Digite a url do facebook..."
              value={urlFacebook}
              onChange={(e) => setUrlFacebook(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="linkName" className="text-white">
              Link do instagram
            </label>
            <Input
              id="linkName"
              placeholder="Digite a url do facebook..."
              value={urlInstagram}
              onChange={(e) => setUrlInstagram(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="linkName" className="text-white">
              Link do youtube
            </label>
            <Input
              id="linkName"
              placeholder="Digite a url do facebook..."
              value={urlYoutube}
              onChange={(e) => setUrlYoutube(e.target.value)}
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
          socials: {}
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
      props: {
        socials: null
      }
    };
  }
};

export default withProtected(Networks);
