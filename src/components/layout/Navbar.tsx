"use client";

import { Menus } from "@/const/common";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "@/utils/formatter";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [hovered, setHovered] = useState(false);
  const pathName = usePathname();
  const active = (path: string) => {
    if (path === "/") {
      return pathName === path;
    }
    return pathName.startsWith(path);
  };
  return (
    <nav
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute lg:flex hidden flex-col left-0 top-0 w-16 h-screen hover:w-64 ease-in-out px-3 py-5 items-center hover:items-center dark:bg-black dark:text-white duration-1000 bg-white space-y-6 shadow-md dark:shadow-white"
    >
      <div
        className={cn(
          "flex items-center justify-center flex-col gap-3 border-b w-full pb-6"
        )}
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="rounded-lg size-10"
        />
        <AnimatePresence>
          {hovered && (
            <motion.h1
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              className="text-md font-bold text-center"
            >
              Synapsis Blog
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col justify-center gap-3">
        {Menus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.href}
            className={cn(
              "flex gap-5 w-full px-2 py-1 rounded-md items-center duration-300 justify-start hover:scale-110 ",
              active(menu.href) && "bg-blue-100 dark:bg-black dark:border"
            )}
          >
            <menu.icon className="size-6 text-neutral-500 dark:text-white" />
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {menu.name}
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        ))}
      </div>
    </nav>
  );
}
