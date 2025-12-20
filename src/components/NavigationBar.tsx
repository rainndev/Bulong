"use client";

import { signOut } from "@/lib/actions/post";
import Link from "next/link";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";

const links = [
  { path: "/dashboard", name: "Dashboard", icon: MdOutlineSpaceDashboard },
  { path: "/messages", name: "Messages", icon: BiMessageSquareDots },
];

interface NavigationBarProps {
  currentPath: string;
}

const NavigationBar = ({ currentPath = "/dashboard" }: NavigationBarProps) => {
  return (
    <div className=" h-full min-w-2xs p-4 bg-white  rounded-tl-3xl rounded-bl-3xl py-10">
      <div className="flex flex-col justify-between items-center  h-full ">
        {/* title and logo */}
        <div className="flex">
          <p>title</p>
          <span>image</span>
        </div>

        {/* links */}
        <div className="h-full py-20 w-full flex flex-col space-y-2">
          {links.map((data) => {
            const Icon = data.icon;

            return (
              <Link
                key={data.name}
                className="hover:bg-violet-100 flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer group"
                href={data.path}
              >
                <Icon className="text-lg group-hover:text-violet-950" />
                <span className="text-md group-hover:text-violet-950">
                  {data.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="w-full">
          <button
            onClick={signOut}
            className="bg-violet-50 w-full p-2 rounded-lg "
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
