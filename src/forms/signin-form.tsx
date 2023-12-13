"use client";

import { signIn } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";
import { Password } from "@/components/ui/password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { loginSchema, LoginSchema } from "@/utils/validations/auth.schema";
import Image from "next/image";
import { Title } from "@/components/ui/text";
import Logo from "@public/logo.png";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import { useGetHeaders } from "@/hooks/use-get-headers";
const initialValues: LoginSchema = {
  phoneNumber: "",
  password: "",
  rememberMe: true,
};

export default function SignInForm() {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    initialLoginMutationSubmitHandler(data);
  };
  const initialLoginMutationSubmitHandler = async (values: LoginSchema) => {
    try {
      await postMutation.mutateAsync({
        url: `login`,
        method: "POST",
        headers,
        body: {
          phone: "251".concat(values.phoneNumber),
          password: values.password,
        },
        onSuccess: (responseData) => {
          signIn("credentials", {
            data: JSON.stringify(responseData?.data),
            redirect: true,
          });
          toast.success("Login Successfull, Redirecting...");
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
    <div className="max-w-md  mx-auto w-full flex items-center justify-center min-h-screen">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex flex-col w-full items-center justify-center">
          <Image src={Logo} alt="logo" className="p-2.5 " />
          <Title
            as="h4"
            className="mb-5 text-center  leading-snug  md:!leading-normal lg:mb-7   2xl:pe-8 "
          >
            <>
              Welcome back! Please{" "}
              <span className="relative inline-block">Sign in to</span>{" "}
              continue.
            </>
          </Title>
        </div>
        <Form<LoginSchema>
          validationSchema={loginSchema}
          // resetValues={reset}
          onSubmit={onSubmit}
          useFormProps={{
            mode: "onChange",
            defaultValues: initialValues,
          }}
          className="w-full"
        >
          {({ register, formState: { errors } }) => (
            <div className="space-y-5 w-full">
              <Input
                type="number"
                size="lg"
                label="Phone Number"
                prefix="+251"
                placeholder="9** *** ***"
                color="info"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register("phoneNumber")}
                error={errors.phoneNumber?.message}
              />
              <Password
                label="Password"
                placeholder="Enter your password"
                size="lg"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                color="info"
                {...register("password")}
                error={errors.password?.message}
              />
              <Button
                className="w-full hover:bg-primary"
                type="submit"
                size="lg"
                color="primary"
                isLoading={postMutation.isPending}
              >
                <span>Sign in</span>{" "}
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
