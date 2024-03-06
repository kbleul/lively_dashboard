import * as Yup from "yup";

export const reasonsSchema = Yup.object().shape({
  reason: Yup.string()
    .required("Reason is required")
    .min(5, "Reason is required"),
});

// generate form types from zod validation schema used for form
export type ReasonType = Yup.InferType<typeof reasonsSchema>;
