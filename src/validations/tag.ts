import * as Yup from "yup";
export const tagsAndUnitSchema = Yup.object().shape({
  nameEn: Yup.string().required("English Name is required"),
  nameAm: Yup.string().required("English Name is required"),
});

export const brandSchema = Yup.object().shape({
  nameEn: Yup.string().required("English Name is required"),
  nameAm: Yup.string().required("English Name is required"),
  brand_image: Yup.mixed().required("Brand Image is required"),
});

export type TagsAndUnitType = Yup.InferType<typeof tagsAndUnitSchema>;
export type BrandType = Yup.InferType<typeof brandSchema>;
