"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Title, Text } from "@/components/ui/text";
import Logo from "@public/logo.png";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import { useGetHeaders } from "@/hooks/use-get-headers";
import PageLoader from "@/components/loader/page-loader";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { routes } from "@/config/routes";
import { Formik, Form } from "formik";
import { LoginType, loginSchema } from "@/validations/auth.schema";
import FormikInput from "@/components/ui/form/input";
import FormikPasswordInput from "@/components/ui/form/password-input";

const assignRediresct = (role: any, params: string | null) => {
  let redirectUrl = "";

  switch (true) {
    case role.includes("Counselor"):
      redirectUrl = routes.counselor.dashboard;
      return redirectUrl;

    case role.includes("Expert"):
      redirectUrl = routes.expert.dashboard;
      return redirectUrl;
    case role.includes("Operation_Manager"):
      redirectUrl = routes.operationalManager.dashboard;
      if (params && params.includes("claimed-product")) {
        redirectUrl = routes.operationalManager.product["claimed-product"](
          params.split("/")[params.split("/").length - 1]
        );
      }
      return redirectUrl;
    case role.includes("Content_Creator"):
      redirectUrl = routes.contentCreator.dashboard;
      return redirectUrl;
    case role.includes("Store_Owner"):
      redirectUrl = routes.storeOwner.home;

      if (params && params.includes("claimed-product")) {
        redirectUrl = routes.storeOwner.product["claimed-product"](
          params.split("/")[params.split("/").length - 1]
        );
      } else {
        redirectUrl = routes.storeOwner.home;
      }

      return redirectUrl;
    case role.includes("Branch_Manager"):
      redirectUrl = routes.branchManger.dashboard;

      if (params && params.includes("claimed-product")) {
        redirectUrl = routes.branchManger.product["claimed-product"](
          params.split("/")[params.split("/").length - 1]
        );
      }
      return redirectUrl;

    case role.includes("Admin"):
      redirectUrl = routes.admin.dashboard;
      return redirectUrl;

    default:
      redirectUrl = "";
      return redirectUrl;
  }
};

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchURL = searchParams.get("callbackUrl");

  const { data: session, status } = useSession();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const initialValues: LoginType = {
    phone: "",
    password: "",
  };
  const initialLoginMutationSubmitHandler = async (values: LoginType) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}login`,
        method: "POST",
        headers,
        body: {
          phone: "251".concat(values.phone),
          password: values.password,
        },
        onSuccess: (responseData) => {
          const role = responseData?.data?.user?.roles?.map(
            (item: { name: string }) => item.name
          );

          const redirectUrl = assignRediresct(role, searchURL);

          if (
            !role.includes("Expert") &&
            !role.includes("Operation_Manager") &&
            !role.includes("Admin") &&
            !role.includes("Content_Creator") &&
            !role.includes("Store_Owner") &&
            !role.includes("Branch_Manager") &&
            !role.includes("Counselor")
          ) {
            toast.info("Account Not Found");
            return;
          }
          setIsLoading(true);

          signIn("credentials", {
            data: JSON.stringify(responseData?.data),
            redirect: true,
            callbackUrl:
              responseData?.data?.user.hasOwnProperty("need_create_password") &&
              responseData?.data?.user?.need_create_password
                ? routes.resetPassword
                : redirectUrl,
          });
          toast.success("Login Successfull, Redirecting...");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (status === "loading") return <PageLoader />;
  if (status === "authenticated") router.push("/");
  if (isLoading) return <PageLoader />;
  if (status === "unauthenticated")
    return (
      <div className="bg-gradient-to-r from-[#008579] to-[#00BA63] flex w-full items-center justify-center min-h-screen p-2">
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
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={initialLoginMutationSubmitHandler}
            >
              {() => (
                <Form className="space-y-5 w-full">
                  <FormikInput
                    type="number"
                    label="Phone Number"
                    prefix="+251"
                    name="phone"
                    placeholder="Enter Your Phone Number"
                    color="primary"
                  />
                  <FormikPasswordInput
                    name="password"
                    label="Password"
                    placeholder="Enter Your Password"
                    color="primary"
                  />
                  <div className="flex items-center justify-between">
                    <Checkbox
                      label="Remember me"
                      variant="flat"
                      color="primary"
                      className="font-medium"
                    />
                    <Link
                      href={routes.forgotPassword}
                      className="font-medium text-primary hover:text-primary-dark"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Button
                    className="w-full hover:bg-primary"
                    type="submit"
                    size="lg"
                    color="primary"
                    isLoading={postMutation.isPending}
                  >
                    <span>Sign in</span>{" "}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
}
