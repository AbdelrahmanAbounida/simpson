"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { SlMenu } from "react-icons/sl";
import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import Logo from "@/components/logo";
import useWindowSize from "@/hooks/use-window-size";
import PropfileSettings from "./profile-avatar";

export interface LinkItem {
  href: string;
  title: string;
}

const Navbar = () => {
  const links: LinkItem[] = [
    {
      href: "/",
      title: "Home",
    },
    {
      href: "/favourites",
      title: "Favourites",
    },
    {
      href: "/shares",
      title: "Shares",
    },
  ];

  const [openNavbar, setopenNavbar] = useState(false);
  const [showProfileAvatar, setshowProfileAvatar] = useState(true);
  const windowSize = useWindowSize();
  const router = useRouter();

  // useEffect(() => {
  //   console.log(windowSize);
  //   if (windowSize < 500) {
  //     setopenNavbar(false);
  //     setshowProfileAvatar(false);
  //   } else {
  //     setopenNavbar(true);
  //     setshowProfileAvatar(true);
  //   }
  // }, [windowSize]);

  const user = useCurrentUser();

  return (
    <nav className="bg-white border-gray-200 w-full p-9 ">
      <div className=" flex flex-wrap items-center justify-between mx-auto ">
        <Logo />
        <Button
          onClick={() => setopenNavbar((prev) => !prev)}
          variant="outline"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100  "
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <SlMenu size={22} />
        </Button>

        <div
          className={`${!openNavbar && "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8  md:mt-0 md:border-0 md:bg-white  ">
            {links.map((link, index) => (
              <Button
                key={index}
                variant={"link"}
                className="text-md m-0 p-1 hover:no-underline"
              >
                <a
                  href={link.href}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-slate-600 md:p-0 dark:text-white dark:hover:bg-gray-700"
                >
                  {link.title}
                </a>
              </Button>
            ))}

            <PropfileSettings
              name={user?.name as string}
              email={user?.email as string}
              image={user?.image as string}
            />
            <Button className="flex md:hidden" onClick={() => logout()}>
              Logout
            </Button>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
