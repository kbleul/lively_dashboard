import * as Yup from "yup";
export const languageSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const paymentMethodSchema = Yup.object().shape({
  bankNameEn: Yup.string().required("Bank name english is required"),
  bankNameAm: Yup.string().required("Bank name amharic is required"),
  accountNameEn: Yup.string().required("Account name english is required"),
  accountNameAm: Yup.string().required("Account name amharic is required"),
  discriptionNameEn: Yup.string().required("Discription  english is required"),
  discriptionNameAm: Yup.string().required("Discription  amharic is required"),
  accountNumber: Yup.string().required("Account number is required"),
  image: Yup.mixed().required("Image is required"),
});

export const editMethodSchema = Yup.object().shape({
  bankNameEn: Yup.string().required("Bank name english is required"),
  bankNameAm: Yup.string().required("Bank name amharic is required"),
  accountNameEn: Yup.string().required("Account name english is required"),
  accountNameAm: Yup.string().required("Account name amharic is required"),
  discriptionNameEn: Yup.string().required("Discription  english is required"),
  discriptionNameAm: Yup.string().required("Discription  amharic is required"),
  accountNumber: Yup.string().required("Account number is required"),
  image: Yup.mixed().optional(),
});
export type LanguageType = Yup.InferType<typeof languageSchema>;
export type PaymentMethodType = Yup.InferType<typeof paymentMethodSchema>;
