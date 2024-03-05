"use client";
import * as Yup from "yup";

import FormikInput from "@/components/ui/form/input";
import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";

import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ActionIcon, Button, Title } from "rizzui";
import { toast } from "sonner";
import { useModal } from "../../modal-views/use-modal";
import { PiXBold } from "react-icons/pi";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import Spinner from "@/components/ui/spinner";

type journalType = {
  titleEnglish: string;
  titleAmharic: string;
};

export const journalSchema = Yup.object().shape({
  titleEnglish: Yup.string().required("English title is required"),
  titleAmharic: Yup.string().required("Amharic title is required"),
});

const AddJournal = ({ id, isView }: { id?: string; isView: boolean }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { closeModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const postMutation = useDynamicMutation();

  const promptsData = useFetchData(
    [queryKeys.getAllJournalPrompts, id],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/journal-prompts/${id}`,
    headers,
    !!id
  );

  if (promptsData?.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }
  console.log(promptsData.data);
  const initialValues: journalType = {
    titleEnglish: id ? promptsData.data.data.title.english : "",
    titleAmharic: id ? promptsData.data.data.title.amharic : "",
  };

  const updatePromptHandeler = async (values: journalType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/journal-prompts/${id}`
          : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/journal-prompts`,
        method: "POST",
        headers,
        body: { ...values, _method: id && "PATCH" },
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllJournalPrompts],
          });
          closeModal();
          router.push(routes.counselor["journal-prompts"]);

          toast.success(
            id ? "Prompt updated successfully" : "Prompt added successfully"
          );
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
    <article className="p-8">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          {isView ? "Journal Prompt" : id ? "Edit Prompt" : "Add Prompt"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={journalSchema}
        onSubmit={(values: journalType) => {
          updatePromptHandeler(values);
        }}
      >
        {({}) => {
          return (
            <Form>
              <FormikTextArea
                name={`titleEnglish`}
                label="English prompt"
                placeholder="Write Your prompt here"
                color="primary"
                inputClassName="border-none"
              />
              <FormikTextArea
                name={`titleAmharic`}
                label="Amharic Prompt"
                placeholder="Write Your prompt here"
                color="primary"
                inputClassName="border-none"
              />

              {!isView && (
                <div className="flex items-end justify-end w-full mt-4">
                  <Button
                    isLoading={postMutation.isPending}
                    color="primary"
                    size="lg"
                    type="submit"
                  >
                    {id ? "Edit Prompt" : "Add Prompt"}
                  </Button>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default AddJournal;
