import { FormType, RegisterUserSchema, RegisterUserType } from "@/schema/user";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldWrapper from "@/components/ui/fieldwrapper";
import TextField from "@/components/ui/textfield";

import { Status, Gender, User } from "@/types/users";
import Button from "@/components/ui/button";
import CustomSelect from "@/components/ui/Select";
import { useMutation } from "@tanstack/react-query";
import { axios } from "@/utils/axios";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useClose } from "@headlessui/react";

const GenderOptions = [
  {
    value: Gender.MALE,
    label: "Male",
  },
  {
    value: Gender.FEMALE,
    label: "Female",
  },
];

const StatusOptions = [
  {
    value: Status.ACTIVE,
    label: "Active",
  },
  {
    value: Status.INACTIVE,
    label: "Inactive",
  },
];

export default function RegisterUserForm({
  formType,
  user,
  onSuccess,
}: {
  user?: User;
  formType: FormType;
  onSuccess?: () => void;
}) {
  const { control, reset, handleSubmit, setError } = useForm<RegisterUserType>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      status: Status.ACTIVE,
      gender: Gender.MALE,
    },
  });

  const close = useClose();

  const { mutate: mutateCreate } = useMutation({
    mutationKey: ["users"],
    mutationFn: async (data: RegisterUserType) => {
      const res = await axios.post("/users", { ...data });

      return res.data;
    },
    onError: (error) => {
      if (isAxiosError<{ field: string; message: string }[]>(error)) {
        error.response?.data.map((err) => {
          setError(err.field as keyof RegisterUserType, {
            type: "custom",
            message: err.message,
          });
        });
      }
    },
    onSuccess: (data) => {
      onSuccess?.();
      close();
      toast.success("User created successfully");
    },
  });
  const { mutate: mutateUpdate } = useMutation({
    mutationKey: ["users"],
    mutationFn: async (data: RegisterUserType) => {
      const res = await axios.put(`/users/${user!.id}`, { ...data });

      return res.data;
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
    onSuccess: (data) => {
      close();
      onSuccess?.();
      toast.success("User updated successfully");
    },
  });

  const onSubmit = (data: RegisterUserType) => {
    if (formType === FormType.CREATE) {
      mutateCreate(data);
    } else {
      mutateUpdate(data);
    }
  };

  useEffect(() => {
    if (formType === FormType.UPDATE && user) {
      console.log(user);

      reset({
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
      });
    }
  }, [formType, user, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          <FieldWrapper
            label="Name"
            error={!!error}
            helperText={error?.message}
          >
            <TextField
              onChange={field.onChange}
              type="text"
              error={!!error}
              value={field.value}
            />
          </FieldWrapper>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <FieldWrapper
            label="Email"
            error={!!error}
            helperText={error?.message}
          >
            <TextField
              onChange={field.onChange}
              type="text"
              error={!!error}
              value={field.value}
            />
          </FieldWrapper>
        )}
      />
      <Controller
        control={control}
        name="gender"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FieldWrapper
            label="Gender"
            error={!!error}
            helperText={error?.message}
          >
            <CustomSelect
              options={GenderOptions}
              onChange={(e) => onChange(e?.value)}
              value={
                value
                  ? GenderOptions.find((s) => s.value === value)
                  : GenderOptions[0]
              }
            />
          </FieldWrapper>
        )}
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FieldWrapper
            label="Status"
            error={!!error}
            helperText={error?.message}
          >
            <CustomSelect
              options={StatusOptions}
              onChange={(e) => onChange(e?.value)}
              value={
                value
                  ? StatusOptions.find((s) => s.value === value)
                  : StatusOptions[0]
              }
            />
          </FieldWrapper>
        )}
      />

      <div className="flex justify-end">
        <Button type="submit" className="">
          Submit
        </Button>
      </div>
    </form>
  );
}
