"use client";

import { SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

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
import FormikTextArea from "@/components/ui/form/formik-textarea";
import { ReasonsSchemaValues, reasonsSchema } from "./reasons.schema";
import { Textarea } from "rizzui";
import { ErrorMessage, Formik } from "formik";

export default function AddReasonForm({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });
  const reasonData = useFetchData(
    [queryKeys.getAllReasons, id],
    `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}admin/report-reasons/${id}`,
    headers,
    !!id
  );
  const initialValues: ReasonsSchemaValues = {
    reason: id ? reasonData?.data?.data?.reason : "",
  };

  const onSubmit: SubmitHandler<ReasonsSchemaValues> = (data) => {
    createReason(data);
  };

  const createReason = async (values: ReasonsSchemaValues) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}admin/report-reasons/${id}`
          : `${process.env.NEXT_PUBLIC_AUTH_BACKEND_URL}admin/report-reasons`,
        method: "POST",
        headers,
        body: {
          ...values,
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllReasons],
          });
          toast.success(
            id
              ? "Report Reason Edited Successfully"
              : "Report Reason Created Successfully"
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
          {id ? "Edit Reason" : "Add Reason"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {reasonData.isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={tagsAndUnitSchema}
          onSubmit={createReason}
        >
          {() => (
            <Form className="flex flex-col items-start space-y-2">
              <FormikTextArea
                label="Tag English Name"
                placeholder="Enter Tag Name"
                color="primary"
                name="nameEn"
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
