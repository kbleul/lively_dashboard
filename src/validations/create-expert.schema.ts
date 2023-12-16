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
export type RegisterExpertInfoType = {
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
