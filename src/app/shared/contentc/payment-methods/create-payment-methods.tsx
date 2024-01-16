"use client";
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
import { Form, Formik } from "formik";
import FormikInput from "@/components/ui/form/input";
import {
  PaymentMethodType,
  editMethodSchema,
  paymentMethodSchema,
} from "@/validations/language";
import FilePicker from "@/components/ui/form/dropzone";
import Image from "next/image";

export default function AddPaymentForm({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "FormData" });

  const paymentMethod = useFetchData(
    [queryKeys.getSingleCity, id],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/payment-methods/${id}`,
    headers,
    !!id
  );
  const initialValues: PaymentMethodType = {
    bankNameEn: id ? paymentMethod?.data?.data?.bank_name?.english : "",
    bankNameAm: id ? paymentMethod?.data?.data?.bank_name?.amharic : "",
    accountNameEn: id ? paymentMethod?.data?.data?.account_name?.english : "",
    accountNameAm: id ? paymentMethod?.data?.data?.account_name?.amharic : "",
    discriptionNameEn: id
      ? paymentMethod?.data?.data?.description?.english
      : "",
    discriptionNameAm: id
      ? paymentMethod?.data?.data?.description?.amharic
      : "",
    accountNumber: id ? paymentMethod?.data?.data?.account_number : "",
    image: "",
  };
  const createLanguageSchema = async (values: PaymentMethodType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/payment-methods/${id}`
          : `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/payment-methods`,
        method: "POST",
        headers,
        body: {
          bankNameEnglish: values.bankNameEn,
          bankNameAmharic: values.bankNameAm,
          accountNameEnglish: values.accountNameEn,
          accountNameAmharic: values.accountNameAm,
          accountNumber: values.accountNumber.toString(),
          descriptionEnglish: values.discriptionNameEn,
          descriptionAmharic: values.discriptionNameAm,
          image: values.image && values.image,
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPaymentMethods],
          });
          toast.success(
            id
              ? "Payment Method Edited Successfully"
              : "Payment Method Created Successfully"
          );
          closeModal();
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
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          {id ? "Edit Payment Method" : "Add Payment Method"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {paymentMethod.isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={id ? editMethodSchema : paymentMethodSchema}
          onSubmit={createLanguageSchema}
        >
          {({ errors, values }) => {
            console.log(errors);
            return (
              <Form className="flex w-full flex-col items-start space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                  <FormikInput
                    label="Bank Name English"
                    placeholder="Enter English Bank Name"
                    color="primary"
                    name="bankNameEn"
                  />
                  <FormikInput
                    label="Bank Name English"
                    placeholder="Enter Amharic Bank Name"
                    color="primary"
                    name="bankNameAm"
                  />
                  <FormikInput
                    label="Account Name English"
                    placeholder="Enter English Account Name"
                    color="primary"
                    name="accountNameEn"
                  />
                  <FormikInput
                    label="Account Name Amharic"
                    placeholder="Enter Amharic Account Name"
                    color="primary"
                    name="accountNameAm"
                  />
                </div>
                <FormikInput
                  label="Account Number"
                  type="number"
                  placeholder="Enter Account Numbe"
                  color="primary"
                  name="accountNumber"
                />
                <FormikInput
                  label="Discription Name Amharic"
                  placeholder="Enter Amharic Discription Name"
                  color="primary"
                  name="discriptionNameAm"
                />
                <FormikInput
                  label="Discription Name English"
                  placeholder="Enter English Discription Name"
                  color="primary"
                  name="discriptionNameEn"
                />
                <FilePicker name="image" label="Image" />
                {!values.image && (
                  <div className="pt-2">
                    <Image
                      src={paymentMethod?.data?.data?.image?.url}
                      alt="Image"
                      className="h-20 w-full object-contain"
                      width={100}
                      height={100}
                    />
                  </div>
                )}
                <Button
                  color="primary"
                  className="w-full"
                  type="submit"
                  isLoading={postMutation.isPending}
                >
                  {!id ? "Create" : "Edit"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
}
