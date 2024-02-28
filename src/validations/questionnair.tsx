// import * as Yup from "yup";

// export const questionnairSchema = Yup.object().shape({

//   product_variants: Yup.array()
//     .of(
//       Yup.object().shape({
//         valueEnglish: Yup.string().when("variant_type", {
//           is: (type: string) => type === IProductVariantType.Value,
//           then: (schema) => schema.required("value english  is required"),
//         }),
//         valueAmharic: Yup.string().when("variant_type", {
//           is: (type: string) => type === IProductVariantType.Value,
//           then: (schema) => schema.required("value amharic  is required"),
//         }),
//         colorNameEnglish: Yup.string().when("variant_type", {
//           is: (type: string) => type === IProductVariantType.Color,
//           then: (schema) => schema.required("color name english  is required"),
//         }),
//         colorNameAmharic: Yup.string().when("variant_type", {
//           is: (type: string) => type === IProductVariantType.Color,
//           then: (schema) => schema.required("color name amharic  is required"),
//         }),
//         colorHash: Yup.string().when("variant_type", {
//           is: (type: string) => type === IProductVariantType.Color,
//           then: (schema) => schema.required("color hash code  is required"),
//         }),
//         product_image: Yup.mixed().required("product  image is required."),
//         additionalInfo: Yup.array().of(
//           Yup.object().shape({
//             key: Yup.string().required("additional info key is required"),
//             value: Yup.string().required("additional info value is required"),
//           })
//         ),
//       })
//     )
//     .min(1, "please add at least one product variant")
//     .required("please add at least one product variant"),
// });
