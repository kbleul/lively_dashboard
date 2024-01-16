"use client";
import React from "react";
import ProductEditTab from "./product-edit-tabs";
import ProductDetailEdit from "./product-detail-edit-form";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Spinner from "@/components/ui/spinner";
import EditVariantForm, { VariantData } from "./edit-variant-form";
import AddVariantForm from "./add-variant-form";
import { Title } from "@/components/ui/text";
interface Props {
  id: string;
}
export enum EditType {
  Product = "Product",
  Variant = "Variant",
}
const EditProductForm = ({ id }: Props) => {
  const [activeTab, setActiveTab] = React.useState<EditType>(EditType.Product);
  const headers = useGetHeaders({ type: "FormData" });
  const productData = useFetchData(
    [queryKeys.getingleProduct],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/products/${id}`,
    headers
  );
  return (
    <div className="@container">
      <ProductEditTab setActiveTab={setActiveTab} activeTab={activeTab} />
      {productData.isFetched &&
      productData.isSuccess &&
      !productData.isRefetching ? (
        <>
          {activeTab === EditType.Product ? (
            <ProductDetailEdit id={id} data={productData?.data?.data} />
          ) : (
            <div className="flex w-full flex-col items-start space-y-3 divide-y divide-gray-300">
              {productData?.data?.data?.variants?.length < 1 ? (
                <Title as="h6" className="text-center py-5 w-full">
                  No Variant Available For This Product
                </Title>
              ) : (
                productData?.data?.data?.variants?.map(
                  (variant: VariantData) => (
                    <div key={variant.id} className="w-full pt-5">
                      <EditVariantForm
                        data={variant}
                        id={id}
                        type={productData?.data?.data?.variant_type}
                      />
                    </div>
                  )
                )
              )}
              <AddVariantForm
                id={id}
                type={productData?.data?.data?.variant_type}
              />
            </div>
          )}
        </>
      ) : (
        <Spinner size="xl" />
      )}
    </div>
  );
};

export default EditProductForm;
