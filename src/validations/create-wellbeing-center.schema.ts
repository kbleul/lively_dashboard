import * as Yup from "yup";

export const wellbeignYupSchema = Yup.object().shape({
  nameEn: Yup.string().min(1).required("English Name Is Required"),
  nameAm: Yup.string().min(1).required("Amharic Name Is Required"),
  descriptionEn: Yup.string()
    .min(1)
    .required("English Description Is Required"),
  descriptionAm: Yup.string()
    .min(1)
    .required("Amharic Description Is Required"),
  phoneNumber: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),

  lat: Yup.string().required("location is required"),
  lng: Yup.string().required("location is required"), //latitude and longitude
  telegram: Yup.string().optional(),
  facebook: Yup.string().optional(),
  whatsapp: Yup.string().optional(),
  website: Yup.string().optional(),
  instagram: Yup.string().optional(),
  services: Yup.array().of(
    Yup.object().shape({
      serviceEnglish: Yup.string()
        .min(1)
        .required("Service English is required"),
      serviceAmharic: Yup.string()
        .min(1)
        .required("Service Amharic is required"),
    })
  ),
  openingHours: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().min(1).required("Day is required"),
      from: Yup.string().min(1).required("From is required"),
      to: Yup.string().min(1).required("To is required"),
    })
  ),
  logo: Yup.mixed().required("Logo image is required"),
  center_cover: Yup.mixed().required("Cover image is required"),
  city_id: Yup.string().required("City is required"),
});
// generate form types from zod validation schema used for form

interface CreateWellbeingType {
  nameEn: string;
  nameAm: string;
  descriptionEn: string;
  descriptionAm: string;
  phoneNumber: string;
  lat: string;
  lng: string;
  telegram?: string;
  facebook?: string;
  whatsapp?: string;
  website?: string;
  instagram?: string;
  services?: {
    serviceEnglish: string;
    serviceAmharic: string;
  }[];
  openingHours: {
    day: string;
    from: string;
    to: string;
  }[];
  logo: File | undefined;
  center_cover: File | undefined;
  city_id: string;
  
}

export type { CreateWellbeingType };
