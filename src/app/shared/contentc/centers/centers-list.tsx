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
const CentersList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });
  const [page, setPage] = useState(1);
  const { openModal } = useModal();
  const centersData = useFetchData(
    [queryKeys.getAllCenters, page],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/centers?.page=${page}`,
    headers
  );

  const deleteCenter = async (id: string) => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}content-creator/centers/${id}`,
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
  if (centersData.isError) return <div>Ftech Failed</div>;
  return (
    <div>
      {centersData.isLoading && (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      )}
      {centersData.isSuccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {centersData?.data?.data?.data?.map((center: CenterType) => (
            <div
              key={center.id}
              className="w-full relative border border-gray-200 bg-gray-0  dark:bg-gray-50  rounded-lg"
            >
              <div className="relative h-44 w-full overflow-hidden group">
                <Image
                  src={center.center_cover.url}
                  alt="Center Cover"
                  // height={400}
                  // width={500}
                  fill
                  className="object-cover rounded-t-lg group-hover:scale-105 transition-all duration-500 ease-in-out"
                />
              </div>

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
      )}
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
    </div>
  );
};

export default CentersList;
