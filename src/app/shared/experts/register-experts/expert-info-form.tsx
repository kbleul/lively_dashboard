"use client";
import React from "react";
import FormFooter from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import moment from "moment";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { FormBlockWrapper } from "@/components/form-group";
import { genderOptions } from "@/constants/form-constants";
import { DatePicker } from "@/components/ui/datepicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  type RegisterExpertInfoType,
  registerExpertInfoSchema,
} from "@/validations/create-expert.schema";
import FormikInput from "@/components/ui/form/input";
import FormikPasswordInput from "@/components/ui/form/password-input";
import AvaterPicker from "@/components/ui/form/avater-upload";
const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});
interface Props {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

const ExpertInfoForm = ({ setActiveStep, setUserId }: Props) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });
  const initialValues: RegisterExpertInfoType = {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    gender: "",
    birthDate: undefined,
    phoneNumber: "",
    password: "",
    profile: undefined,
  };
  const expertInfoSubmitHandler = async (values: RegisterExpertInfoType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}operation-manager/register-expert`,
        method: "POST",
        headers,
        body: {
          first_name: values.firstName,
          last_name: values.lastName,
          username: values.userName,
          email: values.email,
          gender: values.gender,
          dob: moment(values.birthDate).format("YYYY-MM-DD"),
          phone: "251".concat(values.phoneNumber),
          password: values.password,
          confirm_password: values.password,
          profile_image: values.profile && values.profile,
        },
        onSuccess: (res) => {
          setUserId(res.data.id);
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
      validationSchema={registerExpertInfoSchema}
      onSubmit={expertInfoSubmitHandler}
    >
      {({ errors, setFieldValue, values }) => (
        <Form className="flex flex-grow flex-col @container [&_label]:font-medium">
          <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
            <FormBlockWrapper
              title={"Expert Info."}
              description={"Edit your Expert information from here"}
              className="py-7 @2xl:pt-9 @3xl:pt-11"
            >
              <FormikInput
                label="First Name"
                placeholder="Enter First Name"
                color="primary"
                name="firstName"
              />
              <FormikInput
                label="Last Name"
                placeholder="Enter Last Name"
                color="primary"
                name="lastName"
              />
              <FormikInput
                label="userName"
                placeholder="Enter userName"
                color="primary"
                name="userName"
              />
              <FormikInput
                label="email"
                placeholder="Enter Email"
                color="primary"
                name="email"
              />
              <FormikInput
                type="number"
                label="phone Number"
                placeholder="Enter phoneNumber"
                color="primary"
                prefix="+251"
                name="phoneNumber"
                className="col-span-2"
              />
              <Field name="gender">
                {() => (
                  <Select
                    options={genderOptions}
                    value={values.gender}
                    onChange={(value) => setFieldValue("gender", value)}
                    label="Gender"
                    error={errors?.gender}
                    getOptionValue={(option) => option.name}
                    color="primary"
                  />
                )}
              </Field>
              <Field name="birthDate">
                {() => (
                  <div>
                    <DatePicker
                      inputProps={{ label: "Birth Date" }}
                      placeholderText="Select Date"
                      selected={values.birthDate}
                      onChange={(date) => setFieldValue("birthDate", date)}
                      showYearDropdown
                    />
                    <ErrorMessage
                      name={"birthDate"}
                      component="div"
                      className={
                        "text-xs capitalize text-red-500 pt-1 font-medium"
                      }
                    />
                  </div>
                )}
              </Field>
              <FormikPasswordInput
                label="Password"
                placeholder="Enter Password"
                color="primary"
                name="password"
                className="col-span-2"
              />
              <AvaterPicker
                name="profile"
                label="Profile Image"
                className="col-span-2"
              />
              {/*  */}
            </FormBlockWrapper>
          </div>

          <FormFooter
            isLoading={postMutation.isPending}
            submitBtnText={"Save & Continue"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ExpertInfoForm;
