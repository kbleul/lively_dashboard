import * as Yup from "yup";
export enum IProductVariantType {
    Value = "Value",
    Color = "Color",
  }
export const productValidationSchema = Yup.object().shape({
    title: Yup.string().required("product title is required"),
    titleAm: Yup.string().required("product amharic title is required"),
    description: Yup.string().required("product description is required"),
    descriptionAm: Yup.string().required(
      "product amharic description is required"
    ),
    unit: Yup.string().required("product unit is required"),
    category: Yup.string().required("product  Category is required"),
    subCategory: Yup.string().required("product sub Category is required"),
    brand: Yup.string().required("product brand is required"),
    tags: Yup.array()
      .min(1, "please select at least one tag")
      .required("please select at leas one tag"),
    variant_type: Yup.string().required("variant type is required"),
    product_variants: Yup.array().of(
      Yup.object().shape({
        valueEnglish: Yup.string().when("variant_type", {
          is: (type: string) => type === IProductVariantType.Value,
          then: (schema) => schema.required("value english  is required"),
        }),
        valueAmharic: Yup.string().when("variant_type", {
          is: (type: string) => type === IProductVariantType.Value,
          then: (schema) => schema.required("value amharic  is required"),
        }),
        colorNameEnglish: Yup.string().when("variant_type", {
          is: (type: string) => type === IProductVariantType.Color,
          then: (schema) => schema.required("color name english  is required"),
        }),
        colorNameAmharic: Yup.string().when("variant_type", {
          is: (type: string) => type === IProductVariantType.Color,
          then: (schema) => schema.required("color name amharic  is required"),
        }),
        colorHash: Yup.string().when("variant_type", {
          is: (type: string) => type === IProductVariantType.Color,
          then: (schema) => schema.required("color hash code  is required"),
        }),
        product_image: Yup.mixed().required("product  image is required."),
        additionalInfo: Yup.array().of(
          Yup.object().shape({
            key: Yup.string().required("additional info key is required"),
            value: Yup.string().required("additional info value is required"),
          })
        ),
      })
    ),
  });
export type ProductType = Yup.InferType<typeof productValidationSchema>;