"use client";

import { useModal } from "@/app/shared/modal-views/use-modal";
import React, { useEffect, useState } from "react";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Button, Title } from "rizzui";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Spinner from "@/components/ui/spinner";
import { RiDragMoveFill } from "react-icons/ri";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const SortableItem = SortableElement(
  ({ index, value }: { index: number; value: any }) => (
    <li className=" border rounded-xl w-full py-4 px-4 mb-4 flex gap-4 items-center justify-start cursor-move ">
      <RiDragMoveFill size={20} color="#cfd1d0" />
      <p>{value.name}</p>
    </li>
  )
);

const SortableList = SortableContainer(({ items }: { items: any[] }) => {
  return (
    <ul>
      {items.map((value: any, index: any) => (
        // @ts-ignore
        <SortableItem key={`item-${value.id}`} index={index} value={value} />
      ))}
    </ul>
  );
});

const ReorderPackages = ({ branchId }: { branchId: string }) => {
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  const [categoriesList, setCategoriesList] = useState<any[] | null>(null);

  const storeData = useFetchData(
    [queryKeys.getAllPackageCategories + branchId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/package-categories/${branchId}`,
    headers
  );

  const redorderPackageCategories = async () => {
    try {
      const package_categories = categoriesList
        ? categoriesList.map((item) => item.id)
        : [];

      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/packages-category-order`,
        method: "POST",
        headers,
        body: {
          package_categories: categoriesList ? [...package_categories] : [],
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPackageCategories + branchId],
          });

          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllPackages],
          });

          queryClient.setQueryData(
            [queryKeys.getAllPackageCategories, branchId],
            null
          );
          queryClient.setQueryData([queryKeys.getAllPackages], null);

          toast.success("Package category order updated Successfully");
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

  useEffect(() => {
    storeData?.isFetched && setCategoriesList([...storeData?.data?.data]);
  }, [storeData?.isFetched]);

  if (storeData?.isFetching || storeData?.isLoading || storeData.isPending) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (categoriesList) {
      const oldArray = [...categoriesList];
      const newArray = arrayMoveImmutable(oldArray, oldIndex, newIndex);

      setCategoriesList([...newArray]);
    }
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Reorder Package
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      {categoriesList && (
        <>
          {/* @ts-ignore */}
          <SortableList items={categoriesList} onSortEnd={onSortEnd} />
          <Button
            isLoading={postMutation.isPending}
            type="button"
            color="primary"
            size="lg"
            className="w-full"
            onClick={redorderPackageCategories}
          >
            Done
          </Button>
        </>
      )}
    </div>
  );
};

export default ReorderPackages;
