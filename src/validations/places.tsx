import * as Yup from "yup";

export const placesOwnerSchema = Yup.object().shape({
  first_name: Yup.string().required("English Name is required"),
  last_name: Yup.string().required("English Name is required"),
  username: Yup.string().required("English Name is required"),
  gender: Yup.string().required("Gender is required"),
  phone: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
  dob: Yup.date()
    .min(new Date(1900, 1, 1))
    .max(
      new Date(
        new Date().getFullYear() - 18,
        new Date().getMonth(),
        new Date().getDate()
      ),
      "Age should be 18 or above"
    )
    .required("Birth date is required")
    .test("age", "Age should be 18 or above", (value) => {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age >= 18;
    }),
  password: Yup.string().min(4).required("Password is required"),
});

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

export type PlacesOwnerType = {
  first_name: string;
  last_name: string;
  username: string;
  gender: string;
  dob: Date | undefined;
  phone: string;
  email: string;
  password: string;
};

export const storeSchema = Yup.object().shape({
  place_type_id: Yup.array()
    .min(1, "Place type is required")
    .required("please select at least one place type"),
  nameEnglish: Yup.string().required("English Name is required"),
  nameAmharic: Yup.string().required("English Name is required"),
  descriptionEnglish: Yup.string().required(
    "Description English Name is required"
  ),
  descriptionAmharic: Yup.string().required(
    "Description Amharic Name is required"
  ),
  phone: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
  place_logo: Yup.mixed().required("Store logo image is required."),
});

export type StoreType = {
  place_type_id: string[];
  nameEnglish: string;
  nameAmharic: string;
  descriptionEnglish: string;
  descriptionAmharic: string;
  website: string;
  phone: string;
  place_logo: string;
};

export const placesEditCoverSchema = Yup.object().shape({
  logo: Yup.mixed().required("Logo is required"),
});

export type editPlaceLogoType = {
  logo: string;
};

export type PlacesType = Yup.InferType<typeof placesSchema>;
export type StorePlaceType = Yup.InferType<typeof storeSchema>;
