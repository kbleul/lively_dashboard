import * as Yup from "yup";
export enum IProductVariantType {
  Value = "Value",
  Color = "Color",
  Size = "Size",
}
export const productValidationSchema = Yup.object().shape({
  title: Yup.string().required("product title is required"),
  titleAm: Yup.string().required("product amharic title is required"),
  description: Yup.string().required("product description is required"),
  descriptionAm: Yup.string().required(
    "product amharic description is required"
  ),
  unit: Yup.string().required("product unit is required"),
  brand: Yup.string().required("product brand is required"),
  tags: Yup.array()
    .min(1, "please select at least one tag")
    .required("please select at leas one tag"),
  place_types: Yup.array()
    .min(1, "please select at least one place type")
    .required("please select at leas one place type"),
  variant_type: Yup.string().required("variant type is required"),
  product_variants: Yup.array()
    .of(
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
    )
    .min(1, "please add at least one product variant")
    .required("please add at least one product variant"),
});

export const editProductValidationSchema = Yup.object().shape({
  title: Yup.string().required("product title is required"),
  titleAm: Yup.string().required("product amharic title is required"),
  description: Yup.string().required("product description is required"),
  descriptionAm: Yup.string().required(
    "product amharic description is required"
  ),
  unit: Yup.string().required("product unit is required"),
  brand: Yup.string().required("product brand is required"),
  place_types: Yup.array()
    .min(1, "please select at least one place type")
    .required("please select at leas one place type"),
  tags: Yup.array()
    .min(1, "please select at least one tag")
    .required("please select at leas one tag"),
});

export const editVariantValidationSchema = Yup.object().shape({
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
  additional_information: Yup.array().of(
    Yup.object().shape({
      key: Yup.string().required("additional info key is required"),
      value: Yup.string().required("additional info value is required"),
    })
  ),
});

export const addVariantValidationSchema = Yup.object().shape({
  variant_type: Yup.string().required("variant type is required"),
  product_variants: Yup.array()
    .of(
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
    )
    .min(1, "please add at least one product variant")
    .required("please add at least one product variant"),
});
export const addBranchProductValidationSchema = Yup.object().shape({
  product_variant_id: Yup.string().required("Product is required"),
  price: Yup.string().required("Product Price is required"),
});

export const editBranchProductValidationSchema = Yup.object().shape({
  price: Yup.string().required("Product Price is required"),
});

export type ProductType = Yup.InferType<typeof productValidationSchema>;
export type EditProductType = Yup.InferType<typeof editProductValidationSchema>;
export type EditVariantype = Yup.InferType<typeof editVariantValidationSchema>;
export type AddVariantype = Yup.InferType<typeof addVariantValidationSchema>;
export type AddBranchProductype = Yup.InferType<
  typeof addBranchProductValidationSchema
>;
export type EditBranchProductype = Yup.InferType<
  typeof editBranchProductValidationSchema
>;
