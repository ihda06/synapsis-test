"use client";
import { Post } from "@/types/blog";
import { axios } from "@/utils/axios";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import ListPost from "./_compoents/ListPost";
import Pagination from "@/components/ui/pagination";

export default function PostsPage({
  searchParams: { page, limit },
}: {
  searchParams: { page: string; limit: string };
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", page, limit],
    queryFn: async () => {
      const res = await axios.get<Post[]>("/posts", {
        params: {
          page: page || 1,
          per_page: limit || 10,
        },
      });

      return {
        data: res.data,
        headers: res.headers,
      };
    },
    placeholderData: keepPreviousData,
  });
  return (
    <div className="divide-y h-full divide-gray-200 dark:divide-gray-700 space-y-6 pb-10 ">
      <div className="">
        <h1 className="text-3xl font-bold text-neutral-600 dark:text-white">
          Posts page
        </h1>
        <small>This page show the list of posts</small>
      </div>
      <div className="py-3 h-full flex flex-col gap-3">
        <h2 className="text-2xl">Post List</h2>
        <ListPost posts={data?.data || []} isLoading={isLoading} />
        <Pagination
          count={
            Number(data?.headers["x-pagination-total"]!) || Number(limit) || 10
          }
          page={Number(page) || 1}
          limit={Number(limit) || 10}
        />
      </div>
    </div>
  );
}
