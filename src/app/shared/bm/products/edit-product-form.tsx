import { ActionIcon } from "@/components/ui/action-icon";
import React from "react";
import { useModal } from "../../modal-views/use-modal";
import { Title } from "@/components/ui/text";
import {
  editBranchProductValidationSchema,
  EditBranchProductype,
} from "@/validations/product";
import { Form, Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import useDynamicMutation from "@/react-query/usePostData";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import FormikInput from "@/components/ui/form/input";
import { Button } from "@/components/ui/button";
import { PiXBold } from "react-icons/pi";
import { useFetchData } from "@/react-query/useFetchData";
import Spinner from "@/components/ui/spinner";
import { toast } from "sonner";

const EditdProductForm = ({ productId }: { productId: string }) => {
  const headers = useGetHeaders({ type: "Json" });
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();

  const { closeModal } = useModal();

  const productData = useFetchData(
    [queryKeys.getSingleProduct + productId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}branch-manager/branch-products/${productId}`,
    headers
  );

  const editBranchProduct = async (values: EditBranchProductype) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}branch-manager/branch-products/${productId}`,
        method: "POST",
        headers,
        body: {
          price: values.price,
          _method: "PATCH",
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllBranchProducts],
          });
          toast.success("Product Updated Successfully");
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

  if (
    productData?.isFetching ||
    productData?.isLoading ||
    productData.isPending
  ) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const initialValues: EditBranchProductype = {
    price: productData?.data?.data?.price,
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Edit Product
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={editBranchProductValidationSchema}
        onSubmit={editBranchProduct}
      >
        {() => (
          <Form className="flex flex-col items-start w-full space-y-3">
            <FormikInput
              label="Price"
              placeholder="Enter Product Price"
              color="primary"
              name="price"
            />

            <Button
              isLoading={postMutation.isPending}
              type="submit"
              color="primary"
              size="lg"
              className="w-full"
            >
              Update Product
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditdProductForm;
