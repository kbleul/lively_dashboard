import AvaterPicker from "@/components/ui/form/avater-upload";
import FormikInput from "@/components/ui/form/input";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import useDynamicMutation from "@/react-query/usePostData";
import { Text, Title } from "@/components/ui/text";
import {
  EditVariantype,
  IProductVariantType,
  editVariantValidationSchema,
} from "@/validations/product";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import { toast } from "sonner";

export interface VariantData {
  id: string;
  product_id: string;
  value: {
    english: string;
    amharic: string;
  };
  color: {
    name: {
      english: string;
      amharic: string;
    };
    hash: string;
  } | null;
  size: null | string;
  additional_information:
    | null
    | {
        key: string;
        value: string;
      }[];
  status: number;
  created_at: string;
  updated_at: string;
  product_image: {
    url: string;
  };
}
interface Props {
  data: VariantData;
  id: string;
  type: string;
}
const EditVariantForm = ({ data, id, type }: Props) => {
  const queryClient = useQueryClient();
  const headers = useGetHeaders({ type: "FormData" });
  const initalValues: EditVariantype = {
    valueEnglish: data?.value?.english,
    valueAmharic: data?.value?.amharic,
    colorNameEnglish: data?.color?.name?.english,
    colorNameAmharic: data?.color?.name?.amharic,
    colorHash: data?.color?.hash,
    additional_information: data?.additional_information ?? [],
    product_image: data?.product_image,
  };
  const postMutation = useDynamicMutation();

  const editProductVariantHandeler = async (values: EditVariantype) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/product-variants/${data.id}`,
        method: "POST",
        headers,
        body: {
          valueEnglish: values.valueEnglish,
          valueAmharic: values.valueAmharic,
          colorNameEnglish: values.colorNameEnglish,
          colorNameAmharic: values.colorNameAmharic,
          colorHash: values.colorHash,
          additional_information: values.additional_information,
          product_image: values.product_image,
          _method: "PATCH",
        },
        onSuccess: (res) => {
          toast.success("Variant Edited Successfully");
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getingleProduct],
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

  const deleteProduct = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/product-variants/${id}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getingleProduct],
          });
          toast.success("Variant Deleted Successfully");
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
    <div className="w-full">
      <Formik
        validationSchema={editVariantValidationSchema}
        initialValues={initalValues}
        onSubmit={editProductVariantHandeler}
      >
        {({ values }) => (
          <Form className="w-full grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-4">
              <Title as="h6">Product Variant</Title>
            </div>
            <div className="md:col-span-8 w-full flex flex-col items-start space-y-1">
              {type === IProductVariantType.Value && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full">
                  <FormikInput
                    name={`valueEnglish`}
                    label="English Value"
                    placeholder="Enter English Value"
                    color="primary"
                  />
                  <FormikInput
                    name={`valueAmharic`}
                    label="Amharic Value"
                    placeholder="Enter Amharic Value"
                    color="primary"
                  />
                </div>
              )}
              {type === IProductVariantType.Color && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start w-full">
                  <FormikInput
                    name={`colorNameEnglish`}
                    label="English Color"
                    color="primary"
                  />
                  <FormikInput
                    name={`colorNameAmharic`}
                    label="Amharic Color"
                    placeholder="Enter Amharic Color"
                    color="primary"
                  />
                  <FormikInput
                    name={`colorHash`}
                    label="Color Hash Code"
                    placeholder="Enter Color Hash Code"
                    color="primary"
                  />
                </div>
              )}
              <AvaterPicker
                name={`product_image`}
                label="product Variant Image"
              />
              {/* additional info */}
              <div className="bg-white   rounded-md w-full">
                <FieldArray name={`additional_information`}>
                  {({ push, remove }: any) => (
                    <div className="w-full flex flex-col items-start ">
                      <Text as="p">Additional Info</Text>
                      {values?.additional_information?.map(
                        (_: any, i: number) => (
                          <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full"
                          >
                            <FormikInput
                              name={`additional_information.${i}.key`}
                              label="Name"
                              placeholder="Enter Name"
                              color="primary"
                            />
                            {/* value */}
                            <div className="flex flex-col items-end justify-end space-y-1">
                              <FormikInput
                                name={`additional_information.${i}.value`}
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
                        )
                      )}
                      <div className="flex items-center gap-2 py-2">
                        <Button
                          type="button"
                          onClick={() => push({ key: "", value: "" })}
                          variant="outline"
                          color="primary"
                        >
                          Add More Info
                        </Button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="flex items-center justify-between w-full gap-2 py-2">
                <Button
                  isLoading={postMutation.isPending}
                  type="submit"
                  color="primary"
                >
                  Update Variant
                </Button>
                <Button
                  isLoading={postMutation.isPending}
                  type="submit"
                  color="danger"
                  onClick={() => deleteProduct(data.id)}
                >
                  Delete Variant
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditVariantForm;
