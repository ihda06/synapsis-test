"use client";
import { Menus } from "@/const/common";
import cn from "@/utils/formatter";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavbar() {
  const pathName = usePathname();
  const active = (path: string) => {
    if (path === "/") {
      return pathName === path;
    }
    return pathName.startsWith(path);
  };
  return (
    <div className="lg:hidden grid grid-cols-3 fixed bottom-0 left-0 w-full bg-white dark:bg-black dark:text-white">
      {Menus.map((menu) => (
        <Link
          key={menu.name}
          href={menu.href}
          className={cn(
            "text-xs flex flex-col gap-1.5 items-center justify-center p-2",
            active(menu.href) && "border-t-2 border-blue-300"
          )}
        >
          <menu.icon />
          <span>{menu.name}</span>
        </Link>
      ))}
    </div>
  );
}
