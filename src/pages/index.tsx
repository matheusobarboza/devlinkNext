import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";
import Head from "next/head";
import {
  InstagramLogo,
  LinkedinLogo,
  WhatsappLogo
} from "phosphor-react";
import { useState } from "react";
import { Social } from "../components/Social";
import { db } from "../services/firebaseConnection";

export interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export interface SocialProps {
  whatsapp: string;
  instagram: string;
  linkedin: string;
}

interface Props {
  links?: LinkProps[];
  social: SocialProps;
}

const Home = ({ links, social }: Props) => {
  const [list, setLis] = useState<LinkProps[] | null>(links && links);
  const [socialLinks, setSocialLinks] = useState<SocialProps | null>(
    social && social
  );
  console.log(socialLinks);

  return (
    <>
      <Head>
        <title>DevLink - Meus links</title>
      </Head>
      <div className="h-screen flex flex-col items-center py-10">
        <h1 className="text-white text-4xl sm:text-5xl font-semibold mb-4 pt-24 select-none">
          Matheus Barboza
        </h1>
        <span className="text-gray-100 text-lg mb-6 select-none">
          Veja meus links 👇
        </span>

        <main className="max-w-[600px] w-11/12 text-center">
          {list.map(({ id, name, url, bg, color }) => {
            return (
              <section
                key={id}
                style={{
                  backgroundColor: bg
                }}
                className={`
                  w-full mb-5 py-2 select-none rounded hover:scale-105 transform transition duration-500 cursor-pointer
                `}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 sm:px-44"
                >
                  <span
                    style={{
                      color: color ? color : "#ffff"
                    }}
                    className="text-lg leading-tight font-semibold"
                  >
                    {name}
                  </span>
                </a>
              </section>
            );
          })}
          {list.length !== 0 && Object.keys(socialLinks).length > 0 && (
            <footer className="flex items-center justify-center gap-3 mt-10">
              <Social icon={InstagramLogo} link={socialLinks.instagram} />
              <Social icon={LinkedinLogo} link={socialLinks.linkedin} />
              <Social icon={WhatsappLogo} link={socialLinks.whatsapp} />
            </footer>
          )}
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const linksRef = collection(db, "links");
    const docRef = doc(db, "social", "link");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const res = await getDocs(queryRef);
    const socialRes = await getDoc(docRef);
    console.log(socialRes.data());

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

    if (socialRes.data() === undefined) {
      return {
        props: {
          social: null
        }
      };
    }

    if (list === undefined || list === null || list.length === 0) {
      return {
        props: {
          links: null
        }
      };
    }

    return {
      props: {
        links: list,
        social: socialRes.data()
      }
    };
  } catch (err) {
    console.log(err);
    return {
      props: null
    };
  }
};

export default Home;
