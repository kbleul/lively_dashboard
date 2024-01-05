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
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import Spinner from "@/components/ui/spinner";
import { Form, Formik } from "formik";
import FormikInput from "@/components/ui/form/input";
import { useModal } from "@/app/shared/modal-views/use-modal";
import { TagsAndUnitType, tagsAndUnitSchema } from "@/validations/tag";

export default function AddTagForm({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const { closeModal } = useModal();

  const tagsData = useFetchData(
    [queryKeys.getSingelTag, id],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/tags/${id}`,
    headers,
    !!id
  );
  const initialValues: TagsAndUnitType = {
    nameEn: id ? tagsData?.data?.data?.name?.english : "",
    nameAm: id ? tagsData?.data?.data?.name?.amharic : "",
  };
  const createTag = async (values: TagsAndUnitType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/tags/${id}`
          : `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/tags`,
        method: "POST",
        headers,
        body: {
          nameEnglish: values.nameEn,
          nameAmharic: values.nameAm,
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllTags],
          });
          toast.success(
            id ? "Tag Edited Successfully" : "Tag Created Successfully"
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
          {id ? "Edit Tag" : "Add Tag"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {tagsData.isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={tagsAndUnitSchema}
          onSubmit={createTag}
        >
          {() => (
            <Form className="flex flex-col items-start space-y-2">
              <FormikInput
                label="Tag English Name"
                placeholder="Enter Tag Name"
                color="primary"
                name="nameEn"
              />
              <FormikInput
                label="Tag Amharic Name"
                placeholder="Enter Tag Name"
                color="primary"
                name="nameAm"
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
