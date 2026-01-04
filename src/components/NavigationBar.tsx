"use client";

import { signOut } from "@/lib/actions/post";
import Link from "next/link";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import Image from "next/image";

const links = [
  { path: "/dashboard", name: "Dashboard", icon: MdOutlineSpaceDashboard },
  { path: "/messages", name: "Messages", icon: BiMessageSquareDots },
];

interface NavigationBarProps {
  currentPath: string;
}

const NavigationBar = ({ currentPath = "/dashboard" }: NavigationBarProps) => {
  return (
    <div className="fixed inset-x-2 bottom-4 z-20 rounded-full border-2 border-violet-200 bg-white p-2 drop-shadow-2xl drop-shadow-violet-600/30 md:static md:top-0 md:h-dvh md:w-48 md:rounded-none md:border-0 md:drop-shadow-none lg:w-[18rem]">
      <div className="flex h-full flex-row items-center justify-between md:flex-col md:py-10">
        {/* title and logo */}
        <Link
          href={"/"}
          className="hidden w-full cursor-pointer items-center justify-start gap-2 px-5 md:flex"
        >
          <div className="rounded-2xl bg-violet-50 p-2">
            <Image
              src={"/logo-transparent-1.png"}
              alt="app-logo"
              width={40}
              height={40}
            />
          </div>

          <p className="text-md font-sans font-medium md:text-lg">Bulong</p>
        </Link>

        {/* links */}
        <div className="flex h-full w-full flex-row items-center gap-2 md:flex-col md:gap-5 md:py-20">
          {links.map((data) => {
            const Icon = data.icon;

            return (
              <div key={data.name} className="flex md:w-full">
                <div
                  className={`w-1.5 ${data.path === currentPath ? "bg-violet-950" : "bg-violet-200"} mr-3 -ml-1 hidden rounded-tr-full rounded-br-full md:block`}
                />
                <Link
                  key={data.name}
                  className={`${
                    data.path === currentPath &&
                    "bg-violet-100 md:bg-transparent"
                  } group flex w-fit cursor-pointer items-center gap-2 rounded-full border-l-violet-200 px-4 py-3 transition-all ease-in-out hover:bg-violet-100 md:-ml-2 md:w-full md:rounded-none md:hover:rounded-tr-xl md:hover:rounded-br-xl`}
                  href={data.path}
                >
                  <Icon
                    className={`${
                      data.path === currentPath && "text-violet-950"
                    } text-lg group-hover:text-violet-950`}
                  />
                  <span
                    className={`${
                      data.path === currentPath && "font-medium text-violet-950"
                    } text-md hidden group-hover:text-violet-950 md:block`}
                  >
                    {data.name}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        <div
          onClick={signOut}
          className="flex w-fit cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-gray-500 hover:bg-violet-100 md:w-full"
        >
          <IoExitOutline className="text-lg md:text-2xl" />
          <button className="hidden w-full text-sm transition-colors ease-in-out md:block">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
