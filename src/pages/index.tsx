import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import { Icon, InstagramLogo, LinkedinLogo, WhatsappLogo } from "phosphor-react";
import { useState } from "react";
import { Social } from "../components/Social";
import { db } from "../services/firebaseConnection";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface Props {
  links?: LinkProps[];
}

interface IconProps {
  title: string;
  icon: Icon;
  link: string;
}

const icons: IconProps[] = [
  {
    title: "Instagram",
    icon: InstagramLogo,
    link: "https://www.instagram.com/matheusobarboza/"
  },
  {
    title: "Linkedin",
    icon: LinkedinLogo,
    link: "https://www.linkedin.com/in/matheusobarboza/"
  },
  {
    title: "Whatsapp",
    icon: WhatsappLogo,
    link: "https://wa.me/5582999949683"
  },
];

const Home = ({ links }: Props) => {
  const [list, setLis] = useState<LinkProps[] | null>(links && links)

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
                  backgroundColor: bg,
                }}
                className={`
                  w-full mb-5 py-2 select-none rounded hover:scale-105 transform transition duration-500 cursor-pointer
                `}
              >
                <a href={url} target="_blank" rel="noreferrer">
                  <span
                    style={{
                      color: color ? color : '#ffff',
                    }} 
                    className="text-lg leading-tight font-semibold"
                  >
                    {name}
                  </span>
                </a>
              </section>
            );
          })}
          <footer className="flex items-center justify-center gap-3 mt-10">
            {icons.map(({ icon: Icon, link }, index) => {
              return <Social key={index} icon={Icon} link={link} />;
            })}
          </footer>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));


    const res = await getDocs(queryRef)

    let list = [];

    res.forEach((doc) => {
      list.push({
        id: doc.id,
        name: doc.data().name,
        url: doc.data().url,
        bg: doc.data().bg,
      })
    })

    if(list === undefined || list === null || list.length === 0) {
      return {
        props: {
          links: null,
        }
      }
    }

    return {
      props: {
        links: list,
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
