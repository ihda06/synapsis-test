import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/context/ThemeContext";
import ThemeToggle from "@/components/layout/_components/ThemeToggle";

import TanstackProvider from "@/context/TanstackContext";
import { Toaster } from "react-hot-toast";
import MobileNavbar from "@/components/layout/MobileNavbar";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synapsis Blog",
  description: "Made With ❤️ by Ihda Anwari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <ThemeToggle className="absolute top-5 right-5 hover:scale-150 duration-300 cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-md" />
            <main className="min-h-screen lg:px-72 px-10 py-16 lg:h-screen">
              {children}
              <Toaster />
            </main>
            <MobileNavbar />
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
