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
import Loading from "../tags/Loading";

export default function AddUnitForm({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });

  const unitData = useFetchData(
    [queryKeys.getSingleUnit, id],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/units/${id}`,
    headers,
    !!id
  );

  if (unitData.isFetching) {
    return <Loading id={id} />;
  }

  const initialValues: TagsAndUnitType = {
    nameEn: id ? unitData?.data?.data?.name?.english : "",
    nameAm: id ? unitData?.data?.data?.name?.amharic : "",
  };
  const createTag = async (values: TagsAndUnitType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/units/${id}`
          : `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/units`,
        method: "POST",
        headers,
        body: {
          nameEnglish: values.nameEn,
          nameAmharic: values.nameAm,
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllUnits],
          });
          toast.success(
            id ? "Unit Edited Successfully" : "Unit Created Successfully"
          );

          id && queryClient.setQueryData([queryKeys.getSingleUnit, id], null);

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
          {id ? "Edit Unit" : "Add Unit"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {unitData.isLoading ? (
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
                label="Unit English Name"
                placeholder="Enter Unit Name"
                color="primary"
                name="nameEn"
              />
              <FormikInput
                label="Unit Amharic Name"
                placeholder="Enter Unit Name"
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
