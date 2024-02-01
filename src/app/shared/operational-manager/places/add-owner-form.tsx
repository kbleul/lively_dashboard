"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { PlacesOwnerType, placesOwnerSchema } from "@/validations/places";
import React from "react";
import FormFooter from "@/components/form-footer";
import FormGroup from "@/components/form-group";
import FormikInput from "@/components/ui/form/input";
import { genderOptions } from "@/constants/form-constants";
import cn from "@/utils/class-names";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import { DatePicker } from "@/components/ui/datepicker";
import FormikPasswordInput from "@/components/ui/form/password-input";
import useDynamicMutation from "@/react-query/usePostData";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { toast } from "sonner";
import moment from "moment";

const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const AddOwnerInfo = ({
  className,
  setFormStep,
  setOwnerId,
}: {
  className?: string;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  setOwnerId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });

  const initialValues: PlacesOwnerType = {
    first_name: "",
    last_name: "",
    username: "",
    gender: "",
    phone: "",
    dob: undefined,
    email: "",
    password: "",
  };

  const createOwnerSubmitHandler = async (values: PlacesOwnerType) => {
    const formatedDate = moment(values.dob).format("YYYY-MM-DD");
    const newValues = {
      ...values,
      dob: formatedDate,
      phone: "251".concat(values.phone),
      confirm_password: values.password,
    };
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}operation-manager/create-place-owner`,
        method: "POST",
        headers,
        body: {
          ...newValues,
        },
        onSuccess: (res) => {
          toast.success("Information Saved Successfully");

          if (res && res.data && res.data.id) {
            setOwnerId(res.data.id);
            setFormStep(2);
          }
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
    <div className="@container">
      <Formik
        initialValues={initialValues}
        validationSchema={placesOwnerSchema}
        onSubmit={(values: PlacesOwnerType) => createOwnerSubmitHandler(values)}
      >
        {({ errors, values, setFieldValue }) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                <FormGroup
                  title="Owner Info."
                  description="Edit your Owner information from here"
                  className={cn(className)}
                >
                  <FormikInput
                    name="first_name"
                    label="First Name"
                    placeholder="Enter First Name"
                    color="primary"
                  />
                  <FormikInput
                    name="last_name"
                    label="Last Name"
                    placeholder="Enter Last Name"
                    color="primary"
                  />
                  <FormikInput
                    name="username"
                    label="Username"
                    placeholder="Enter username"
                    color="primary"
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

                  <Field name="dob">
                    {() => (
                      <div>
                        <DatePicker
                          inputProps={{ label: "Birth Date" }}
                          placeholderText="Select Date"
                          selected={values.dob}
                          onChange={(date) => setFieldValue("dob", date)}
                          showYearDropdown
                        />
                        <ErrorMessage
                          name={"dob"}
                          component="div"
                          className={
                            "text-xs capitalize text-red-500 pt-1 font-medium"
                          }
                        />
                      </div>
                    )}
                  </Field>

                  <FormikInput
                    type="number"
                    label="Phone Number"
                    placeholder="Enter phoneNumber"
                    color="primary"
                    prefix="+251"
                    name="phone"
                    className="col-span-2"
                  />
                  <FormikInput
                    label="email"
                    placeholder="Enter Email"
                    color="primary"
                    name="email"
                    className="col-span-2"
                  />

                  <FormikPasswordInput
                    label="Password"
                    placeholder="Enter Password"
                    color="primary"
                    name="password"
                    className="col-span-2"
                  />
                </FormGroup>
              </div>
              <FormFooter
                submitBtnText={"Save & Continue"}
                showSveBtn={false}
                isLoading={postMutation.isPending}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddOwnerInfo;
