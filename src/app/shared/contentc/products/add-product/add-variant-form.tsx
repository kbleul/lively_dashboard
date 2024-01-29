"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import FormikInput from "@/components/ui/form/input";
import { Text } from "@/components/ui/text";
import { Field, FieldArray, FormikValues, useFormikContext } from "formik";
import { IProductVariantType } from "@/validations/product";
import AvaterPicker from "@/components/ui/form/avater-upload";
import SelectLoader from "@/components/loader/select-loader";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const AddVariantForm = ({ className }: { className?: string }) => {
  const { values, setFieldValue, errors } = useFormikContext<FormikValues>();
  const variantTypeOptions = [
    { name: "Value", value: "Value" },
    { name: "Color", value: "Color" },
    { name: "Size", value: "Size" },
  ];

  return (
    <FormGroup
      title="Variants"
      description="Add product variants here"
      className={cn(className)}
    >
      <div className="col-span-2">
        <Field name="variant_type">
          {() => (
            <Select
              options={variantTypeOptions}
              value={values.variant_type}
              onChange={(value) => setFieldValue("variant_type", value)}
              label="Product Variant Type"
              error={errors?.variant_type as string}
              getOptionValue={(option) => option.name}
              color="primary"
            />
          )}
        </Field>
      </div>
      <FieldArray name="product_variants">
        {(data: any) => (
          <div className="bg-white p-3  rounded-md w-full flex flex-col items-start space-y-5 col-span-2">
            <Text as="p">Product Variants</Text>
            {values.product_variants?.map((_: any, index: number) => (
              <div
                key={index}
                className="flex flex-col space-y-2 items-start w-full"
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

                {values.variant_type === IProductVariantType.Size && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full">
                    <FormikInput
                      name={`product_variants.${index}.sizeEnglish`}
                      label="English Size"
                      placeholder="Enter English Size"
                      color="primary"
                    />
                    <FormikInput
                      name={`product_variants.${index}.sizeAmharic`}
                      label="Amharic Size"
                      placeholder="Enter Amharic Size"
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
                  <FieldArray name={`product_variants.${index}.additionalInfo`}>
                    {({ push, remove }: any) => (
                      <div className="w-full flex flex-col items-start ">
                        <Text as="p">Additional Info</Text>
                        {values?.product_variants[index]?.additionalInfo?.map(
                          (_: any, i: number) => (
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
    </FormGroup>
  );
};

export default AddVariantForm;
