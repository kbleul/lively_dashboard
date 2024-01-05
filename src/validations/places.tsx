import * as Yup from "yup";
export const placesSchema = Yup.object().shape({
  owner: Yup.string().required("Owner is required"),
  placeType: Yup.string().required("Place type is required"),
  nameEn: Yup.string().required("English Name is required"),
  nameAm: Yup.string().required("English Name is required"),
  descriptionEn: Yup.string().required("English Description is required"),
  descriptionAm: Yup.string().required("English Description is required"),
  phone: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
  website: Yup.string(),
  logo: Yup.mixed().required("Logo is required"),
  cover: Yup.mixed().required("Cover is required"),
});


export type PlacesType = Yup.InferType<typeof placesSchema>;