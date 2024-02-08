import React from "react";
import {
  addVariantValidationSchema,
  AddVariantype,
  IProductVariantType,
} from "@/validations/product";
import { FieldArray, Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Text, Title } from "@/components/ui/text";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import { toast } from "sonner";
import { queryKeys } from "@/react-query/query-keys";
import FormikInput from "@/components/ui/form/input";
import AvaterPicker from "@/components/ui/form/avater-upload";
import { clean } from "@/utils/clean-object";
interface Props {
  id: string;
  type: string;
}
const AddVariantForm = ({ id, type }: Props) => {
  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();
  const headers = useGetHeaders({ type: "FormData" });
  const initalValues: AddVariantype = {
    variant_type: type,
    product_variants: [],
  };

  const addProductVariantHandeler = async (values: AddVariantype) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/product-variants`,
        method: "POST",
        headers,
        body: {
          product_id: id,
          product_variants: values.product_variants
            ?.map((variant) => clean(variant))
            .map((variant) => ({
              ...variant,
              additional_information: variant.additionalInfo,
            })),
        },
        onSuccess: (res) => {
          toast.success("Variant Created Successfully");
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getSingleProduct],
          });
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Formik
      initialValues={initalValues}
      onSubmit={addProductVariantHandeler}
      validationSchema={addVariantValidationSchema}
    >
      {({ values }) => (
        <Form className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 mt-4 ">
          <div className="md:col-span-4">
            <Title as="h6" />
          </div>
          <div className="md:col-span-8 w-full flex flex-col items-start space-y-1">
            <FieldArray name="product_variants">
              {(data: any) => (
                <div
                  className="bg-white p-3 mb-4 rounded-md w-full flex flex-col items-start space-y-5 col-span-2
               mt-4"
                >
                  {values.product_variants?.map((_: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col space-y-2 items-start w-full p-4 shadow-md border-t mt-4"
                    >
                      {values.variant_type === IProductVariantType.Value && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full">
                          <FormikInput
                            name={`product_variants.${index}.valueEnglish`}
                            label="English Value"
                            placeholder="Enter English Value"
                            color="primary"
                          />
                          <FormikInput
                            name={`product_variants.${index}.valueAmharic`}
                            label="Amharic Value"
                            placeholder="Enter Amharic Value"
                            color="primary"
                          />
                        </div>
                      )}
                      {/* if type color */}
                      {values.variant_type === IProductVariantType.Color && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start w-full">
                          <FormikInput
                            name={`product_variants.${index}.colorNameEnglish`}
                            label="English Color"
                            color="primary"
                          />
                          <FormikInput
                            name={`product_variants.${index}.colorNameAmharic`}
                            label="Amharic Color"
                            placeholder="Enter Amharic Color"
                            color="primary"
                          />
                          <FormikInput
                            name={`product_variants.${index}.colorHash`}
                            label="Color Hash Code"
                            placeholder="Enter Color Hash Code"
                            color="primary"
                          />
                        </div>
                      )}
                      <AvaterPicker
                        name={`product_variants.${index}.product_image`}
                        label="product Variant Image"
                      />
                      {/* additional info */}
                      <div className="bg-white   rounded-md w-full">
                        <FieldArray
                          name={`product_variants.${index}.additionalInfo`}
                        >
                          {({ push, remove }: any) => (
                            <div className="w-full flex flex-col items-start ">
                              <Text as="p">Additional Info</Text>
                              {values?.product_variants[
                                index
                              ]?.additionalInfo?.map((_: any, i: number) => (
                                <div
                                  key={i}
                                  className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full"
                                >
                                  <FormikInput
                                    name={`product_variants.${index}.additionalInfo.${i}.key`}
                                    label="Name"
                                    placeholder="Enter Name"
                                    color="primary"
                                  />
                                  {/* value */}
                                  <div className="flex flex-col items-end justify-end space-y-1">
                                    <FormikInput
                                      name={`product_variants.${index}.additionalInfo.${i}.value`}
                                      label="Value"
                                      placeholder="Enter Value"
                                      color="primary"
                                    />
                                    <Button
                                      variant="outline"
                                      color="danger"
                                      onClick={() => remove(i)}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <div className="flex items-center gap-2 py-2">
                                <Button
                                  type="button"
                                  onClick={() => push({ key: "", value: "" })}
                                  variant="outline"
                                  color="primary"
                                >
                                  Add More Info
                                </Button>

                                <Button
                                  type="button"
                                  onClick={() => data.remove(index)}
                                  variant="outline"
                                  color="danger"
                                >
                                  Remove Variant
                                </Button>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    </div>
                  ))}
                  {
                    <div className="flex items-end justify-end self-end">
                      <Button
                        onClick={() =>
                          data.push({
                            type: "",
                            valueEnglish: "",
                            valueAmharic: "",
                            colorNameEnglish: "",
                            colorNameAmharic: "",
                            hash: "",
                            product_image: undefined,
                            additionalInfo: [],
                          })
                        }
                      >
                        Add More Variant
                      </Button>
                    </div>
                  }
                </div>
              )}
            </FieldArray>
            <div className="flex items-end justify-end self-end">
              <Button
                isLoading={postMutation.isPending}
                type="submit"
                size="lg"
                color="primary"
              >
                Create Variant
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddVariantForm;
