import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { DialogTitle } from "@headlessui/react";
import { useState } from "react";

import { FormType } from "@/schema/user";
import dynamic from "next/dynamic";

const RegisterUserForm = dynamic(() => import("./register-user-form"), {
  ssr: false,
  loading: () => <div className="h-[340px]" />,
});

export default function CreateModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Create user</Button>
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen} className="w-full">
        <DialogTitle className="text-lg font-bold dark:text-white">
          Create New User
        </DialogTitle>
        <RegisterUserForm
          formType={FormType.CREATE}
          onSuccess={() => setIsOpen(false)}
        />
      </Dialog>
    </div>
  );
}
