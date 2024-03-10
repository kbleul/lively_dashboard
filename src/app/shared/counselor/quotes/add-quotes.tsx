"use client";

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
import { useModal } from "@/app/shared/modal-views/use-modal";
import Loading from "../../contentc/products/tags/Loading";
import FormikTextArea from "@/components/ui/form/formik-textarea";
import { quotesSchema, quotesType } from "./quotes_schema";
import FormikInput from "@/components/ui/form/input";
import { CategoriesArr } from "./QuotesList";

export default function AddQuoteForm({
  id,
  categoryLink,
  isView,
}: {
  id?: string;
  categoryLink: string;
  isView: boolean;
}) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const { closeModal } = useModal();

  const quoteData = useFetchData(
    [queryKeys.getAllQuotes + id, id],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/${categoryLink}/${id}`,
    headers,
    !!id
  );

  if (quoteData.isFetching) {
    return <Loading id={id} />;
  }
  const initialValues: quotesType = {
    authorEnglish: id ? quoteData?.data?.data?.author?.english : "",
    authorAmharic: id ? quoteData?.data?.data?.author?.amharic : "",

    bodyEnglish: id ? quoteData?.data?.data?.body?.english : "",
    bodyAmharic: id ? quoteData?.data?.data?.body?.amharic : "",
  };

  const createQuotes = async (values: quotesType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/${categoryLink}/${id}`
          : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/${categoryLink}`,
        method: "POST",
        headers,
        body: {
          ...values,
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllQuotes],
          });
          toast.success(
            id
              ? `${
                  categoryLink === CategoriesArr[0] ? "Affirmation" : "Facts"
                } Edited Successfully`
              : `${
                  categoryLink === CategoriesArr[0] ? "Affirmation" : "Facts"
                } Created Successfully`
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
          {id
            ? `Edit ${
                categoryLink === CategoriesArr[0] ? "Affirmation" : "Facts"
              }`
            : `Add  ${
                categoryLink === CategoriesArr[0] ? "Affirmation" : "Facts"
              }`}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {quoteData.isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={quotesSchema}
          onSubmit={createQuotes}
        >
          {() => (
            <Form className="flex flex-col items-start space-y-2">
              <FormikInput
                label="Amharic author name"
                placeholder="Enter amharic author name"
                color="primary"
                name="authorAmharic"
              />
              <FormikInput
                label="English author name"
                placeholder="Enter english author name"
                color="primary"
                name="authorEnglish"
              />

              <FormikTextArea
                label="Amharic Body"
                placeholder={`Enter amharic ${categoryLink} body`}
                color="primary"
                name="bodyAmharic"
              />

              <FormikTextArea
                label="English Body"
                placeholder={`Enter english ${categoryLink} body`}
                color="primary"
                name="bodyEnglish"
              />

              {!isView && (
                <Button
                  color="primary"
                  className="w-full"
                  type="submit"
                  isLoading={postMutation.isPending}
                >
                  {!id ? "Create" : "Edit"}
                </Button>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
