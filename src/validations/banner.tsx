import * as Yup from "yup";

export const bannerSchema = Yup.object().shape({
  banner_image: Yup.mixed().required("Cover is required"),
});

export type BannerType = Yup.InferType<typeof bannerSchema>;
