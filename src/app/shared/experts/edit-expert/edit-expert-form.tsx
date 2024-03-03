"use client";
import React, { useState } from "react";
import FormFooter from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import { Button } from "@/components/ui/button";
import { FaPerson } from "react-icons/fa6";

import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { FormBlockWrapper } from "@/components/form-group";

import { Text, Title } from "@/components/ui/text";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { AdvancedCheckbox } from "@/components/ui/advanced-checkbox";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import FormikInput from "@/components/ui/form/input";
import CustomSelect from "@/components/ui/form/select";
import { RiVidiconLine } from "react-icons/ri";
import { ActionIcon } from "@/components/ui/action-icon";
import { PiTrashBold } from "react-icons/pi";
import {
  editExpertInfoSchema,
  EditExpertInfoType,
} from "@/validations/create-expert.schema";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import PageLoader from "@/components/loader/page-loader";
import Spinner from "@/components/ui/spinner";

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
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/experts/${id}`,
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
  };

  const cityData = useFetchData(
    [queryKeys.getAllCities],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/cities`,
    headers
  );

  const specialityData = useFetchData(
    [queryKeys.getAllSpecilities],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/specialties`,
    headers
  );
  const expertInfoSubmitHandler = async (values: EditExpertInfoType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/experts/${id}`,
        method: "POST",
        headers,
        body: {
          user_id: expertData?.data?.data?.user_id,
          city_id: values.city_id,
          educations: values.education,
          specialties: values.specialties,
          experiences: values.experiences,

          _method: "PATCH",
        },
        onSuccess: () => {
          router.push(routes.counselor.experts.list);
          toast.success("Expert information Updated Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (cityData.isFetching || specialityData.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  return (
    <>
      {expertData.isFetched && expertData.isSuccess ? (
        <Formik
          initialValues={initialValues}
          validationSchema={editExpertInfoSchema}
          onSubmit={expertInfoSubmitHandler}
        >
          {({ values, setFieldValue, errors }) => {
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
