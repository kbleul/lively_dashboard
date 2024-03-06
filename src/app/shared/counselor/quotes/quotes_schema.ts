import * as Yup from "yup";

export const quotesSchema = Yup.object().shape({
  author: Yup.string()
    .required("Author is required")
    .min(1, "Author is required"),
  body: Yup.string().required("Body is required").min(1, "Body is required"),
});

// generate form types from zod validation schema used for form
export type quotesType = Yup.InferType<typeof quotesSchema>;
