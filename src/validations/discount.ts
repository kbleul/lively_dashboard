import * as Yup from "yup";

export const createProductDiscountSchema = Yup.object().shape({
  place_branch_products: Yup.array()
    .of(Yup.string())
    .required("Products are required"),
  titleEnglish: Yup.string().required("Discount title is required"),
  descriptionEnglish: Yup.string().required("Package Description is required"),
  discount: Yup.number()
    .required("Discount percentage is required")
    .min(0, "Discount percentage must be greater than or equal to 0")
    .max(100, "Discount percentage must be less than or equal to 100"),
  promo_code: Yup.string().required("Promo code is required"),
  tickets: Yup.number()
    .required("Discount percentage is required")
    .min(1, "Discount percentage must be greater than or equal to 0"),
  banner: Yup.boolean().required("Banner must be true or false"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().required("Ending date is required"),
});

export type CreateProductDiscountType = {
  place_branch_products: string[];
  titleEnglish: string;
  descriptionEnglish: string;
  discount: number;
  promo_code: string;
  tickets: number;
  banner: boolean;
  start_date: undefined | Date;
  end_date: undefined | Date;
};

export const createPackageDiscountSchema = Yup.object().shape({
  place_branch_packages: Yup.array()
    .of(Yup.string())
    .required("Projects are required"),
  titleEnglish: Yup.string().required("Discount title is required"),
  descriptionEnglish: Yup.string().required("Package Description is required"),
  discount: Yup.number()
    .required("Discount percentage is required")
    .min(0, "Discount percentage must be greater than or equal to 0")
    .max(100, "Discount percentage must be less than or equal to 100"),
  promo_code: Yup.string().required("Promo code is required"),
  tickets: Yup.number()
    .required("Discount percentage is required")
    .min(1, "Discount percentage must be greater than or equal to 0"),
  banner: Yup.boolean().required("Banner must be true or false"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().required("Ending date is required"),
});

export type CreatePackagetDiscountType = {
  place_branch_packages: string[];
  titleEnglish: string;
  descriptionEnglish: string;
  discount: number;
  promo_code: string;
  tickets: number;
  banner: boolean;
  start_date: undefined | Date;
  end_date: undefined | Date;
};
