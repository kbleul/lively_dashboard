import { z } from "zod";

// form zod validation schema
export const registerExpertInfoSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  userName: z.string().min(1, { message: "User name is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  birthDate: z.date().min(new Date(1900, 1, 1), {
    message: "Invalid birth date",
  }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine((value) => value.length === 9, {
      message: "Phone number must  be 9 digits long",
    }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(4, { message: "Password is required" }),
});

// generate form types from zod validation schema used for form
export type RegisterExpertInfoValues = z.infer<typeof registerExpertInfoSchema>;
