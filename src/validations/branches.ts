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
  has_delivery: Yup.number().required("Delivery status is required"),
  telegram: Yup.string().optional(),
  facebook: Yup.string().optional(),
  whatsapp: Yup.string().optional(),
  website: Yup.string().optional(),
  instagram: Yup.string().optional(),
  latitude: Yup.string().required("location is required"),
  longitude: Yup.string().required("location is required"), //latitude and longitude
  services: Yup.array()
    .of(Yup.mixed())
    .min(1, "At leaset one cover image is required"),
  general_discount: Yup.number()
    .required("Discount percentage is required")
    .min(0, "Discount percentage must be greater than or equal to 0")
    .max(100, "Discount percentage must be less than or equal to 100"),
});

export type branchInfoType = {
  nameEnglish: string;
  nameAmharic: string;
  descriptionEnglish: string;
  descriptionAmharic: string;
  phone: string;
  has_delivery: number;
  telegram?: string;
  facebook?: string;
  whatsapp?: string;
  website?: string;
  instagram?: string;
  latitude: string;
  longitude: string;
  branch_cover: File[] | [];
  specific_address: string | null;
  general_discount: number;
};

export const branchInfoEditSchema = Yup.object().shape({
  nameEnglish: Yup.string().required("English Name is required"),
  nameAmharic: Yup.string().required("Amharic Name is required"),
  descriptionEnglish: Yup.string().required("English Description is required"),
  descriptionAmharic: Yup.string().required("Amharic Description is required"),
  phone: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
  general_discount: Yup.number()
    .required("Discount percentage is required")
    .min(0, "Discount percentage must be greater than or equal to 0")
    .max(100, "Discount percentage must be less than or equal to 100"),
  has_delivery: Yup.number().required("Inperson is required"),
  telegram: Yup.string().optional(),
  facebook: Yup.string().optional(),
  whatsapp: Yup.string().optional(),
  website: Yup.string().optional(),
  instagram: Yup.string().optional(),
  latitude: Yup.string().required("location is required"),
  longitude: Yup.string().required("location is required"), //latitude and longitude
  branch_cover: Yup.mixed(),
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

export type branchInfoEditType = {
  nameEnglish: string;
  nameAmharic: string;
  descriptionEnglish: string;
  descriptionAmharic: string;
  phone: string;
  general_discount: number;
  has_delivery: number;
  telegram?: string;
  facebook?: string;
  whatsapp?: string;
  website?: string;
  instagram?: string;
  latitude: string;
  longitude: string;
  branch_cover: File[] | string[];
  specific_address: string | null;
  services: string[];
  amenities: string[];
  openingHours: {
    isActive: boolean;
    day: string;
    from: string;
    to: string;
  }[];
};

export interface NewValues {
  amenities: string[];
  descriptionAmharic: string;
  descriptionEnglish: string;
  facebook: string | undefined;
  instagram: string | undefined;
  latitude: string;
  longitude: string;
  nameAmharic: string;
  nameEnglish: string;
  services: string[];
  telegram: string | undefined;
  whatsapp: string | undefined;
  phone: string;
  general_discount: number;
  has_delivery: number;
  specific_address: string;
  website?: string;
  branch_cover?: string[] | File[];
}

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

export const banchManagerSchema_store = Yup.object().shape({
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
  branch: Yup.string().required("Branch is required"),
});

export type BranchManagerType_store = BranchManagerType & {
  branch: string;
};
