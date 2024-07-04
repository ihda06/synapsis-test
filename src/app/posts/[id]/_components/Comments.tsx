import { getComments } from "@/actions/Blog";

export default async function Comments({ id }: { id: string }) {
  const comments = await getComments(Number(id));
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">{`Comments(${comments.data?.length})`}</h1>
      <div className="space-y-3">
        {comments.data &&
          comments.data.map((comment) => (
            <div key={comment.id} className="flex cursor-pointer">
              <div className="space-y-3 p-3 rounded-lg border shadow hover:scale-105 duration-300 text-wrap">
                <div className="">
                  <h1 className="text-sm font-bold">{comment.name}</h1>
                  <small className="text-xs text-gray-400">
                    {comment.email}
                  </small>
                </div>

                <p className="text-xs">{comment.body}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
