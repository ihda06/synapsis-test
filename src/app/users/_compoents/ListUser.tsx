import Dialog from "@/components/ui/dialog";
import Status from "@/components/ui/status";
import { FormType } from "@/schema/user";
import { User } from "@/types/users";
import { axios } from "@/utils/axios";
import { DialogTitle } from "@headlessui/react";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import dynamic from "next/dynamic";
import { useState } from "react";
import toast from "react-hot-toast";
const RegisterUserForm = dynamic(() => import("./register-user-form"), {
  ssr: false,
  loading: () => <div className="h-[340px]" />,
});

export default function ListUser({
  users,
  isLoading,
  refetch,
}: {
  users: User[];
  isLoading: boolean;
  refetch: () => void;
}) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["users"],
    mutationFn: async (id: number) => {
      const res = await axios.delete(`/users/${id}`);

      return res.data;
    },
    onError: (error) => {
      if (isAxiosError<{ field: string; message: string }[]>(error)) {
        toast.error(error.response?.data[0].message ?? "Something went wrong");
      }
    },
    onSuccess: () => {
      toast.success("User deleted successfully");
      refetch();
    },
  });

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

  if (users.length === 0 && !isLoading) {
    return <div className="w-full text-center">No data</div>;
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 p-2 lg:overflow-y-auto">
      {users.map((user) => (
        <div
          className="rounded-lg border w-full p-3 space-y-3 hover:scale-105 duration-300 relative"
          key={user.id}
          onClick={() => {
            setSelectedUser(user);
            setIsOpen(true);
          }}
        >
          <div
            className="p-1 duration-300 absolute top-2 right-2 rounded-full hover:bg-gray-300"
            onClick={() => mutate(user.id)}
          >
            <TrashIcon className="text-red-500 size-5" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col justify-center items-center">
                {user.gender === "male" ? (
                  <h1 className="text-4xl">👨</h1>
                ) : (
                  <h1 className="text-4xl">👩</h1>
                )}
                <Status
                  text={user.status}
                  color={user.status === "active" ? "green" : "red"}
                  size={"sm"}
                />
              </div>
              <div className="w-full truncate">
                <h1 className="text-sm font-bold ">{user.name}</h1>
                <p className="text-xs ">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {selectedUser && (
        <Dialog isOpen={isOpen} onOpenChange={setIsOpen} className="w-full">
          <DialogTitle className="text-lg font-bold dark:text-white">
            Update {selectedUser?.name}
          </DialogTitle>
          <RegisterUserForm
            formType={FormType.UPDATE}
            user={selectedUser}
            onSuccess={() => {
              refetch();
            }}
          />
        </Dialog>
      )}
    </div>
  );
}
