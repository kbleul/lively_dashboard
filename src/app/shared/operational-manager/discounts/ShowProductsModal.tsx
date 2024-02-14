import Image from "next/image";
import React from "react";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";

const ShowProductsModal = ({ discount }: { discount: any }) => {
  const { closeModal } = useModal();

  return (
    <article className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Products
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {discount.products &&
        discount.products.length > 0 &&
        discount.products.map((product: any) => (
          <section
            key={product.id}
            className="flex justify-start gap-4 mb-4 border rounded-xl"
          >
            <Image
              src={product?.product_variant?.product_image?.url}
              alt=""
              width={400}
              height={400}
              className="w-16 h-16"
            />
            <div className="flex flex-col justify-center items-start">
              <p className="font-semibold text-lg">
                {product?.product_variant?.product?.title?.english}
              </p>

              {product?.product_variant?.value && (
                <p className="pl-1">
                  {product?.product_variant?.value?.english}{" "}
                  {product?.product_variant?.product?.unit?.name?.english}
                </p>
              )}
              {product?.product_variant?.size && (
                <p className="pl-1">
                  {product?.product_variant?.size?.english}{" "}
                  {product?.product_variant?.product?.unit?.name?.english}
                </p>
              )}
              {product?.product_variant?.color && (
                <p className="pl-1">
                  {" "}
                  {product?.product_variant?.color?.english}{" "}
                  {product?.product_variant?.product?.unit?.name?.english}
                </p>
              )}
            </div>
          </section>
        ))}
    </article>
  );
};

export default ShowProductsModal;
