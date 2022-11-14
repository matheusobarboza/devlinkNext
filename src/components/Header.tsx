import Link from "next/link";
import { useRouter } from "next/router";
import { SignOut } from "phosphor-react";
import { useMemo } from "react";
import { useAuth } from "../hooks/AuthContext";

interface LinkItemProps {
  name: string;
  route: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Links", route: "/admin" },
  { name: "Redes Sociais", route: "/admin/networks" },
];

export const Header = () => {
  const { logoutUser } = useAuth();

  const router = useRouter();

  const isActiveMenu = useMemo(
    () => LinkItems.find((menu) => menu.route === router.pathname),
    [router.pathname]
  );

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <header className="w-full max-w-[720px] mt-4 mb-7 px-4">
      <nav className="w-full bg-white h-12 flex items-center rounded">
        <button onClick={handleLogout} className="bg-transparent mr-6 ml-2">
          <SignOut size={28} color="#db2629" />
        </button>

        {LinkItems.map(({ name, route }, index) => {
          return (
            <Link
              key={index}
              href={route}
              className={`
                ${isActiveMenu?.name === name ? "text-black" : "text-zinc-700"}
                mr-4 font-medium hover:text-zinc-500 transition-colors
              `}
            >
              {name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
