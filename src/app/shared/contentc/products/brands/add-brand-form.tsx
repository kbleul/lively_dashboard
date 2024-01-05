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

export default function AddBrandForm({ id }: { id?: string }) {
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "FormData" });

  const brandData = useFetchData(
    [queryKeys.getSingleBrand, id],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/brands/${id}`,
    headers,
    !!id
  );
  const initialValues: BrandType = {
    nameEn: id ? brandData?.data?.data?.name?.english : "",
    nameAm: id ? brandData?.data?.data?.name?.amharic : "",
    brand_image: "",
  };
  const createBrand = async (values: BrandType) => {
    try {
      await postMutation.mutateAsync({
        url: id
          ? `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/brands/${id}`
          : `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/brands`,
        method: "POST",
        headers,
        body: {
          nameEnglish: values.nameEn,
          nameAmharic: values.nameAm,
          brand_image: values.brand_image,
          _method: id && "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllBrands],
          });
          toast.success(
            id ? "Brand Edited Successfully" : "Brand Created Successfully"
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
          {id ? "Edit Brand" : "Add Brand"}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {brandData.isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={id ? editbrandSchema :brandSchema}
          onSubmit={createBrand}
        >
          {() => (
            <Form className="flex flex-col items-start space-y-2">
              <FormikInput
                label="Brand English Name"
                placeholder="Enter Brand Name"
                color="primary"
                name="nameEn"
              />
              <FormikInput
                label="Brand Amharic Name"
                placeholder="Enter Brand Name"
                color="primary"
                name="nameAm"
              />
              <FilePicker name="brand_image" label="Brand AImage" />
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
