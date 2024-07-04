"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { useTheme } from "next-themes";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  if (theme === "light" || theme === undefined) {
    return (
      <SunIcon
        onClick={() => {
          setTheme("dark");
        }}
        className={className}
      />
    );
  } else {
    return (
      <MoonIcon
        onClick={() => {
          setTheme("light");
        }}
        className={className}
      />
    );
  }
}
