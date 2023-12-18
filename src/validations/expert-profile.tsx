import * as Yup from "yup";

export const expertBasicProfileInfo = Yup.object().shape({
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
  profile: Yup.mixed(),
});
type ExpertProfileInfo = {
  firstName: string;
  lastName: string;
  userName: string;
  gender: string;
  birthDate: Date | undefined;
  phoneNumber: string;
  email: string;
  profile: File | undefined; // Replace 'any' with the appropriate type for 'profile'
};

export const billingInfoSchema = Yup.object().shape({
  perSession: Yup.string().min(1).required("Price Per Session is required"),
  bank_name: Yup.string().required("Bank Name is required"),
  bank_Number: Yup.string().required("Bank Number is required"),
});

type BillingInfoType = Yup.InferType<typeof billingInfoSchema>;

export const otherInfoSchema = Yup.object().shape({
  occupation: Yup.string().min(1).required("Occupation is required"),
  specialties: Yup.array().min(1).required("Specialties is required"),
});

type OtherInfoType = Yup.InferType<typeof otherInfoSchema>;


export type { ExpertProfileInfo,OtherInfoType,BillingInfoType };
