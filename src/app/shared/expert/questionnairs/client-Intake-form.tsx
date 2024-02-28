"use client";
import { useGetHeaders } from "@/hooks/use-get-headers";
import React from "react";

import { useFetchData } from "@/react-query/useFetchData";
import { FieldArray, Form, Formik } from "formik";
import { Button, Title } from "rizzui";
import FormikInput from "@/components/ui/form/input";
import Spinner from "@/components/ui/spinner";
import { AddVariantype } from "@/validations/product";
import useDynamicMutation from "@/react-query/usePostData";

const ClientIntake = () => {
  const postMutation = useDynamicMutation();

  const headers = useGetHeaders({ type: "Json" });

  const clientIntakeData = useFetchData(
    [],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/client-expert-intake`,
    headers
  );

  // const initalValues: AddVariantype = {
  //   variant_type: type,
  //   product_variants: [],
  // };

  // const addProductVariantHandeler = async (values: AddVariantype) => {
  //   try {
  //     await postMutation.mutateAsync({
  //       url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/product-variants`,
  //       method: "POST",
  //       headers,
  //       body: {
  //         product_id: id,
  //         product_variants: values.product_variants
  //           ?.map((variant) => clean(variant))
  //           .map((variant) => ({
  //             ...variant,
  //             additional_information: variant.additionalInfo,
  //           })),
  //       },
  //       onSuccess: (res) => {
  //         toast.success("Variant Created Successfully");
  //         queryClient.invalidateQueries({
  //           queryKey: [queryKeys.getSingleProduct],
  //         });
  //       },
  //       onError: (err) => {
  //         toast.error(err?.response?.data?.data);
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  if (
    clientIntakeData?.isFetching ||
    clientIntakeData?.isLoading ||
    clientIntakeData.isPending
  ) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const initalValues: AddVariantype = {
    variant_type: "value",
    product_variants: [],
  };

  return (
    <article className="border col-span-2">
      <Formik
        initialValues={initalValues}
        onSubmit={() => {}}
        validationSchema={"addVariantValidationSchema"}
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
                    {clientIntakeData.data.data.map((question: any) => (
                      <p key={question.id}>
                        {question?.question_text?.english}
                      </p>
                    ))}

                    {values.product_variants?.map((_: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col space-y-2 items-start w-full p-4 shadow-md border-t mt-4"
                      >
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
    </article>
  );
};

export default ClientIntake;
