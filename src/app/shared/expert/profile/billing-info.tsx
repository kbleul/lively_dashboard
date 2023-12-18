"use client";
import React from "react";
import FormFooter from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { FormBlockWrapper } from "@/components/form-group";
import { Formik, Form, Field } from "formik";
import FormikInput from "@/components/ui/form/input";

import {
  BillingInfoType,
  billingInfoSchema,
} from "@/validations/expert-profile";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
const Select = dynamic(() => import("@/components/ui/select"), {
  ssr: false,
  loading: () => <SelectLoader />,
});
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
interface Props {}

const BillingInfoForm = ({}: Props) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });
  const profileData = useFetchData(
    [queryKeys.getExpertProfile],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/profile`,
    headers
  );

  const initialValues: BillingInfoType = {
    perSession: profileData?.data?.data?.per_session,
    bank_name: "",
    bank_Number: "",
  };

  const banksOption = [
    { name: "Telebirr", value: "Telebirr" },
    { name: "CBE", value: "CBE" },
    { name: "Amole", value: "Amole" },
    { name: "HelloCash", value: "HelloCash" },
    { name: "BOA", value: "BOA" },
    { name: "Abyssinia", value: "Abyssinia" },
    { name: "Awash", value: "Awash" },
    { name: "Dashen", value: "Dashen" },
    { name: "Wegagen", value: "Wegagen" },
    { name: "Nib", value: "Nib" },
    { name: "CBE Birr", value: "CBE Birr" },
    { name: "Yene Birr", value: "Yene Birr" },
  ];

  const updateBillingIfo = async (values: BillingInfoType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/update-billing-info`,
        method: "POST",
        headers,
        body: {
          per_session: values.perSession,
          bank_name: values.bank_name,
          bank_account_number: values.bank_Number,
        },
        onSuccess: () => {
          toast.success("Billing Info Updated Successfully");
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
      validationSchema={billingInfoSchema}
      onSubmit={updateBillingIfo}
    >
      {({ values, errors, setFieldValue }) => (
        <Form className="flex flex-grow flex-col @container [&_label]:font-medium">
          <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
            <FormBlockWrapper
              title={"Billing Info"}
              description={"Update Your Billing Info"}
              className="py-7 @2xl:pt-9 "
            >
              <FormikInput
                type="number"
                label="Per Session"
                placeholder="Enter Your Per Session Price"
                color="primary"
                name="perSession"
                className="col-span-2"
              />
              <div className="col-span-2">
                <Field name="bank_name">
                  {() => (
                    <Select
                      options={banksOption}
                      value={values.bank_name}
                      onChange={(value) => setFieldValue("bank_name", value)}
                      label="Bank Name"
                      error={errors?.bank_name}
                      getOptionValue={(option) => option.name}
                      color="primary"
                    />
                  )}
                </Field>
              </div>
              <FormikInput
                type="number"
                label="Bank Account Number"
                placeholder="Enter Your Bank Account Number"
                color="primary"
                name="bank_Number"
                className="col-span-2"
              />
            </FormBlockWrapper>
          </div>

          <FormFooter
            isLoading={postMutation.isPending}
            submitBtnText={"Update Billing Info"}
            showSveBtn={false}
          />
        </Form>
      )}
    </Formik>
  );
};

export default BillingInfoForm;
