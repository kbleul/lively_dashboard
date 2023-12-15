"use client";
import React from "react";
import { Controller, SubmitHandler } from "react-hook-form";
import FormFooter, { negMargin } from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import {
  registerExpertInfoSchema,
  RegisterExpertInfoValues,
} from "@/utils/validations/register-expert.schema";
import moment from "moment";
import { Password } from "@/components/ui/password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileInput } from "@/components/ui/file-input";
import { Form } from "@/components/ui/form";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import FormGroup, { FormBlockWrapper } from "@/components/form-group";
import { genderOptions } from "@/constants/form-constants";
import { DatePicker } from "@/components/ui/datepicker";
import Upload from "@/components/ui/upload";
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
  const intialValues: RegisterExpertInfoValues = {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    gender: "",
    birthDate: new Date(),
    phoneNumber: "",
    password: "",
    profile: null,
  };
  const onSubmit: SubmitHandler<RegisterExpertInfoValues> = (data) => {
    console.log(data);
    expertInfoSubmitHandler(data);
  };
  const expertInfoSubmitHandler = async (values: RegisterExpertInfoValues) => {
    try {
      await postMutation.mutateAsync({
        url: `https://lively-auth.unravelplc.com/api/operation-manager/register-expert`,
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
          profile_image: values.profile[0],
        },
        onSuccess: (res) => {
          console.log("res,", res);
          setUserId(res.data.id);
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
    <Form<RegisterExpertInfoValues>
      validationSchema={registerExpertInfoSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: "onChange",
        defaultValues: intialValues,
      }}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      {({ register, control, watch, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
              <FormBlockWrapper
                title={"Expert Info."}
                description={"Edit your Expert information from here"}
                className="pt-7 @2xl:pt-9 @3xl:pt-11"
              >
                <Input
                  label="First Name"
                  placeholder="Enter First Name"
                  color="info"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
                <Input
                  label="Last Name"
                  placeholder="Enter Last Name"
                  color="info"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                />
                <Input
                  label="UserName"
                  placeholder="Enter UserName"
                  color="info"
                  className="[&>label>span]:font-medium col-span-2"
                  inputClassName="text-sm"
                  {...register("userName")}
                  error={errors.userName?.message}
                />
                <Controller
                  name="gender"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={genderOptions}
                      value={value}
                      onChange={onChange}
                      label="Gender"
                      error={errors?.gender?.message as string}
                      getOptionValue={(option) => option.name}
                    />
                  )}
                />
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      inputProps={{ label: "Birth Date" }}
                      placeholderText="Select Date"
                      selected={value}
                      onChange={onChange}
                      showYearDropdown
                    />
                  )}
                />

                <Input
                  type="number"
                  label="Phone Number"
                  prefix="+251"
                  placeholder="9** *** ***"
                  color="info"
                  className="[&>label>span]:font-medium col-span-2"
                  inputClassName="text-sm"
                  {...register("phoneNumber")}
                  error={errors.phoneNumber?.message}
                />

                <Input
                  type="text"
                  label="Email"
                  placeholder="Enter Email"
                  color="info"
                  className="[&>label>span]:font-medium col-span-2"
                  inputClassName="text-sm"
                  {...register("email")}
                  error={errors.email?.message}
                />
                <Password
                  label="Password"
                  placeholder="Enter your password"
                  className="[&>label>span]:font-medium col-span-2"
                  inputClassName="text-sm"
                  color="info"
                  {...register("password")}
                  error={errors.password?.message}
                />
                <FileInput
                  label="Profile"
                  placeholder="Select Your Profile"
                  color="info"
                  className="[&>label>span]:font-medium col-span-2"
                  inputClassName="text-sm"
                  {...register("profile")}
                  error={errors.profile?.message as string}
                />
                {/* <Controller
                  name="profile"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Upload
                      accept="img"
                      onChange={(e) => console.log(e.target.files[0])}
                    />
                  )}
                /> */}
              </FormBlockWrapper>
            </div>
          </div>

          <FormFooter
            isLoading={postMutation.isPending}
            submitBtnText={"Save & Continue"}
          />
        </>
      )}
    </Form>
  );
};

export default ExpertInfoForm;