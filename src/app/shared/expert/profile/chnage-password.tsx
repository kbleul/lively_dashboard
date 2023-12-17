"use client";
import React from "react";
import FormFooter from "@/components/form-footer";
import useDynamicMutation from "@/react-query/usePostData";
import { toast } from "sonner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { FormBlockWrapper } from "@/components/form-group";
import { Formik, Form } from "formik";
import FormikPasswordInput from "@/components/ui/form/password-input";
import {
  ChnagePasswordType,
  chnagePasswordSchema,
} from "@/validations/common/password.schema";

interface Props {}

const ChangePasswordForm = ({}: Props) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "FormData" });
  const initialValues: ChnagePasswordType = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };
  const changePasswordHandler = async (values: ChnagePasswordType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}change-password`,
        method: "POST",
        headers,
        body: {
          current_password: values.oldPassword,
          new_password: values.password,
          confirm_new_password: values.confirmPassword,
        },
        onSuccess: () => {
          toast.success("Password Changed Successfully");
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
      validationSchema={chnagePasswordSchema}
      onSubmit={changePasswordHandler}
    >
      {() => (
        <Form className="flex flex-grow flex-col @container [&_label]:font-medium">
          <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12">
            <FormBlockWrapper
              title={"Chnage Password"}
              description={"Chnage Your Password Here"}
              className="py-7 @2xl:pt-9 "
            >
              <FormikPasswordInput
                label="Old Password"
                placeholder="Enter Your Old Password"
                color="primary"
                name="oldPassword"
                className="col-span-2"
              />
              <FormikPasswordInput
                label="New Password"
                placeholder="Enter Your New Password"
                color="primary"
                name="password"
                className="col-span-2"
              />
              <FormikPasswordInput
                label="Confirm New Password"
                placeholder="Enter Your New Password "
                color="primary"
                name="confirmPassword"
                className="col-span-2"
              />
            </FormBlockWrapper>
          </div>

          <FormFooter
            isLoading={postMutation.isPending}
            submitBtnText={"Update Password"}
            showSveBtn={false}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ChangePasswordForm;
