import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
  profile: z.any(),
  // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  // .refine(
  //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //   "Only .jpg, .jpeg, .png and .webp formats are supported."
  // ),
});

export const finishRegisterExpert = z.object({
  occupation: z.string().min(1, { message: "Occupation is required" }),
  city: z.string().min(1, { message: "City is required" }),
  education: z.array(
    z.object({
      titleEn: z.string().min(1, { message: "First name is required" }),
      titleAm: z.string().min(1, { message: "First name is required" }),
      descriptionEn: z
        .string()
        .min(1, { message: "English Description Is Required" }),
      descriptionAm: z
        .string()
        .min(1, { message: "Amharic Description Is Required" }),
    })
  ),
  experience: z.array(
    z.object({
      titleEn: z.string().min(1, { message: "First name is required" }),
      titleAm: z.string().min(1, { message: "First name is required" }),
      companyEn: z
        .string()
        .min(1, { message: " Company Name English Is Required" }),
      companyAm: z
        .string()
        .min(1, { message: "Company Name Amharic  Is Required" }),
    })
  ),
  specialties: z.array(z.string().min(1, { message: "Specialty is required" })),
  expert_license: z.any(),
  educational_document: z.any(),
});

// generate form types from zod validation schema used for form
export type RegisterExpertInfoValues = z.infer<typeof registerExpertInfoSchema>;
export type FinishRegisterExpertInfoValues = z.infer<typeof finishRegisterExpert>;
