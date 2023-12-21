import * as Yup from "yup";

export const registerExpertInfoSchema = Yup.object().shape({
  firstName: Yup.string().min(1).required("First name is required"),
  lastName: Yup.string().min(1).required("Last name is required"),
  userName: Yup.string().min(1).required("User name is required"),
  gender: Yup.string().min(1).required("Gender is required"),
  birthDate: Yup.date()
    .min(new Date(1900, 1, 1))
    .required("birth date is required"),
  phoneNumber: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().min(4).required("Password is required"),
  profile: Yup.mixed(),
});
type RegisterExpertInfoType = {
  firstName: string;
  lastName: string;
  userName: string;
  gender: string;
  birthDate: Date | undefined;
  phoneNumber: string;
  email: string;
  password: string;
  profile: File | undefined; // Replace 'any' with the appropriate type for 'profile'
};

export const finishRegisterExpert = Yup.object({
  occupation: Yup.string().min(1).required("Occupation is required"),
  city_id: Yup.string().min(1).required("City is required"),
  education: Yup.array().of(
    Yup.object({
      titleEnglish: Yup.string().min(1).required("Title (English) is required"),
      titleAmharic: Yup.string().min(1).required("Title (Amharic) is required"),
    })
  ),
  experiences: Yup.array().of(
    Yup.object({
      titleEnglish: Yup.string().min(1).required("Title (English) is required"),
      titleAmharic: Yup.string().min(1).required("Title (Amharic) is required"),
      companyNameEnglish: Yup.string()
        .min(1)
        .required("Company Name (English) Is Required"),
      companyNameAmharic: Yup.string()
        .min(1)
        .required("Company Name (Amharic) Is Required"),
    })
  ),
  specialties: Yup.array().of(
    Yup.string().min(1).required("Specialty is required")
  ),
  expert_license: Yup.mixed().required("Expert License is required"),
  educational_document: Yup.mixed().required(
    "Educational Document is required"
  ),
  inperson: Yup.boolean().required("Inperson is required"),
  priceInPerson: Yup.string().when("inperson", {
    is: true,
    then: (schema) => schema.required("Price is required"),
  }),
  online: Yup.boolean().required("Inperson is required"),
  isOneSelected: Yup.boolean().required("Inperson is required"),
  priceInOnline: Yup.string().when("online", {
    is: true,
    then: (schema) => schema.required("Price is required"),
  }),
  openingHours: Yup.array().of(
    Yup.object().shape({
      day: Yup.string().min(1).required("Day is required"),
      from: Yup.string().min(1).required("From is required"),
      to: Yup.string().min(1).required("To is required"),
    })
  ),
});

type Education = {
  titleEnglish: string;
  titleAmharic: string;
  // descriptionEn: string;
  // descriptionAm: string;
};

type Experience = {
  titleEnglish: string;
  titleAmharic: string;
  companyNameEnglish: string;
  companyNameAmharic: string;
};

type FinishRegisterExpert = {
  occupation: string;
  city_id: string;
  education: Education[];
  experiences: Experience[];
  specialties: string[];
  expert_license: any;
  educational_document: any;
  inperson: boolean;
  priceInPerson: string;
  online: boolean;
  isOneSelected: boolean;
  priceInOnline: string;
  openingHours: {
    isActive: boolean;
    day: string;
    from: string;
    to: string;
  }[];
};

// edit
export const editExpertInfoSchema = Yup.object({
  city_id: Yup.string().min(1).required("City is required"),
  education: Yup.array()
    .of(
      Yup.object({
        titleEnglish: Yup.string()
          .min(1)
          .required("Title (English) is required"),
        titleAmharic: Yup.string()
          .min(1)
          .required("Title (Amharic) is required"),
      })
    )
    .min(1)
    .required("Education is required"),
  experiences: Yup.array()
    .of(
      Yup.object({
        titleEnglish: Yup.string()
          .min(1)
          .required("Title (English) is required"),
        titleAmharic: Yup.string()
          .min(1)
          .required("Title (Amharic) is required"),
        companyNameEnglish: Yup.string()
          .min(1)
          .required("Company Name (English) Is Required"),
        companyNameAmharic: Yup.string()
          .min(1)
          .required("Company Name (Amharic) Is Required"),
      })
    )
    .min(1)
    .required("Experience is required"),
  specialties: Yup.array().of(
    Yup.string().min(1).required("Specialty is required")
  ),
  inperson: Yup.boolean().required("Inperson is required"),
  priceInPerson: Yup.string().when("inperson", {
    is: true,
    then: (schema) => schema.required("Price is required"),
  }),
  online: Yup.boolean().required("Inperson is required"),
  isOneSelected: Yup.boolean().required("Inperson is required"),
  priceInOnline: Yup.string().when("online", {
    is: true,
    then: (schema) => schema.required("Price is required"),
  }),
});

type EditExpertInfoType = Yup.InferType<typeof editExpertInfoSchema>;
export type {
  FinishRegisterExpert,
  RegisterExpertInfoType,
  EditExpertInfoType,
};
