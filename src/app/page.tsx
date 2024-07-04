import { getPosts } from "@/actions/Blog";
import { Suspense } from "react";

import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import { Menus } from "@/const/common";

export default async function Home() {
  const data = await getPosts();

  return (
    <div className="h-full flex flex-col gap-12 justify-center">
      <div className="rounded-lg border p-3 w-full space-y-3">
        <h1 className="text-5xl font-bold">Synapsis Blog</h1>
        <p className="text-base text-neutral-600 dark:text-neutral-100">
          Here you will find various interesting articles about the latest
          technology, science and innovation. Dive into the world of knowledge
          with us!
        </p>
        <div className="flex gap-2">
          {Menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.href}
              className="text-xs flex gap-1.5 dark:bg-cyan-600 bg-cyan-300 shadow-md p-2 rounded"
            >
              <menu.icon />
              <span>{menu.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-3 divide-y">
        <h1 className="text-lg font-bold">Random Post</h1>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 pt-3">
          <Suspense fallback={<div>Loading...</div>}>
            {data.data &&
              data?.data.slice(0, 3).map((post) => (
                <div
                  className="rounded-lg border w-full p-3 space-y-3 hover:scale-105 duration-300 "
                  key={post.id}
                >
                  <h1 className="text-sm font-bold">{post.title}</h1>
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-xs underline"
                  >
                    Read More
                  </Link>
                </div>
              ))}
          </Suspense>
        </div>
      </div>
      <div className="">
        <div className="flex gap-3">
          <Link href="https://github.com/ihda06">
            <GitHubLogoIcon className="w-5 h-5 text-neutral-600 hover:scale-105 duration-300 dark:text-white" />
          </Link>
          <Link href={"https://linkedin.com/in/ihda-anwari"}>
            <LinkedInLogoIcon className="w-5 h-5 text-neutral-600 hover:scale-105 duration-300 dark:text-white" />
          </Link>
        </div>
        <span className="w-full text-center text-neutral-600 text-xs dark:text-white">
          Made With ❤️ by Ihda Anwari
        </span>
      </div>
    </div>
  );
}
