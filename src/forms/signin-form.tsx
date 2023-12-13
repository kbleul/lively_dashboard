"use client";

import { signIn, useSession } from "next-auth/react";
import { SubmitHandler } from "react-hook-form";
import { Password } from "@/components/ui/password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { loginSchema, LoginSchema } from "@/utils/validations/auth.schema";
import Image from "next/image";
import { Title, Text } from "@/components/ui/text";
import Logo from "@public/logo.png";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import { useGetHeaders } from "@/hooks/use-get-headers";
import PageLoader from "@/components/loader/page-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
const initialValues: LoginSchema = {
  phoneNumber: "",
  password: "",
};

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
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
          setIsLoading(true);
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

  if (status === "loading") return <PageLoader />;
  if (status === "authenticated") router.push("/content-creator/city");
  if (isLoading) return <PageLoader />;
  if (status === "unauthenticated")
    return (
      <div className="bg-gradient-to-r from-[#008579] to-[#00BA63] flex w-full items-center justify-center min-h-screen">
        <div className="max-w-lg  mx-auto w-full bg-white  p-5 md:p-10 rounded-xl">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="flex flex-col w-full items-center justify-center">
              <Image
                src={Logo}
                alt="logo"
                className="h-[60px] object-contain"
              />
              <div className="flex flex-col items-center space-y-1 py-4">
                <Title as="h4" className=" text-center   ">
                  <>Welcome Back!</>
                </Title>
                <Text as="p" className="font-medium">
                  Log in to access your Dashboard
                </Text>
              </div>
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
      </div>
    );
}
