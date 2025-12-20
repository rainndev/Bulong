"use client";

import { signOut } from "@/lib/actions/post";
import Link from "next/link";

const links = [
  { path: "/dashboard", name: "Dashboard" },
  { path: "/messages", name: "Messages" },
];

interface NavigationBarProps {
  currentPath: string;
}

const NavigationBar = ({ currentPath = "/dashboard" }: NavigationBarProps) => {
  return (
    <div className="bg-amber-500 h-full min-w-xs p-10">
      <div className="flex flex-col ">
        <div className="flex">
          <p>title</p>
          <span>image</span>
        </div>

        <ul className="space-y-2">
          {links.map((data) => (
            <li key={data.name}>
              <Link href={data.path}>{data.name}</Link>
            </li>
          ))}
        </ul>

        <div className="h-full">
          <button
            onClick={signOut}
            className="bg-amber-50 w-full p-2 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
