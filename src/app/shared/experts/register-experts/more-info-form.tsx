"use client";
import React, { useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import FormFooter, { negMargin } from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { Password } from "@/components/ui/password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileInput } from "@/components/ui/file-input";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import FormGroup, { FormBlockWrapper } from "@/components/form-group";
import { genderOptions, workCustomDays } from "@/constants/form-constants";
import { DatePicker } from "@/components/ui/datepicker";
import Upload from "@/components/ui/upload";
import { Text } from "@/components/ui/text";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import * as Yup from "yup";
import { Title } from "@/components/ui/text";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import FormikInput from "@/components/ui/form/input";
import CustomSelect from "@/components/ui/form/select";
import FilePicker from "@/components/ui/form/dropzone";
import { ActionIcon } from "@/components/ui/action-icon";
import { PiTrashBold } from "react-icons/pi";
import AvaterPicker from "@/components/ui/form/avater-upload";
import {
  type FinishRegisterExpert,
  finishRegisterExpert,
} from "@/validations/create-expert.schema";
const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});
interface Props {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  userId: string;
}

const MoreInfoForm = ({ setActiveStep, userId }: Props) => {
  const postMutation = useDynamicMutation();
  const [customDaysChecked, setCustomDaysChecked] = useState(
    Array(7).fill(true)
  );
  const headers = useGetHeaders({ type: "FormData" });
  const initialValues: FinishRegisterExpert = {
    occupation: "",
    city_id: "",
    education: [
      {
        titleEnglish: "",
        titleAmharic: "",
      },
    ],
    specialties: [],
    experiences: [
      {
        companyNameEnglish: "",
        companyNameAmharic: "",
        titleEnglish: "",
        titleAmharic: "",
      },
    ],
    expert_license: null,
    educational_document: null,
    per_session_price: "",
    openingHours: workCustomDays,
  };

  const cityData = useFetchData(
    [queryKeys.getAllCities],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/cities`,
    headers
  );
  const occupationData = useFetchData(
    [queryKeys.getAllOccupations],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/occupations`,
    headers
  );
  const specialityData = useFetchData(
    [queryKeys.getAllSpecilities],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/specialties`,
    headers
  );
  const expertInfoSubmitHandler = async (values: any) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/finish-expert-registration`,
        method: "POST",
        headers,
        body: {
          user_id: userId ?? localStorage?.getItem("userId"),
          occupation_id: values.occupation,
          city_id: values.city_id,
          educations: values.education,
          specialties: values.specialties,
          experiences: values.experiences,
          expert_license: values.expert_license,
          educational_document: values.educational_document,
          per_session: values.per_session_price,
          availabilities: values.openingHours.map((hours: any) => ({
            day_of_week: hours.day,
            opening_time: hours.from,
            closing_time: hours.to,
          })),
          // _method: "PATCH",
        },
        onSuccess: () => {
          setActiveStep((prev) => prev + 1);
          toast.success("Information Saved Successfully");
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
      initialValues={initialValues}
      validationSchema={finishRegisterExpert}
      onSubmit={expertInfoSubmitHandler}
    >
      {({ values, setFieldValue, errors }) => {
        console.log(errors);
        return (
          <Form className="flex flex-grow flex-col @container [&_label]:font-medium">
            <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
              <FormBlockWrapper
                title={"Expert Info."}
                description={"Edit your Expert information from here"}
                className="py-7 @2xl:pt-9 @3xl:pt-11"
              >
                <CustomSelect
                  isSearchable
                  name="city_id"
                  label="Select City"
                  options={cityData?.data?.data}
                  onChange={(selectedOption) => {
                    setFieldValue("city_id", selectedOption.id);
                  }}
                  placeholder="select City"
                  getOptionValue={(furnished: any) => furnished?.id}
                  getOptionLabel={(furnished: any) => furnished?.name?.english}
                  noOptionsMessage={() => "City here"}
                />
                <CustomSelect
                  isSearchable
                  name="occupation"
                  label="Select occupation"
                  options={occupationData?.data?.data}
                  onChange={(selectedOption) => {
                    setFieldValue("occupation", selectedOption.id);
                  }}
                  placeholder="select occupation"
                  getOptionValue={(furnished: any) => furnished?.id}
                  getOptionLabel={(furnished: any) => furnished?.name?.english}
                  noOptionsMessage={() => "occupation here"}
                />
                <CustomSelect
                  isMulti
                  isSearchable
                  name="specialties"
                  label="Select specialties"
                  options={specialityData?.data?.data}
                  onChange={(selectedOptions) => {
                    const selectedIds = selectedOptions.map(
                      (option: any) => option.id
                    );
                    setFieldValue("specialties", selectedIds);
                  }}
                  placeholder="select specialties"
                  getOptionValue={(furnished: any) => furnished?.id}
                  getOptionLabel={(furnished: any) => furnished?.name?.english}
                  noOptionsMessage={() => "specialties here"}
                  className="col-span-2"
                />
                <div className="col-span-2 w-full ">
                  <FieldArray name={`education`}>
                    {({ push, remove }) => (
                      <div className="w-full flex flex-col items-start space-y-2 ">
                        <Text
                          as="span"
                          className="font-medium block capitalize"
                        >
                          education
                        </Text>
                        {values.education.map((info, i) => (
                          <div
                            key={i}
                            className="border p-2 rounded-md grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full"
                          >
                            <div className="md:col-span-2">
                              <Text
                                as="span"
                                className="text-primary block capitalize"
                              >
                                Education {i + 1}
                              </Text>
                            </div>
                            <FormikInput
                              name={`education.${i}.titleEnglish`}
                              label="Education Title English"
                              placeholder="Enter Education Title English"
                              color="primary"
                            />

                            <FormikInput
                              name={`education.${i}.titleAmharic`}
                              label="Education Title Amharic"
                              placeholder="Enter Education Title Amharic"
                              color="primary"
                            />
                            <div className="md:col-span-2 w-full flex items-end justify-end">
                              <ActionIcon
                                onClick={() => remove(i)}
                                size="sm"
                                variant="flat"
                                color="danger"
                                className="ms-auto flex-shrink-0 p-0 dark:bg-red-dark/20 mt-1"
                              >
                                <PiTrashBold className="w-6" />
                              </ActionIcon>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          color="primary"
                          onClick={() =>
                            push({ serviceEnglish: "", titleAmharic: "" })
                          }
                        >
                          Add Education
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                {/* experiance */}
                <div className="col-span-2 w-full ">
                  <FieldArray name={`experiences`}>
                    {({ push, remove }) => (
                      <div className="w-full flex flex-col items-start space-y-2 ">
                        <Text
                          as="span"
                          className="font-medium block capitalize"
                        >
                          experiences
                        </Text>
                        {values.experiences.map((info, i) => (
                          <div
                            key={i}
                            className="border p-2 rounded-md grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full"
                          >
                            <div className="md:col-span-2">
                              <Text
                                as="span"
                                className="text-primary block capitalize"
                              >
                                Experiences {i + 1}
                              </Text>
                            </div>
                            <FormikInput
                              name={`experiences.${i}.titleEnglish`}
                              label="Experience Title English"
                              placeholder="Enter Experience Title English"
                              color="primary"
                            />
                            <FormikInput
                              name={`experiences.${i}.titleAmharic`}
                              label="Experience Title Amharic"
                              placeholder="Enter Experience Title Amharic"
                              color="primary"
                            />
                            <FormikInput
                              name={`experiences.${i}.companyNameEnglish`}
                              label="Company Name english"
                              placeholder="Enter Company Name english"
                              color="primary"
                            />
                            <FormikInput
                              name={`experiences.${i}.companyNameAmharic`}
                              label="Company Name Amharic"
                              placeholder="Enter Company Name Amharic"
                              color="primary"
                            />

                            <div className="md:col-span-2 w-full flex items-end justify-end">
                              <ActionIcon
                                onClick={() => remove(i)}
                                size="sm"
                                variant="flat"
                                color="danger"
                                className="ms-auto flex-shrink-0 p-0 dark:bg-red-dark/20 mt-1"
                              >
                                <PiTrashBold className="w-6" />
                              </ActionIcon>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          color="primary"
                          onClick={() =>
                            push({
                              companyNameEnglish: "",
                              companyNameAmharic: "",
                              titleEnglish: "",
                              titleAmharic: "",
                            })
                          }
                        >
                          Add experience
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <AvaterPicker
                  name="expert_license"
                  label="Expert Licence"
                  className="col-span-2"
                />
                <AvaterPicker
                  name="educational_document"
                  label="Educational Document"
                  className="col-span-2"
                />

                <FormikInput
                  type="number"
                  name="per_session_price"
                  label="Price Per Session"
                  className="col-span-2"
                  color="primary"
                />
                {/*  */}
                <div className="col-span-2">
                  <Text as="span" className="text-primary block capitalize">
                    Avalability Time
                  </Text>
                  {values.openingHours.map((_: any, index: number) => (
                    <div className="flex items-end  gap-2 w-full " key={index}>
                      <Checkbox
                        checked={customDaysChecked[index]}
                        variant="flat"
                        color="primary"
                        className="font-medium"
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setCustomDaysChecked((prevChecked) => {
                            const newChecked = [...prevChecked];
                            newChecked[index] = isChecked;
                            return newChecked;
                          });
                        }}
                      />

                      <FormikInput
                        name={`openingHours[${index}].day`}
                        label="Day"
                        disabled
                      />
                      <FormikInput
                        name={`openingHours[${index}].from`}
                        label="Opening Time"
                        disabled={!customDaysChecked[index]}
                        type="time"
                      />
                      <FormikInput
                        name={`openingHours[${index}].to`}
                        label="Closing Time"
                        type="time"
                        disabled={!customDaysChecked[index]}
                      />
                    </div>
                  ))}
                </div>
              </FormBlockWrapper>
            </div>

            <FormFooter
              isLoading={postMutation.isPending}
              submitBtnText={"Save & Continue"}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default MoreInfoForm;
