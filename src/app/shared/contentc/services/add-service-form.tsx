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
import FormikInput from "@/components/ui/form/input";
import { useModal } from "@/app/shared/modal-views/use-modal";
import { BrandType, brandSchema, editbrandSchema } from "@/validations/tag";
import FilePicker from "@/components/ui/form/dropzone";
import Loading from "../products/tags/Loading";
import Image from "next/image";

export default function AddServiceForm({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "FormData" });

  const serviceData = useFetchData(
    [queryKeys.getSingleService, id],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/services/${id}`,
    headers,
    !!id
  );

  if (serviceData.isFetching) {
    return <Loading id={id} />;
  }

  const initialValues: BrandType = {
    nameEn: id ? serviceData?.data?.data?.name?.english : "",
    nameAm: id ? serviceData?.data?.data?.name?.amharic : "",
    brand_image: "",
  };
  const createService = async (values: BrandType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/services/${id}`
          : `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/services`,
        method: "POST",
        headers,
        body: {
          nameEnglish: values.nameEn,
          nameAmharic: values.nameAm,
          icon: values.brand_image,
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllServices],
          });
          toast.success(
            id ? "Service Edited Successfully" : "Service Created Successfully"
          );

          id &&
            queryClient.setQueryData([queryKeys.getSingleService, id], null);

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
          {id ? "Edit Service" : "Add Service"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {serviceData.isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={id ? editbrandSchema : brandSchema}
          onSubmit={createService}
        >
          {() => (
            <Form className="flex flex-col items-start space-y-2">
              <FormikInput
                label="Service English Name"
                placeholder="Enter Service Name"
                color="primary"
                name="nameEn"
              />
              <FormikInput
                label="Service Amharic Name"
                placeholder="Enter Service Name"
                color="primary"
                name="nameAm"
              />
              <FilePicker name="brand_image" label="Service AImage" />

              {id &&
                serviceData?.data?.data?.icon &&
                serviceData?.data?.data?.icon?.url && (
                  <>
                    <p>Current Image</p>
                    <Image
                      src={serviceData?.data?.data?.icon?.url}
                      alt=""
                      className="dark:invert"
                      width={100}
                      height={100}
                    />
                  </>
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
          )}
        </Formik>
      )}
    </div>
  );
}
