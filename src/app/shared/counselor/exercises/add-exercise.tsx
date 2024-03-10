"use client";
import React from "react";
import FormikInput from "@/components/ui/form/input";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";

import { Formik, Form } from "formik";

import {
  mindfulnessExerciseType,
  mindfulnessExerciseSchema,
  editMindfulnessExerciseSchema,
} from "@/validations/assessment";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useDynamicMutation from "@/react-query/usePostData";
import { useModal } from "../../modal-views/use-modal";
import { Button, Title } from "rizzui";
import { useFetchData } from "@/react-query/useFetchData";
import Loading from "../../contentc/products/tags/Loading";
import Image from "next/image";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import FilePicker from "@/components/ui/form/audio-upload";

const AddExerciseForm = ({
  categoryId,
  id,
  className,
}: {
  categoryId: string;
  id?: string;
  className?: string;
}) => {
  const headers = useGetHeaders({ type: "FormData" });
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();

  const exerciseData = useFetchData(
    [],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/show-mindfulnesses/${id}`,
    headers,
    !!id
  );

  if (exerciseData.isFetching) {
    return <Loading id={id} />;
  }

  const initialValues: mindfulnessExerciseType = {
    titleAmharic: id ? exerciseData.data.data.title.amharic : "",
    titleEnglish: id ? exerciseData.data.data.title.english : "",
    masterAmharic: id ? exerciseData.data.data.master.amharic : "",
    masterEnglish: id ? exerciseData.data.data.master.english : "",
    durationAmharic: id ? exerciseData.data.data.duration.amharic : "",
    durationEnglish: id ? exerciseData.data.data.duration.english : "",
    audioAmharic: "",
    audioEnglish: "",
  };

  const createCategorySubmitHandler = async (
    values: mindfulnessExerciseType
  ) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/update-mindfulnesses/${id}`
          : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/mindfulnesses`,
        method: "POST",
        headers,
        body: {
          ...values,
          category_id: categoryId,
          _method: id ? "PATCH" : "POST",
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllMindfulnessExercises + categoryId],
          });
          toast.success(
            id
              ? "Category updated Successfully"
              : "Category created Successfully"
          );
          closeModal();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatusSubmitHandler = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/active-inactive-mindfulness/${id}`,
        method: "POST",
        headers,
        body: {},
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllMindfulnessExercises + categoryId],
          });
          toast.success("Status Update Successfully");
          closeModal();
        },
        onError: (err: any) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="p-8">
      <Formik
        initialValues={initialValues}
        validationSchema={
          id ? editMindfulnessExerciseSchema : mindfulnessExerciseSchema
        }
        onSubmit={(values: mindfulnessExerciseType) =>
          createCategorySubmitHandler(values)
        }
      >
        {({}) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {id ? "Edit mindfulness exercise" : "Add mindfulness exercise"}
              </Title>

              {id && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="flex gap-3 justify-end border rounded-xl px-4 py-2"
                  >
                    <p>Toggle Status: </p>
                    {exerciseData.data.data.active ? (
                      <FaToggleOn
                        size={24}
                        onClick={() => updateStatusSubmitHandler(id)}
                        className="text-green-400"
                      />
                    ) : (
                      <FaToggleOff
                        size={24}
                        onClick={() => updateStatusSubmitHandler(id)}
                      />
                    )}
                  </button>
                </div>
              )}

              <FormikInput
                name="titleAmharic"
                label="Amharic Title"
                placeholder="Enter amharic title"
                color="primary"
                className="mb-4"
              />
              <FormikInput
                name="titleEnglish"
                label="English Title"
                placeholder="Enter english title"
                color="primary"
                className="mb-4"
              />

              <FormikInput
                name="masterAmharic"
                label="Narrator name in Amharic"
                placeholder="Enter narrators name in amharic"
                color="primary"
                className="mb-4"
              />
              <FormikInput
                name="masterEnglish"
                label="Narrator name in English"
                placeholder="Enter narrators name in english"
                color="primary"
                className="mb-4"
              />

              <FormikInput
                name="durationAmharic"
                label="Amharic Duration"
                placeholder="Enter amharic audio duration"
                color="primary"
                className="mb-4"
              />
              <FormikInput
                name="durationEnglish"
                label="English Duration"
                placeholder="Enter english audio duration"
                color="primary"
                className="mb-4"
              />

              <FilePicker name="audioAmharic" label="Upload Amharic Audio" />

              {id && exerciseData?.data?.data?.audio?.amharic?.url && (
                <div className="flex gap-4 mb-4">
                  <p className="mt-3 font-medium ">
                    Current amharic audio :
                    <span className="underline font-normal ml-2">
                      {
                        exerciseData.data.data.audio.amharic.url.split("/")[
                          exerciseData.data.data.audio.amharic.url.split("/")
                            .length - 1
                        ]
                      }
                    </span>
                  </p>
                </div>
              )}

              <FilePicker name="audioEnglish" label="Upload English Audio" />

              {id && exerciseData?.data?.data?.audio?.english?.url && (
                <div className="flex gap-4 mb-4">
                  <p className="mt-3 font-medium ">
                    Current english audio :
                    <span className="underline font-normal ml-2">
                      {
                        exerciseData.data.data.audio.english.url.split("/")[
                          exerciseData.data.data.audio.english.url.split("/")
                            .length - 1
                        ]
                      }
                    </span>
                  </p>
                </div>
              )}

              <div className="mt-4 col-span-2 flex items-end justify-end gap-4">
                <Button
                  color="primary"
                  className="px-5 text-black bg-white border-black hover:text-white hover:border-none"
                  type="button"
                  onClick={() => closeModal()}
                >
                  Cancle
                </Button>
                <Button
                  color="primary"
                  className="px-10 text-white bg-gradient-to-r from-[#008579] to-[#00BA63]"
                  type="submit"
                  isLoading={postMutation.isPending}
                >
                  {id ? "Update" : "Create"}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default AddExerciseForm;
