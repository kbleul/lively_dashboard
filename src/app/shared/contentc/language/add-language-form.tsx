"use client";

import { SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/text";
import { PiXBold } from "react-icons/pi";
import { ActionIcon } from "@/components/ui/action-icon";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useModal } from "../../modal-views/use-modal";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import Spinner from "@/components/ui/spinner";
import { LanguageType, languageSchema } from "@/validations/language";
import { Form, Formik } from "formik";
import FormikInput from "@/components/ui/form/input";

export default function AddLanguageForm({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });

  const languageData = useFetchData(
    [queryKeys.getSingleCity, id],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/languages/${id}`,
    headers,
    !!id
  );
  console.log(languageData?.data?.data?.name);
  const initialValues: LanguageType = {
    name: id ? languageData?.data?.data?.name : "",
  };
  const createLanguageSchema = async (values: LanguageType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/languages/${id}`
          : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/languages`,
        method: "POST",
        headers,
        body: {
          name: values.name,
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllLanguages],
          });
          toast.success(
            id ? "Lnguage Edited Successfully" : "Lnguage Created Successfully"
          );
          closeModal();
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
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          {id ? "Edit Lnguage" : "Add Lnguage"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {languageData.isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={languageSchema}
          onSubmit={createLanguageSchema}
        >
          {() => (
            <Form className="flex flex-col items-start space-y-2">
              <FormikInput
                label="Language Name"
                placeholder="Enter Language Name"
                color="primary"
                name="name"
              />
              <Button
                color="primary"
                className="w-full"
                type="submit"
                isLoading={postMutation.isPending}
              >
                {!id ? "Create" : "Edit"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
