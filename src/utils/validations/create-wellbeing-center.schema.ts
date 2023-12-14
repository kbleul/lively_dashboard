import { z } from "zod";
import * as yup from "yup";
export const fileSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.number(),
});
// form zod validation schema
export const wellbeignSchema = z.object({
  nameEn: z.string().min(1, { message: "English Name Is Required" }),
  nameAm: z.string().min(1, { message: "Amharic Name Is Required" }),
  descriptionEn: z
    .string()
    .min(1, { message: "English Description Is Required" }),
  descriptionAm: z
    .string()
    .min(1, { message: "Amharic Description Is Required" }),
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
  latitude: z.string().min(1, { message: "Latitude is required" }),
  longitude: z.string().min(1, { message: "Longitude is required" }),
  telegram: z.string().optional(),
  facebook: z.string().optional(),
  whatsapp: z.string().optional(),
  website: z.string().optional(),
  services: z.array(
    z.object({
      serviceEnglish: z
        .string()
        .min(1, { message: "Service English is required" }),
      serviceAmharic: z
        .string()
        .min(1, { message: "Service Amharic is required" }),
    })
  ),
  openingHours: z.array(
    z.object({
      day: z.string().min(1, { message: "Day is required" }),
      from: z.string().min(1, { message: "From is required" }),
      to: z.string().min(1, { message: "To is required" }),
    })
  ),
  logo: fileSchema,
});
export const wellbeignYupSchema = yup.object().shape({
  nameEn: yup.string().min(1).required("English Name Is Required"),
  nameAm: yup.string().min(1).required("Amharic Name Is Required"),
  descriptionEn: yup
    .string()
    .min(1)
    .required("English Description Is Required"),
  descriptionAm: yup
    .string()
    .min(1)
    .required("Amharic Description Is Required"),
  phoneNumber: yup
    .string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  latitude: yup.string().min(1).required("Latitude is required"),
  longitude: yup.string().min(1).required("Longitude is required"),
  telegram: yup.string().optional(),
  facebook: yup.string().optional(),
  whatsapp: yup.string().optional(),
  website: yup.string().optional(),
  services: yup.array().of(
    yup.object().shape({
      serviceEnglish: yup
        .string()
        .min(1)
        .required("Service English is required"),
      serviceAmharic: yup
        .string()
        .min(1)
        .required("Service Amharic is required"),
    })
  ),
  openingHours: yup.array().of(
    yup.object().shape({
      day: yup.string().min(1).required("Day is required"),
      from: yup.string().min(1).required("From is required"),
      to: yup.string().min(1).required("To is required"),
    })
  ),
  logo: yup.mixed().required("Logo image is required"),
  center_cover: yup.mixed().required("Cover image is required"),
  city_id: yup.string().required("City is required"),
});
// generate form types from zod validation schema used for form
export type WellBeignSchemaValues = z.infer<typeof wellbeignSchema>;
