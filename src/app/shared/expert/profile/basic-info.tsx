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
import FormikInput from "@/components/ui/form/input";
import FormikPasswordInput from "@/components/ui/form/password-input";
import AvaterPicker from "@/components/ui/form/avater-upload";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import {
  ExpertProfileInfo,
  expertBasicProfileInfo,
} from "@/validations/expert-profile";
import { useQueryClient } from "@tanstack/react-query";
const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});
interface Props {}

const BasicInfoForm = ({}: Props) => {
  const postMutation = useDynamicMutation();
  const queryClient = useQueryClient();
  const headers = useGetHeaders({ type: "FormData" });
  const profileData = useFetchData(
    [queryKeys.getExpertProfile],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/profile`,
    headers
  );
  const initialValues: ExpertProfileInfo = {
    firstName: profileData?.data?.data?.user?.first_name,
    lastName: profileData?.data?.data?.user?.last_name,
    email: profileData?.data?.data?.user?.email,
    userName: profileData?.data?.data?.user?.username,
    gender: profileData?.data?.data?.user?.dob ?? "",
    birthDate: undefined,
    phoneNumber: profileData?.data?.data?.user?.phone.slice(3),
    profile: undefined,
  };
  const updateBasicProfileInfo = async (values: ExpertProfileInfo) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}expert/update-profile`,
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
        },
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getExpertProfile],
          });
          toast.success("Information Updated Successfully");
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
      validationSchema={expertBasicProfileInfo}
      onSubmit={updateBasicProfileInfo}
    >
      {({ errors, setFieldValue, values }) => (
        <Form className="flex flex-grow flex-col @container [&_label]:font-medium">
          <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
            {profileData.isFetched ? (
              <FormBlockWrapper
                title={"Basic Info."}
                description={"Edit your Basic information from here"}
                className="py-7 @2xl:pt-9 "
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
                  disabled
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
                      //   disabled
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
              </FormBlockWrapper>
            ) : (
              <div className="flex justify-center items-center h-96">
                Loader
              </div>
            )}
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

export default BasicInfoForm;
