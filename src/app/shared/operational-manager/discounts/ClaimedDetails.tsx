"use client";

import React from "react";
import Image from "next/image";

import { useModal } from "../../modal-views/use-modal";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { ActionIcon, Button, Title } from "rizzui";
import { PiXBold } from "react-icons/pi";
import Spinner from "@/components/ui/spinner";
import { toast } from "sonner";
import useDynamicMutation from "@/react-query/usePostData";

const ClaimedDetails = ({ discountId }: { discountId: string }) => {
  const { closeModal } = useModal();
  const headers = useGetHeaders({ type: "Json" });

  const postMutation = useDynamicMutation();

  const queryClient = useQueryClient();

  const claimData = useFetchData(
    [queryKeys.getSingleClaimDiscount + discountId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/claimed-product-discount-detail/` +
      discountId,
    headers
  );

  const applyClaim = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url:
          `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/apply-claimed-product-discounts/` +
          id,
        method: "POST",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllClaimDiscounts],
          });

          queryClient.setQueryData([queryKeys.getAllClaimDiscounts], null);
          queryClient.setQueryData(
            [queryKeys.getSingleClaimDiscount + discountId],
            null
          );
          toast.success("Claim accepted successfully");
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
    <main className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between py-2 md:py-3 border-b">
        <Title as="h3" className="font-semibold">
          Discount
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      {claimData.isFetched ? (
        <article>
          <Title as="h4" className="font-medium mb-2">
            Claimed Item
          </Title>
          <section className="flex flex-col md:flex-row justify-start items-stretch gap-6 p-4 md:p-5 border rounded-xl">
            <div className="w-full md:w-1/3 min-h-[15vh] border-[1.8px] verflow-hidden relative border-gray-300 rounded-xl">
              <Image
                src={
                  claimData?.data?.data?.claimable?.place_branch_product
                    ?.product_variant?.product_image?.url
                }
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt={""}
              />
            </div>
            <div>
              <Title as="h5" className="font-medium">
                Claimed Item
              </Title>

              <div className="mt-2 flex flex-col gap-1 md:gap-2">
                <p>
                  Brand Name:{" "}
                  <span className="font-semibold">
                    {claimData?.data?.data?.claimable?.discount?.title?.english}
                  </span>
                </p>
                <p>
                  Variant:{" "}
                  <span className="font-semibold">
                    {claimData?.data?.data?.claimable?.place_branch_product
                      ?.product_variant?.color &&
                      claimData?.data?.data?.claimable?.place_branch_product
                        ?.product_variant?.color?.english}
                    {claimData?.data?.data?.claimable?.place_branch_product
                      ?.product_variant?.size &&
                      claimData?.data?.data?.claimable?.place_branch_product
                        ?.product_variant?.size?.english}
                    {claimData?.data?.data?.claimable?.place_branch_product
                      ?.product_variant?.value &&
                      claimData?.data?.data?.claimable?.place_branch_product
                        ?.product_variant?.value?.english}
                  </span>
                </p>
                <p>
                  Discount:{"  "}
                  <span className="font-semibold">
                    {claimData?.data?.data?.claimable?.discount?.discount}%
                  </span>
                </p>
                <p>
                  Price:{" "}
                  <span className="font-semibold">
                    {
                      claimData?.data?.data?.claimable?.place_branch_product
                        ?.price
                    }{" "}
                    birr
                  </span>
                </p>
                <p>
                  After Discount:{" "}
                  <span className="font-semibold">
                    {parseInt(
                      claimData?.data?.data?.claimable?.place_branch_product
                        ?.price
                    ) -
                      (parseInt(
                        claimData?.data?.data?.claimable?.place_branch_product
                          ?.price
                      ) *
                        parseInt(
                          claimData?.data?.data?.claimable?.discount?.discount
                        )) /
                        100}{" "}
                    birr
                  </span>
                </p>
              </div>
            </div>
          </section>

          <Title as="h4" className="font-medium mt-4 mb-2">
            Claimed By
          </Title>
          <section className="flex justify-start items-stretch gap-6 p-4 md:p-5 border rounded-xl">
            <div className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63] w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center text-xl border-[1.8px] verflow-hidden relative border-gray-300 ">
              {claimData?.data?.data?.user?.first_name[0] +
                claimData?.data?.data?.user?.last_name[0]}
            </div>
            <div>
              <Title as="h5" className="font-medium">
                {claimData?.data?.data?.user?.first_name +
                  " " +
                  claimData?.data?.data?.user?.last_name}
              </Title>

              <div className="mt-2 flex flex-col gap-1">
                <p className="text-sm">
                  {claimData?.data?.data?.user?.username}
                </p>
                <p className="text-sm">+{claimData?.data?.data?.user?.phone}</p>
              </div>
            </div>
          </section>

          <Title as="h4" className="font-medium mt-4 mb-2">
            Promo Code
          </Title>

          <section className="flex justify-start items-stretch gap-6 px-6 py-3 border rounded-xl">
            <p className="font-medium text-lg">
              {claimData?.data?.data?.claimable?.discount?.promo_code}
            </p>
          </section>

          {!claimData?.data?.data?.applied && (
            <section className="border-t mt-8 flex justify-end">
              <Button
                tag="button"
                size="xl"
                color="primary"
                type="button"
                onClick={() => applyClaim(claimData?.data?.data?.id)}
                className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63] mt-4 h-12 px-4 py-3 lg:px-8 xl:px-10"
              >
                {postMutation.isPending ? "..." : "Approve"}
              </Button>
            </section>
          )}
        </article>
      ) : (
        <Spinner size="xl" />
      )}
    </main>
  );
};

export default ClaimedDetails;
