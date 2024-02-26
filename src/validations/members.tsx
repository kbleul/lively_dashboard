import * as Yup from "yup";

export type CreateMemberType = {
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  dob: Date | undefined;
  phone: string;
  email: string;
  packages: string[];
};

export type SearchMemberType = {
  phone: string;
};

export const searchMemberSchema = Yup.object().shape({
  phone: Yup.string()
    .min(1)
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits long"),
});

export type AddPackagesType = {
  packages: string[];
};

export const addPackagesSchema = Yup.object().shape({
  packages: Yup.array().of(Yup.string()).required("Packages are required"),
});

export const memberSchema = Yup.object().shape({
  first_name: Yup.string().required("English Name is required"),
  last_name: Yup.string().required("English Name is required"),
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
  packages: Yup.array().of(Yup.string()).required("Packages are required"),
});
