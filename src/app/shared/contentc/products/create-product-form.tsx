"use client";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import useDynamicMutation from "@/react-query/usePostData";
import {
  IProductVariantType,
  ProductType,
  productValidationSchema,
} from "@/validations/product";
import { useQueryClient } from "@tanstack/react-query";
import { Title, Text } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SelectLoader from "@/components/loader/select-loader";
import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import FormikInput from "@/components/ui/form/input";
import Spinner from "@/components/ui/spinner";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import CustomSelect from "@/components/ui/form/select";
import AvaterPicker from "@/components/ui/form/avater-upload";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const CreateProductForm = () => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });

  const tagsData = useFetchData(
    [queryKeys.getAllTags],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/tags`,
    headers
  );
  const unitData = useFetchData(
    [queryKeys.getAllUnits],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/units`,
    headers
  );
  const brandsData = useFetchData(
    [queryKeys.getAllBrands],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/brands`,
    headers
  );
  const initialValues: ProductType = {
    title: "",
    titleAm: "",
    description: "",
    descriptionAm: "",
    unit: "",
    brand: "",
    category: "",
    subCategory: "",
    tags: [],
    variant_type: "",
    product_variants: [
      {
        valueEnglish: "",
        valueAmharic: "",
        colorNameEnglish: "",
        colorNameAmharic: "",
        colorHash: "",
        product_image: "",
        additionalInfo: [],
      },
    ],
  };
  const variantTypeOptions = [
    { name: "Value", value: "Value" },
    { name: "Color", value: "Color" },
  ];
  return (
    <div>
      {unitData.isSuccess && tagsData.isSuccess && brandsData.isSuccess ? (
        <Formik
          initialValues={initialValues}
          validationSchema={productValidationSchema}
          onSubmit={(v) => console.log(v)}
        >
          {({
            values,
            errors,
            setFieldValue,
            touched,
            handleChange,
            handleBlur,
            setFieldTouched,
          }) => {
            return (
              <Form className="flex flex-col items-start space-y-4">
                <Title as="h4">Add New product</Title>
                {/*  */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3 w-full">
                  <div className="md:col-span-3 w-full h-auto flex flex-col items-start space-y-3">
                    <div className="bg-white p-3  rounded-md w-full flex flex-col items-start space-y-3">
                      <FormikInput
                        name="title"
                        label="Product Title English"
                        color="primary"
                      />
                      <FormikInput
                        name="titleAm"
                        label="Product  Title Amharic"
                        color="primary"
                      />
                    </div>
                    {/* product description */}
                    <div className="bg-white p-3  rounded-md w-full flex flex-col items-start space-y-3">
                      {/* description */}
                      <FormikTextArea
                        name="description"
                        label="Product Description"
                        color="primary"
                      />
                      <FormikTextArea
                        name="descriptionAm"
                        label="Product Amharic Description"
                        color="primary"
                      />
                    </div>
                  </div>
                  {/*  */}
                  <div className="md:col-span-2 w-full flex flex-col items-start space-y-2">
                    <div className="bg-white p-3  rounded-md flex flex-col items-start space-y-4 w-full">
                      <CustomSelect
                        name="unit"
                        label="product unit"
                        options={unitData?.data?.data}
                        getOptionLabel={(category: any) =>
                          category?.name?.english
                        }
                        getOptionValue={(category: any) => category?.id}
                        onChange={(selectedOption: any) => {
                          handleChange("unit")(selectedOption.id);
                        }}
                        placeholder="select product unit"
                        noOptionsMessage={() => "unit appears here"}
                      />
                      {/* product brand */}
                      <CustomSelect
                        isSearchable={true}
                        name="brand"
                        label="product brand"
                        options={brandsData?.data?.data}
                        getOptionLabel={(brand: any) => brand?.name?.english}
                        getOptionValue={(brand: any) => brand?.id}
                        onChange={(selectedOption: any) => {
                          handleChange("brand")(selectedOption.id);
                        }}
                        placeholder="select product brand"
                        noOptionsMessage={() => "brand appears here"}
                      />
                    </div>
                  </div>
                </div>
                {/* tags */}
                <div className="bg-white w-full p-2 flex flex-col items-start space-y-2">
                  <CustomSelect
                    name="tags"
                    label="tags"
                    isMulti={true}
                    options={tagsData?.data?.data}
                    placeholder="select tags"
                    getOptionLabel={(tag: any) => tag?.name?.english}
                    getOptionValue={(tag: any) => tag?.id}
                    onChange={(selectedOptions: any) => {
                      const selectedIds = selectedOptions.map(
                        (option: any) => option.id
                      );
                      setFieldValue("tags", selectedIds);
                    }}
                    noOptionsMessage={() => "tags appears here"}
                  />
                  <Field name="gender">
                    {() => (
                      <Select
                        options={variantTypeOptions}
                        value={values.variant_type}
                        onChange={(value) =>
                          setFieldValue("variant_type", value)
                        }
                        label="Product Variant Type"
                        error={errors?.variant_type}
                        getOptionValue={(option) => option.name}
                        color="primary"
                      />
                    )}
                  </Field>
                </div>

                {/* variant */}
                <div className=" w-full">
                  <FieldArray name="product_variants">
                    {(data: any) => (
                      <div className="bg-white p-3  rounded-md w-full flex flex-col items-start space-y-5">
                        <Text as="p">Product Variants</Text>
                        {values.product_variants?.map((info, index) => (
                          <div
                            key={index}
                            className="flex flex-col space-y-2 items-start w-full"
                          >
                            {values.variant_type ===
                              IProductVariantType.Value && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full">
                                <FormikInput
                                  name={`product_variants.${index}.valueEnglish`}
                                  label="English Value"
                                  color="primary"
                                />
                                <FormikInput
                                  name={`product_variants.${index}.valueAmharic`}
                                  label="Amharic Value"
                                  color="primary"
                                />
                              </div>
                            )}
                            {/* if type color */}
                            {values.variant_type ===
                              IProductVariantType.Color && (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start w-full">
                                <FormikInput
                                  name={`product_variants.${index}.colorNameEnglish`}
                                  label="English Color"
                                  color="primary"
                                />
                                <FormikInput
                                  name={`product_variants.${index}.colorNameAmharic`}
                                  label="Amharic Color"
                                  color="primary"
                                />
                                <FormikInput
                                  name={`product_variants.${index}.colorHash`}
                                  label="Color Hash Code"
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
                                    ]?.additionalInfo.map((info, i) => (
                                      <div
                                        key={i}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full"
                                      >
                                        <FormikInput
                                          name={`product_variants.${index}.additionalInfo.${i}.key`}
                                          label="Name"
                                          color="primary"
                                        />
                                        {/* value */}
                                        <div className="flex flex-col items-end justify-end space-y-1">
                                          <FormikInput
                                            name={`product_variants.${index}.additionalInfo.${i}.value`}
                                            label="Value"
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
                                        onClick={() =>
                                          push({ key: "", value: "" })
                                        }
                                        variant="outline"
                                        color="primary"
                                      >
                                        Add More Info
                                      </Button>
                                      {values?.product_variants?.length > 1 &&
                                        index > 0 && (
                                          <Button
                                            type="button"
                                            onClick={() => data.remove(index)}
                                            variant="outline"
                                            color="danger"
                                          >
                                            Remove Variant
                                          </Button>
                                        )}
                                    </div>
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                          </div>
                        ))}
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
                          Add Variant
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="flex items-end justify-end self-end">
                  <Button
                    // isLoading={createProductMutation.isLoading}
                    type="submit"
                    color="primary"
                  >
                    create
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      ) : (
        <div className="flex items-center justify-center p-4">
          <Spinner size="xl" />
        </div>
      )}
    </div>
  );
};

export default CreateProductForm;
