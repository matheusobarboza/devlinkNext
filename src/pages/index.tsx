import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import { GithubLogo, InstagramLogo, User, WhatsappLogo } from "phosphor-react";
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

const links = [
  { title: "Portfólio", icon: User, link: "https://www.matheusobarboza.com" },
  {
    title: "Github",
    icon: GithubLogo,
    link: "https://github.com/matheusobarboza"
  },
  {
    title: "Whatsapp",
    icon: WhatsappLogo,
    link: "https://wa.me/5582999949683"
  },
  {
    title: "Instagram",
    icon: InstagramLogo,
    link: "https://www.instagram.com/matheusobarboza/"
  }
];

const Home = (props: Props) => {
  console.log("props", props);
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

        {/* <main className="max-w-[600px] w-11/12 text-center">
          {links.map(({ title, link }: LinkProps, index) => {
            return (
              <section
                key={index}
                className="bg-white w-full mb-5 py-2 select-none rounded hover:scale-105 transform transition duration-500 cursor-pointer"
              >
                <a href={link} target="_blank" rel="noreferrer">
                  <span className="text-lg leading-tight text-gray-600 font-semibold">
                    {title}
                  </span>
                </a>
              </section>
            );
          })}
          <footer className="flex items-center justify-center gap-3 mt-10">
            {links.map(({ icon: Icon, link }: LinkProps, index) => {
              return <Social key={index} icon={Icon} link={link} />;
            })}
          </footer>
        </main> */}
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
        ...doc.data()
      })
    })

    console.log("lista", list)

    if(list === undefined || list === null || list.length === 0) {
      return {
        props: {
          links: {}
        }
      }
    }

    return {
      props: {
        links: list[0],
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
