"use client";
import React, { useState } from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import FormFooter, { negMargin } from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { Password } from "@/components/ui/password";
import { Button } from "@/components/ui/button";
import { FaPerson } from "react-icons/fa6";
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
import { AdvancedCheckbox } from "@/components/ui/advanced-checkbox";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import FormikInput from "@/components/ui/form/input";
import CustomSelect from "@/components/ui/form/select";
import { RiVidiconLine } from "react-icons/ri";
import { ActionIcon } from "@/components/ui/action-icon";
import { PiTrashBold } from "react-icons/pi";
import AvaterPicker from "@/components/ui/form/avater-upload";
import {
  type FinishRegisterExpert,
  finishRegisterExpert,
  editExpertInfoSchema,
  EditExpertInfoType,
} from "@/validations/create-expert.schema";
import { appendDefaultSecond } from "@/utils/append-second";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import PageLoader from "@/components/loader/page-loader";

interface Props {
  id: string;
}

const EditExpertForm = ({ id }: Props) => {
  const router = useRouter();
  const postMutation = useDynamicMutation();
  const [customDaysChecked, setCustomDaysChecked] = useState(
    Array(7).fill(true)
  );
  const headers = useGetHeaders({ type: "FormData" });

  //fetch the edited one
  const expertData = useFetchData(
    [queryKeys.getSingleExpertInfo, id],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/experts/${id}`,
    headers
  );

  const initialValues: EditExpertInfoType = {
    city_id: expertData?.data?.data?.city_id,
    education: expertData?.data?.data?.educations?.map(
      (item: { title: { english: string; amharic: string } }) => ({
        titleEnglish: item.title.english,
        titleAmharic: item.title.amharic,
      })
    ),

    specialties: expertData?.data?.data?.specialties
      ?.map((item: any) => item.specialty)
      .map((item: { id: string }) => item.id),
    experiences: expertData?.data?.data?.experiences?.map(
      (item: {
        title: { english: string; amharic: string };
        company_name: { english: string; amharic: string };
      }) => ({
        titleEnglish: item.title.english,
        titleAmharic: item.title.amharic,
        companyNameEnglish: item.company_name.english,
        companyNameAmharic: item.company_name.english,
      })
    ),

    online: expertData?.data?.data?.appointment_type?.phone?.active ?? false,
    priceInOnline:
      expertData?.data?.data?.appointment_type?.phone?.price ?? "0",
    inperson:
      expertData?.data?.data?.appointment_type?.in_person?.active ?? false,
    priceInPerson:
      expertData?.data?.data?.appointment_type?.in_person?.price ?? "0",
    isOneSelected:
      (expertData?.data?.data?.appointment_type?.phone?.active ||
        expertData?.data?.data?.appointment_type?.in_person?.active) ??
      false,
  };

  const cityData = useFetchData(
    [queryKeys.getAllCities],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/cities`,
    headers
  );

  const specialityData = useFetchData(
    [queryKeys.getAllSpecilities],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/specialties`,
    headers
  );
  const expertInfoSubmitHandler = async (values: EditExpertInfoType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/experts/${id}`,
        method: "POST",
        headers,
        body: {
          user_id: expertData?.data?.data?.user_id,
          city_id: values.city_id,
          educations: values.education,
          specialties: values.specialties,
          experiences: values.experiences,

          in_person_active: values.inperson,
          in_person_per_session: values.priceInPerson ?? 0,
          phone_active: values.online,
          phone_per_session: values.priceInOnline ?? 0,

          _method: "PATCH",
        },
        onSuccess: () => {
          router.push(routes.operationalManager.experts.list);
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
    <>
      {expertData.isFetched && expertData.isSuccess ? (
        <Formik
          initialValues={initialValues}
          validationSchema={editExpertInfoSchema}
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
                      defaultValue={expertData?.data?.data?.city}
                      label="Select City"
                      options={cityData?.data?.data}
                      onChange={(selectedOption) => {
                        setFieldValue("city_id", selectedOption.id);
                      }}
                      placeholder="select City"
                      getOptionValue={(furnished: any) => furnished?.id}
                      getOptionLabel={(furnished: any) =>
                        furnished?.name?.english
                      }
                      noOptionsMessage={() => "City here"}
                    />

                    <CustomSelect
                      isMulti
                      isSearchable
                      name="specialties"
                      label="Select specialties"
                      options={specialityData?.data?.data}
                      defaultValue={expertData?.data?.data?.specialties?.map(
                        (item: any) => item.specialty
                      )}
                      onChange={(selectedOptions) => {
                        const selectedIds = selectedOptions.map(
                          (option: any) => option.id
                        );
                        setFieldValue("specialties", selectedIds);
                      }}
                      placeholder="select specialties"
                      getOptionValue={(furnished: any) => furnished?.id}
                      getOptionLabel={(furnished: any) =>
                        furnished?.name?.english
                      }
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
                            {values?.education.map((info, i) => (
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
                            {values?.experiences.map((info, i) => (
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
                    {/* in person of price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 col-span-2">
                      <div className="col-span-2">
                        <p className="font-medium">Meeting In</p>
                      </div>
                      <div>
                        <AdvancedCheckbox
                          name="inperson"
                          color="primary"
                          onChange={(e) => {
                            setFieldValue("inperson", e.target.checked);
                            setFieldValue("isOneSelected", e.target.checked);
                          }}
                          className="w-full grid flex-grow gap-3 rounded-xl border border-gray-200 p-6 text-gray-600 hover:cursor-pointer hover:border-gray-700"
                          inputClassName="[&:checked:enabled~span]:ring-1 [&:checked:enabled~span]:ring-offset-0 [&:checked:enabled~span]:ring-gray-700 [&:checked:enabled~span]:border-gray-700"
                        >
                          <FaPerson />
                          <Text className="font-semibold">Inperson</Text>
                        </AdvancedCheckbox>
                        {values.inperson && (
                          <FormikInput
                            type="number"
                            name="priceInPerson"
                            label="Price In Person"
                            className="col-span-2"
                            color="primary"
                          />
                        )}
                      </div>
                      <div>
                        <AdvancedCheckbox
                          name="online"
                          color="primary"
                          onChange={(e) => {
                            setFieldValue("online", e.target.checked);
                            setFieldValue("isOneSelected", e.target.checked);
                          }}
                          className="w-full grid flex-grow gap-3 rounded-xl border border-gray-200 p-6 text-gray-600 hover:cursor-pointer hover:border-gray-700"
                          inputClassName="[&:checked:enabled~span]:ring-1 [&:checked:enabled~span]:ring-offset-0 [&:checked:enabled~span]:ring-gray-700 [&:checked:enabled~span]:border-gray-700"
                        >
                          <RiVidiconLine />
                          <Text className="font-semibold">Online</Text>
                        </AdvancedCheckbox>
                        {values.online && (
                          <FormikInput
                            type="number"
                            name="priceInOnline"
                            label="Price Online"
                            className="col-span-2"
                            color="primary"
                          />
                        )}
                      </div>
                      <div className="col-span-2">
                        {!values.isOneSelected && (
                          <p className="text-sm text-red-500 font-medium">
                            Pleason Select one of The Meting Type
                          </p>
                        )}
                      </div>
                    </div>
                  </FormBlockWrapper>
                </div>

                <FormFooter
                  showSveBtn={false}
                  isLoading={postMutation.isPending}
                  submitBtnText={"Update Info"}
                />
              </Form>
            );
          }}
        </Formik>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default EditExpertForm;
