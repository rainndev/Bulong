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
    <div className="h-full min-w-2xs rounded-tl-3xl rounded-bl-3xl bg-white p-4 py-10">
      <div className="flex h-full flex-col items-center justify-between">
        {/* title and logo */}
        <div className="flex">
          <p>title</p>
          <span>image</span>
        </div>

        {/* links */}
        <div className="flex h-full w-full flex-col space-y-2 py-20">
          {links.map((data) => {
            const Icon = data.icon;

            return (
              <Link
                key={data.name}
                className={`${
                  data.path === currentPath && "bg-violet-100"
                } group flex cursor-pointer items-center gap-2 rounded-lg px-4 py-3 transition-colors ease-in-out hover:bg-violet-100`}
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
                  } text-md group-hover:text-violet-950`}
                >
                  {data.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-gray-500 hover:bg-violet-100">
          <IoExitOutline className="text-2xl" />
          <button
            onClick={signOut}
            className="w-full text-sm transition-colors ease-in-out"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
