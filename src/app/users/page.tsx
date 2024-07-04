"use client";
import { axios } from "@/utils/axios";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import Pagination from "@/components/ui/pagination";
import { User } from "@/types/users";
import ListUser from "./_compoents/ListUser";
import CreateModal from "./_compoents/register-user-dialog";
import { useState } from "react";
import TextField from "@/components/ui/textfield";
import useDebounce from "@/hooks/useDebounce";

export default function PostsPage({
  searchParams: { page, limit },
}: {
  searchParams: { page: string; limit: string };
}) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts", page, limit, debouncedSearch],
    queryFn: async () => {
      const res = await axios.get<User[]>("/users", {
        params: {
          page: page || 1,
          per_page: limit || 10,
          name: debouncedSearch || "",
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
    <div className="divide-y h-full divide-gray-200 dark:divide-gray-700 space-y-6 ">
      <div className="">
        <h1 className="text-3xl font-bold text-neutral-600 dark:text-white">
          Users page
        </h1>
        <small>This page show the list of user</small>
      </div>
      <div className="py-3 h-full flex flex-col gap-3">
        <div className="flex justify-between">
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
            className="w-60"
          />
          <CreateModal />
        </div>
        <ListUser
          users={data?.data || []}
          isLoading={isLoading}
          refetch={refetch}
        />
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
