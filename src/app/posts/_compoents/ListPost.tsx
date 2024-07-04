import { Post } from "@/types/blog";
import Link from "next/link";

export default function ListPost({
  posts,
  isLoading,
}: {
  posts: Post[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3 p-2 ">
        {Array.from({ length: 3 }, (_, i) => i + 1).map((post, idx) => (
          <div
            className="rounded-lg border w-full p-3 space-y-3 hover:scale-105 duration-300 "
            key={idx}
          >
            <div className="w-full rounded-full animate-pulse bg-gray-200 h-4" />
            <div className="w-full rounded-full animate-pulse bg-gray-200 h-2" />
            <div className="w-full rounded-full animate-pulse bg-gray-200 h-2" />
            <div className="w-full rounded-full animate-pulse bg-gray-200 h-2" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0 && !isLoading) {
    return <div className="w-full text-center">No data</div>;
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 p-2 lg:overflow-y-auto">
      {posts.map((post) => (
        <div
          className="rounded-lg border w-full p-3 space-y-3 hover:scale-105 duration-300 "
          key={post.id}
        >
          <h1 className="text-sm font-bold">{post.title}</h1>
          <Link href={`/posts/${post.id}`} className="text-xs underline">
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}
