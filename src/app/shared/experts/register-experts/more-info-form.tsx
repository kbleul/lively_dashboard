"use client";
import React from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import FormFooter, { negMargin } from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import {
  finishRegisterExpert,
  FinishRegisterExpertInfoValues,
} from "@/utils/validations/register-expert.schema";
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
import { genderOptions } from "@/constants/form-constants";
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
  const headers = useGetHeaders({ type: "FormData" });
  const Yupschema = Yup.object().shape({
    occupation: Yup.string().required("Occupation is required"),
    city_id: Yup.string().required("City is required"),
    education: Yup.array().of(
      Yup.object().shape({
        titleEnglish: Yup.string().min(1).required("title English is required"),
        titleAmharic: Yup.string().min(1).required("title Amharic is required"),
      })
    ),
    specialties: Yup.array().required("please select at leas one tag"),
    experiences: Yup.array().of(
      Yup.object().shape({
        companyNameEnglish: Yup.string().required(
          "company name English is required"
        ),
        companyNameAmharic: Yup.string().required(
          "company name amharic is required"
        ),
        titleEnglish: Yup.string().required("title English is required"),
        titleAmharic: Yup.string().required("title Amharic is required"),
      })
    ),
    expert_license: Yup.mixed().required("Expert License is required"),
    educational_document: Yup.mixed().required(
      "Educational Document is required"
    ),
    per_session_price: Yup.string().required("Per Session Price is required"),
  });
  const initialValues = {
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
  };
  const occupationData = useFetchData(
    [queryKeys.getAllOccupations],
    `https://lively-wellbeing.unravelplc.com/api/operation-manager/occupations`,
    headers
  );
  const cityData = useFetchData(
    [queryKeys.getAllCities],
    `https://lively-wellbeing.unravelplc.com/api/operation-manager/cities`,
    headers
  );

  const specialityData = useFetchData(
    [queryKeys.getAllSpecilities],
    `https://lively-wellbeing.unravelplc.com/api/operation-manager/specialties`,
    headers
  );
  const expertInfoSubmitHandler = async (values: any) => {
    try {
      await postMutation.mutateAsync({
        url: `https://lively-wellbeing.unravelplc.com/api/operation-manager/finish-expert-registration`,
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
          // _method: "PATCH",
        },
        onSuccess: () => {
          setActiveStep((prev) => prev + 1);
          toast.success("Information Saved Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-start space-y-5 w-full">
      <Title as="h5">Finish Expert Registration</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={Yupschema}
        onSubmit={expertInfoSubmitHandler}
      >
        {({ values, setFieldValue, errors }) => {
          console.log(errors);
          return (
            <Form className="flex flex-col items-start space-y-5 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
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
                />
              </div>
              <FieldArray name={`education`}>
                {({ push, remove }) => (
                  <div className="w-full flex flex-col items-start space-y-2 ">
                    <Text>education</Text>
                    {values.education.map((info, i) => (
                      <div
                        key={i}
                        className=" grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full"
                      >
                        <FormikInput
                          name={`education.${i}.titleEnglish`}
                          label="title English"
                        />

                        <div className="flex flex-col items-end justify-end ">
                          <FormikInput
                            name={`education.${i}.titleAmharic`}
                            label="title amharic"
                          />
                          <Button variant="outline" onClick={() => remove(i)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() =>
                        push({ serviceEnglish: "", titleAmharic: "" })
                      }
                    >
                      Add education
                    </Button>
                  </div>
                )}
              </FieldArray>
              {/* experiance */}
              <FieldArray name={`experiences`}>
                {({ push, remove }) => (
                  <div className="w-full flex flex-col items-start space-y-2 ">
                    <Text>experiences</Text>
                    {values.experiences.map((info, i) => (
                      <div
                        key={i}
                        className=" grid grid-cols-1 md:grid-cols-2 gap-3 items-start w-full"
                      >
                        <FormikInput
                          name={`experiences.${i}.titleEnglish`}
                          label="title English"
                        />
                        <FormikInput
                          name={`experiences.${i}.titleAmharic`}
                          label="title amharic"
                        />
                        <FormikInput
                          name={`experiences.${i}.companyNameEnglish`}
                          label="company name english"
                        />
                        <div className="flex flex-col items-end justify-end ">
                          <FormikInput
                            name={`experiences.${i}.companyNameAmharic`}
                            label="company name amharic"
                          />
                          <Button variant="outline" onClick={() => remove(i)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
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
              <FilePicker name="expert_license" label="expert_license" />
              <FilePicker
                name="educational_document"
                label="educational document"
              />

              <FormikInput name="per_session_price" label="per session price" />
              <Button
                isLoading={postMutation.isPending}
                type="submit"
                color="primary"
              >
                Create Center
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default MoreInfoForm;
