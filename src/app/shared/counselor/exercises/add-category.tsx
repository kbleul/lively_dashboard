"use client";
import React from "react";
import FormikInput from "@/components/ui/form/input";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";

import { Formik, Form } from "formik";

import {
  mindfulnessCategoriesType,
  mindfulnessCategoriesSchema,
  editMindfulnessCategoriesSchema,
} from "@/validations/assessment";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import FilePicker from "@/components/ui/form/dropzone";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useDynamicMutation from "@/react-query/usePostData";
import { useModal } from "../../modal-views/use-modal";
import { Button, Title } from "rizzui";
import { useFetchData } from "@/react-query/useFetchData";
import Loading from "../../contentc/products/tags/Loading";
import Image from "next/image";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";

const AddCategoryForm = ({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) => {
  const headers = useGetHeaders({ type: "FormData" });
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();

  const categoryData = useFetchData(
    [queryKeys.getAllAssessmentCategory + id, id],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/categories/${id}`,
    headers,
    !!id
  );

  if (categoryData.isFetching) {
    return <Loading id={id} />;
  }

  const initialValues: mindfulnessCategoriesType = {
    nameEnglish: id ? categoryData.data.data.name.english : "",
    nameAmharic: id ? categoryData.data.data.name.amharic : "",
    descriptionEnglish: id ? categoryData.data.data.description.english : "",
    descriptionAmharic: id ? categoryData.data.data.description.amharic : "",
    image: "",
  };

  const createCategorySubmitHandler = async (
    values: mindfulnessCategoriesType
  ) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/categories/${id}`
          : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/mindfulness-categories`,
        method: "POST",
        headers,
        body: {
          ...values,
          _method: id ? "PATCH" : "POST",
        },
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllAssessmentCategory],
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllMindfulnessCategory],
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
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/active-inactive-category/${id}`,
        method: "POST",
        headers,
        body: {},
        onSuccess: (res: any) => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllAssessmentCategory],
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getQuickAssessmentQuestions],
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllMindfulnessCategory],
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
          id ? editMindfulnessCategoriesSchema : mindfulnessCategoriesSchema
        }
        onSubmit={(values: mindfulnessCategoriesType) =>
          createCategorySubmitHandler(values)
        }
      >
        {({}) => {
          return (
            <Form className={"[&_label.block>span]:font-medium "}>
              <Title as="h4" className="border-b mb-4 pb-1">
                {id ? "Edit mindfulness category" : "Add mindfulness category"}
              </Title>

              {id && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="flex gap-3 justify-end border rounded-xl px-4 py-2"
                  >
                    <p>Toggle Status: </p>
                    {categoryData.data.data.active ? (
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
                name="nameEnglish"
                label="English Category Name"
                placeholder="Enter your category name in english"
                color="primary"
                className="mb-4"
              />

              <FormikInput
                name="nameAmharic"
                label="Amharic Category Name "
                placeholder="Enter your category name in amharic"
                color="primary"
                className="mb-4"
              />
              <FormikTextArea
                name="descriptionEnglish"
                label="Description english"
                placeholder="Write english description"
                className="mb-4"
              />

              <FormikTextArea
                name="descriptionAmharic"
                label="Description amharic"
                placeholder="Write amharic description"
                className="mb-4"
              />

              <FilePicker name="image" label="Cover Image" className="mb-4" />

              {id && categoryData.data.data && (
                <div className="flex gap-4">
                  <p>Current Image</p>
                  <Image
                    src={categoryData.data.data.image.url}
                    alt={categoryData.data.data.name.english}
                    width={60}
                    height={60}
                  />
                </div>
              )}

              <div className="col-span-2 flex items-end justify-end gap-4">
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

export default AddCategoryForm;
