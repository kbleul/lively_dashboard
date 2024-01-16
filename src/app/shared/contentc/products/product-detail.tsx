"use client";
import React from "react";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Spinner from "@/components/ui/spinner";
import { Title, Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import parse from "html-react-parser";
import Image from "next/image";
interface Props {
  id: string;
}

const ProductDetail = ({ id }: Props) => {
  const headers = useGetHeaders({ type: "FormData" });
  const productData = useFetchData(
    [queryKeys.getingleProduct],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}content-creator/products/${id}`,
    headers
  );
  return (
    <div className="@container">
      {productData.isFetched && productData.isSuccess ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Image
              src={productData?.data?.data?.variants[0]?.product_image?.url}
              alt="Product Image"
              height={300}
              width={300}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <Title as="h3">{productData?.data?.data?.title?.english}</Title>
            <Text as="p">
              {parse(productData?.data?.data?.description?.english)}
            </Text>
            <div className="flex items-center gap-3">
              <Text as="p">Tags:</Text>
              <div className="flex items-center gap-2 flex-wrap">
                {productData?.data?.data?.tags?.map(
                  (tag: { name: { english: string }; id: string }) => (
                    <Badge variant="outline" key={tag.id}>
                      {tag?.name?.english}
                    </Badge>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner size="xl" />
      )}
    </div>
  );
};

export default ProductDetail;
