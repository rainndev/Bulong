"use client";

import { signOut } from "@/lib/actions/post";
import Link from "next/link";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";

const links = [
  { path: "/dashboard", name: "Dashboard", icon: MdOutlineSpaceDashboard },
  { path: "/messages", name: "Messages", icon: BiMessageSquareDots },
];

interface NavigationBarProps {
  currentPath: string;
}

const NavigationBar = ({ currentPath = "/dashboard" }: NavigationBarProps) => {
  return (
    <div className="fixed inset-x-2 bottom-4 z-20 rounded-full border-2 border-violet-200 bg-white p-4 py-2 drop-shadow-2xl drop-shadow-violet-600/30 md:static md:top-0 md:h-dvh md:w-[18rem] md:rounded-none md:border-0 md:drop-shadow-none">
      <div className="flex h-full flex-row items-center justify-between md:flex-col">
        {/* title and logo */}
        <div className="hidden md:flex">
          <p>title</p>
          <span>image</span>
        </div>

        {/* links */}
        <div className="flex h-full w-full flex-row items-center gap-2 md:flex-col md:py-20">
          {links.map((data) => {
            const Icon = data.icon;

            return (
              <Link
                key={data.name}
                className={`${
                  data.path === currentPath && "bg-violet-100"
                } group flex w-fit cursor-pointer items-center gap-2 rounded-lg px-4 py-3 transition-colors ease-in-out hover:bg-violet-100 md:w-full`}
                href={data.path}
              >
                <Icon
                  className={`${
                    data.path === currentPath && "text-violet-950"
                  } text-lg group-hover:text-violet-950`}
                />
                <span
                  className={`${
                    data.path === currentPath && "text-violet-950"
                  } text-md hidden group-hover:text-violet-950 md:block`}
                >
                  {data.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div
          onClick={signOut}
          className="flex w-fit cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-gray-500 hover:bg-violet-100 md:w-full"
        >
          <IoExitOutline className="text-2xl" />
          <button className="hidden w-full text-sm transition-colors ease-in-out md:block">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
