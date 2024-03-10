import * as Yup from "yup";

export const quotesSchema = Yup.object().shape({
  authorAmharic: Yup.string(),
  authorEnglish: Yup.string(),

  bodyAmharic: Yup.string()
    .required("Amharic body is required")
    .min(1, "Amharic Body is required"),
  bodyEnglish: Yup.string()
    .required("English body is required")
    .min(1, "English Body is required"),
});

// generate form types from zod validation schema used for form
export type quotesType = Yup.InferType<typeof quotesSchema>;
