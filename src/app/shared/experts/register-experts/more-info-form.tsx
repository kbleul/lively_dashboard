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
import { Form } from "@/components/ui/form";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import FormGroup, { FormBlockWrapper } from "@/components/form-group";
import { genderOptions } from "@/constants/form-constants";
import { DatePicker } from "@/components/ui/datepicker";
import Upload from "@/components/ui/upload";
import {Text} from '@/components/ui/text'
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});
interface Props {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const MoreInfoForm = ({ setActiveStep }: Props) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });
  const intialValues: FinishRegisterExpertInfoValues = {
    occupation: "",
    city: "",
    education: [],
    specialties: [],
    experience: [],
    expert_license: null,
    educational_document: null,
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
  const onSubmit: SubmitHandler<FinishRegisterExpertInfoValues> = (data) => {
    console.log(data);
    expertInfoSubmitHandler(data);
  };
  const expertInfoSubmitHandler = async (values: FinishRegisterExpertInfoValues) => {
    try {
      await postMutation.mutateAsync({
        url: `https://lively-auth.unravelplc.com/api/operation-manager/finish-expert-registration`,
        method: "POST",
        headers,
        body: {
          occupation_id: values.occupation,
          city_id: values.city,
          educations: values.education,
          specialties: values.specialties,
          experiences: values.experience,
          expert_license: values.expert_license,
          educational_document: values.educational_document,
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
    <Form<FinishRegisterExpertInfoValues>
      validationSchema={finishRegisterExpert}
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
                  <Controller
                  name="occupation"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={occupationData?.data?.data?.map((item:any)=>({id:item.id,name:item.name.english}))}
                      value={value}
                      onChange={onChange}
                      label="Occupation"
                      error={errors?.occupation?.message as string}
                      // displayValue={(option:{name:{english:string}})=><Text>{JSON.stringify(option)}</Text>}
                      getOptionValue={(option) => option.id}
                    />
                  )}
                />
                 <Controller
                  name="occupation"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      options={occupationData?.data?.data?.map((item:any)=>({id:item.id,name:item.name.english}))}
                      value={value}
                      onChange={onChange}
                      label="Occupation"
                      error={errors?.occupation?.message as string}
                      // displayValue={(option:{name:{english:string}})=><Text>{JSON.stringify(option)}</Text>}
                      getOptionValue={(option) => option.id}
                    />
                  )}
                />
                {/* <Input
                  label="First Name"
                  placeholder="Enter First Name"
                  color="info"
                  className="[&>label>span]:font-medium"
                  inputClassName="text-sm"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                /> */}
          
            
                <FileInput
                  label="Educational Document"
                  placeholder="Select Your Educational Document"
                  color="info"
                  className="[&>label>span]:font-medium col-span-2"
                  inputClassName="text-sm"
                  {...register("educational_document")}
                  error={errors.educational_document?.message as string}
                />
               <FileInput
                  label="Licence Document"
                  placeholder="Select Your Licence Document"
                  color="info"
                  className="[&>label>span]:font-medium col-span-2"
                  inputClassName="text-sm"
                  {...register("expert_license")}
                  error={errors.expert_license?.message as string}
                />
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

export default MoreInfoForm;
