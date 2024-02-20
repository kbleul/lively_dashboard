import * as Yup from "yup";

export const createPlanSchema = Yup.object().shape({
  nameEnglish: Yup.string().required("Plan name is required"),
  nameAmharic: Yup.string().required("Plan name is required"),
  descriptionEnglish: Yup.string().required("Plan Description is required"),
  descriptionAmharic: Yup.string().required("Plan Description is required"),
  price: Yup.number()
    .required("Plan price is required")
    .min(0, "Plan price must be greater than or equal to 0"),
  iteration: Yup.number()
    .required("Plan iteration is required")
    .min(0, "Plan iteration must be greater than or equal to 0"),
});

export type CreatePlanType = {
  nameEnglish: string;
  nameAmharic: string;
  descriptionEnglish: string;
  descriptionAmharic: string;
  price: number;
  iteration: number;
};
