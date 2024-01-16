"use client";
import React from "react";
import FormGroup from "@/components/form-group";
import cn from "@/utils/class-names";
import FormikInput from "@/components/ui/form/input";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import CustomSelect from "@/components/ui/form/select";
import { Field, FormikValues, useFormikContext } from "formik";
import SelectLoader from "@/components/loader/select-loader";
import dynamic from "next/dynamic";
import { genderOptions } from "@/constants/form-constants";
const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});

const PlaceOwnerDetailForm = ({ className }: { className?: string }) => {
  const { setFieldValue } = useFormikContext<FormikValues>();

  return (
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
      />
      <CustomSelect
        name="gender"
        label="gender"
        isMulti={true}
        options={["male", "female"]}
        placeholder="select gender"
        getOptionLabel={(gender: any) => "male"}
        getOptionValue={(gender: any) => "female"}
        onChange={(selectedOptions: any) => {
          setFieldValue("gender", selectedOptions);
        }}
        noOptionsMessage={() => "gender appears here"}
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
    </FormGroup>
  );
};

export default PlaceOwnerDetailForm;
