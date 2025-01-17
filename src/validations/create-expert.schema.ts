import * as Yup from "yup";

export const registerExpertInfoSchema = Yup.object().shape({
  firstName: Yup.string().min(1).required("First name is required"),
  lastName: Yup.string().min(1).required("Last name is required"),
  userName: Yup.string().min(1).required("User name is required"),
  gender: Yup.string().min(1).required("Gender is required"),
  birthDate: Yup.date()
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
});

type EditExpertInfoType = Yup.InferType<typeof editExpertInfoSchema>;
export type {
  FinishRegisterExpert,
  RegisterExpertInfoType,
  EditExpertInfoType,
};
