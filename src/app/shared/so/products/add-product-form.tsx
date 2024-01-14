import { ActionIcon } from "@/components/ui/action-icon";
import React from "react";
import { useModal } from "../../modal-views/use-modal";
import { Title } from "@/components/ui/text";
import SearchWidget from "./search-product-widget";
import {
  addBranchProductValidationSchema,
  AddBranchProductype,
} from "@/validations/product";
import { SearchProductData } from "@/types/product";
import { ErrorMessage, Form, Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import useDynamicMutation from "@/react-query/usePostData";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { toast } from "sonner";
import FormikInput from "@/components/ui/form/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Placeholder from "@public/Placeholder.png";
import { PiXBold } from "react-icons/pi";
const AddProductForm = ({ branchId }: { branchId: string }) => {
  const headers = useGetHeaders({ type: "Json" });
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const [selectedProduct, setSelectedProduct] =
    React.useState<SearchProductData | null>(null);
  const { closeModal } = useModal();
  const initialValues: AddBranchProductype = {
    product_variant_id: "",
    price: "",
  };
  const addBranchProduct = async (values: AddBranchProductype) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/branch-products/${branchId}`,
        method: "POST",
        headers,
        body: {
          product_variant_id: values.product_variant_id,
          price: values.price,
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllBranchProducts + branchId],
          });
          toast.success("Product Added Successfully");
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
          Add Product
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={addBranchProductValidationSchema}
        onSubmit={addBranchProduct}
      >
        {() => (
          <Form className="flex flex-col items-start w-full space-y-3">
            <div
              className="
            flex flex-col items-start space-y-2 w-full"
            >
              <SearchWidget setSelectedProduct={setSelectedProduct} />
              <ErrorMessage
                name={"product_variant_id"}
                component="div"
                className={"text-xs capitalize text-red-500 pt-1 font-medium"}
              />
            </div>
            {selectedProduct && (
              <div className="flex items-start gap-2">
                <Image
                  src={selectedProduct.product_image.url ?? Placeholder}
                  alt="product image"
                  width={60}
                  height={60}
                  className="w-20 object-contain"
                />
                <Title as="h6">{selectedProduct.product.title.english}</Title>
              </div>
            )}
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
              Add Product
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
