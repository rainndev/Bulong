"use client";

import BrandMark from "@/components/BrandMark";
import { signOut } from "@/lib/actions/post";
import Link from "next/link";
import { BiMessageSquareDots } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineSettings, MdOutlineSpaceDashboard } from "react-icons/md";

type NavItem = {
  path: "/dashboard" | "/messages" | "/settings";
  name: string;
  icon: typeof MdOutlineSpaceDashboard;
};

const groups: { label: string; items: NavItem[] }[] = [
  {
    label: "Inbox",
    items: [
      { path: "/dashboard", name: "Dashboard", icon: MdOutlineSpaceDashboard },
      { path: "/messages", name: "Messages", icon: BiMessageSquareDots },
    ],
  },
  {
    label: "Account",
    items: [{ path: "/settings", name: "Settings", icon: MdOutlineSettings }],
  },
];

const allItems = groups.flatMap((group) => group.items);

interface SideBarProps {
  currentPath: "/dashboard" | "/messages" | "/settings" | "/";
}

const SideBar = ({ currentPath = "/dashboard" }: SideBarProps) => {
  return (
    <>
      <aside className="hidden h-dvh w-60 shrink-0 flex-col border-r border-[#262626] bg-[#171717] px-3 pt-5 pb-3.5 text-[13px] md:flex">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-2 pb-2.5 text-base font-semibold tracking-[-0.04em] text-[#ece8df]"
        >
          <BrandMark size={28} className="shrink-0" />
          Bulong
        </Link>

        <div className="mx-1 mb-4 rounded-lg bg-white/[0.07] px-2.5 py-2 text-xs text-[#c9c3b8]">
          Anonymous inbox <span className="text-[#a3a3a3]">▾</span>
        </div>

        <nav aria-label="Primary" className="flex flex-col">
          {groups.map((group) => (
            <div key={group.label} className="mb-3.5">
              <p className="px-2 py-1.5 text-[10px] font-medium tracking-[0.12em] text-[#a3a3a3] uppercase">
                {group.label}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.path === currentPath;

                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    aria-current={isActive ? "page" : undefined}
                    className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors ${
                      isActive
                        ? "bg-[#365314] font-semibold text-[#ecfccb]"
                        : "font-medium text-[#b5b0a6] hover:bg-white/5 hover:text-[#ece8df]"
                    }`}
                  >
                    <Icon className="text-base" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <button
          onClick={signOut}
          className="mt-auto mb-2 flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 font-medium text-[#b5b0a6] transition-colors hover:bg-white/5 hover:text-[#ece8df]"
        >
          <IoExitOutline className="text-base" />
          Sign out
        </button>

        <div className="rounded-[10px] bg-white/[0.06] p-2.5 text-xs text-[#c9c3b8]">
          <p className="font-semibold text-[#ece8df]">Bulong</p>
          <p className="mt-0.5 opacity-70">Anonymous by default</p>
        </div>
      </aside>

      <nav
        aria-label="Primary"
        className="fixed inset-x-3 bottom-3 z-20 flex items-center justify-between gap-1 rounded-2xl border border-[#262626] bg-[#171717] p-1.5 md:hidden"
      >
        {allItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === currentPath;

          return (
            <Link
              key={item.name}
              href={item.path}
              aria-label={item.name}
              aria-current={isActive ? "page" : undefined}
              className={`grid size-10 flex-1 place-items-center rounded-xl transition-colors ${
                isActive
                  ? "bg-[#365314] text-[#ecfccb]"
                  : "text-[#b5b0a6] hover:text-[#ece8df]"
              }`}
            >
              <Icon className="text-lg" />
            </Link>
          );
        })}
        <button
          onClick={signOut}
          aria-label="Sign out"
          className="grid size-10 flex-1 cursor-pointer place-items-center rounded-xl text-[#b5b0a6] transition-colors hover:text-[#ece8df]"
        >
          <IoExitOutline className="text-lg" />
        </button>
      </nav>
    </>
  );
};

export default SideBar;
