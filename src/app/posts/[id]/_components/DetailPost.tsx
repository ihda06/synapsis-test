import { getSinglePost } from "@/actions/Blog";

export default async function DetailPost({ id }: { id: string }) {
  const { data: post } = await getSinglePost(Number(id));

  return (
    <div className="rounded-lg border w-full p-3 space-y-3">
      <h1 className="text-sm font-bold">{post?.title}</h1>
      <p className="text-xs">{post?.body}</p>
    </div>
  );
}
