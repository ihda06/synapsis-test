import { Gender, Status } from "@/types/users";
import { z } from "zod";

export enum FormType {
  CREATE = "create",
  UPDATE = "update",
}

export const RegisterUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  gender: z.nativeEnum(Gender),
  status: z.nativeEnum(Status),
});

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
