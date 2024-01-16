import * as Yup from "yup";

export const branchInfoSchema = Yup.object().shape({
  nameEnglish: Yup.string().required("English Name is required"),
  nameAmharic: Yup.string().required("Amharic Name is required"),
  descriptionEnglish: Yup.string().required("English Description is required"),
  descriptionAmharic: Yup.string().required("Amharic Description is required"),
  phone: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
  telegram: Yup.string().optional(),
  facebook: Yup.string().optional(),
  whatsapp: Yup.string().optional(),
  website: Yup.string().optional(),
  instagram: Yup.string().optional(),
  latitude: Yup.string().required("location is required"),
  longitude: Yup.string().required("location is required"), //latitude and longitude
  branch_cover: Yup.mixed().required("Cover is required"),
});

export type branchInfoType = {
  nameEnglish: string;
  nameAmharic: string;
  descriptionEnglish: string;
  descriptionAmharic: string;
  phone: string;
  telegram?: string;
  facebook?: string;
  whatsapp?: string;
  website?: string;
  instagram?: string;
  latitude: string;
  longitude: string;
  branch_cover: File | undefined;
  specific_address: string | null;
};

export const moreInfoSchema = Yup.object().shape({
  services: Yup.array()
    .of(Yup.string().required("Service is required"))
    .min(1, "At least one service is required"),
  amenities: Yup.array()
    .of(Yup.string().required("Amenity is required"))
    .min(1, "At least one amenitie is required"),
  openingHours: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().min(1).required("Day is required"),
      from: Yup.string().min(1).required("From is required"),
      to: Yup.string().min(1).required("To is required"),
    })
  ),
});

export type moreInfoType = {
  services: string[];
  amenities: string[];
  openingHours: {
    day: string;
    from: string;
    to: string;
  }[];
};

export const banchManagerSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username Name is required"),
  gender: Yup.string().required("Gender is required"),
  phone: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  dob: Yup.date().min(new Date(1900, 1, 1)).required("birth date is required"),
  password: Yup.string().min(4).required("Password is required"),
});

export type BranchManagerType = {
  first_name: string;
  last_name: string;
  username: string;
  gender: string;
  dob: Date | undefined;
  phone: string;
  email: string;
  password: string;
  profile_image: string;
};
