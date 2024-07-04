import { Suspense } from "react";
import DetailPost from "./_components/DetailPost";
import Link from "next/link";
import Comments from "./_components/Comments";
import { ResetIcon } from "@radix-ui/react-icons";

export default async function PostsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="divide-y h-full divide-gray-200 dark:divide-gray-700 space-y-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-600 dark:text-white">
          Detail post page
        </h1>
        <div className="flex items-center px-2 py-1 rounded-md border hover:text-white duration-300 hover:bg-slate-400 cursor-pointer">
          <Link href="/posts" className="flex items-center gap-1">
            <span>Back</span>
            <ResetIcon />
          </Link>
        </div>
      </div>
      <div className="py-3 h-full flex flex-col gap-3">
        <div className="h-64">
          <Suspense fallback={<div>Loading...</div>}>
            <DetailPost id={id} />
          </Suspense>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Comments id={id} />
        </Suspense>
      </div>
    </div>
  );
}
