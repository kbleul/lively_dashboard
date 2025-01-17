"use client";
import React, { useState } from "react";
import { useFetchData } from "@/react-query/useFetchData";
import { Button } from "@/components/ui/button";
import { AiTwotoneDelete } from "react-icons/ai";
import useDynamicMutation from "@/react-query/usePostData";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Title, Text } from "@/components/ui/text";
import Image from "next/image";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useModal } from "../../modal-views/use-modal";
import { CenterType } from "@/types/centers";
import { ActionIcon } from "@/components/ui/action-icon";
import ReusabelPopover from "@/components/reusabel-popover";
import Spinner from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { PiXBold, PiMagnifyingGlassBold } from "react-icons/pi";
import { Input } from "rizzui";

const CentersList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const centersData = useFetchData(
    [queryKeys.getAllCenters, page, searchText],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/centers?search=${searchText}&page=${page}`,
    headers
  );

  const deleteCenter = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}operation-manager/centers/${id}`,
        method: "DELETE",
        headers,
        body: {},
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.getAllCenters],
          });
          toast.success("Center Deleted Successfully");
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  if (centersData.isError) return <div>Fetching centers Failed</div>;

  return (
    <div>
      <div className="w-full flex items-center px-5 py-4">
        <Input
          variant="flat"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search centers by name..."
          className=" w-full"
          prefix={
            <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
          }
          suffix={
            searchText && (
              <Button
                size="sm"
                variant="text"
                className="h-auto w-auto px-0"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchText(() => "");
                }}
              >
                Clear
              </Button>
            )
          }
        />
        <ActionIcon
          variant="text"
          size="sm"
          className="ms-3 text-gray-500 hover:text-gray-700"
          onClick={() => {}}
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>

      {centersData.isPending ||
        (centersData.isFetching && (
          <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
            <Spinner size="xl" />
            <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
              Loading...
            </Title>
          </div>
        ))}

      {!centersData.isFetching && centersData.isSuccess && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {centersData?.data?.data?.data?.map((center: CenterType) => (
              <div
                key={center.id}
                className="w-full relative border border-gray-200 bg-gray-0  dark:bg-gray-50  rounded-lg"
              >
                {center.center_cover && center.center_cover.url && (
                  <div className="relative h-44 w-full overflow-hidden group">
                    <Image
                      src={center.center_cover.url}
                      alt="Center Cover"
                      fill
                      className="object-cover rounded-t-lg group-hover:scale-105 transition-all duration-500 ease-in-out"
                    />
                  </div>
                )}

                <div className="p-5 lg:p-7 mb-12">
                  <Title as="h5" className="line-clamp-2">
                    {center.name.english}
                  </Title>
                  <Text as="p" className="line-clamp-2">
                    {center.description.english}
                  </Text>
                </div>
                <div className="absolute right-1 bottom-1 flex items-center justify-end gap-2 px-5 lg:px-7 pb-4">
                  <ReusabelPopover
                    title={`Delete Center`}
                    icon={<AiTwotoneDelete className="h-4 w-4" />}
                    description={`Are you sure you want to Delete this Center`}
                    onDelete={() => deleteCenter(center.id)}
                  />

                  <Button
                    onClick={() =>
                      router.push(
                        routes.operationalManager.centers.edit(center.id)
                      )
                    }
                    color="primary"
                    variant="outline"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 pt-5">
            {centersData?.data?.data?.prev_page_url && (
              <Button
                color="primary"
                variant="outline"
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
            )}
            {centersData?.data?.data?.next_page_url && (
              <Button
                color="primary"
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CentersList;
