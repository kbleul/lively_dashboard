"use client";
import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { StoreDataType } from "@/types/store";
import React from "react";
import Placeholder from "@public/Placeholder.png";
import { Title } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio";
import { AdvancedRadio } from "@/components/ui/advanced-radio";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { Text } from "@/components/ui/text";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReusabelPopover from "@/components/reusabel-popover";
import { AiTwotoneDelete } from "react-icons/ai";
import { routes } from "@/config/routes";
import { BranchDataType } from "@/types/branch";
const BrancheList = ({ id }: { id: string }) => {
  const [page, setPage] = React.useState(1);
  const router = useRouter();
  const [value, setValue] = React.useState<string>("");
  const headers = useGetHeaders({ type: "Json" });
  const mybranchesData = useFetchData(
    [queryKeys.getMyBranches, id],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/branches/${id}`,
    headers
  );

  return (
    <div>
      {mybranchesData.isLoading && (
        <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      )}
      {mybranchesData.isSuccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {mybranchesData?.data?.data?.map((branch: BranchDataType) => (
            <div
              key={branch.id}
              className="w-full relative border border-gray-200 bg-gray-0  dark:bg-gray-50  rounded-lg"
            >
              <div className="relative h-44 w-full overflow-hidden group">
                <Image
                  src={branch.branch_cover.url}
                  alt="Center Cover"
                  // height={400}
                  priority
                  // width={500}
                  fill
                  className="object-cover rounded-t-lg group-hover:scale-105 transition-all duration-500 ease-in-out"
                />
              </div>

              <div className="p-5 lg:p-7 mb-12">
                <Title as="h5" className="line-clamp-2">
                  {branch.name.english}
                </Title>
                <Text as="p" className="line-clamp-2">
                  {branch.description.english}
                </Text>
              </div>
              <div className="absolute right-1 bottom-1 flex items-center justify-end gap-2 px-5 lg:px-7 pb-4">
                <ReusabelPopover
                  title={`Delete Center`}
                  icon={<AiTwotoneDelete className="h-4 w-4" />}
                  description={`Are you sure you want to Delete this Center`}
                  onDelete={() => alert(branch.id)}
                />
                <Link href={routes.storeOwner.branch.dashboard(id, branch.id)}>
                  <Button color="primary" variant="outline">
                    Manage
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center gap-3 pt-5">
        {mybranchesData?.data?.data?.prev_page_url && (
          <Button
            color="primary"
            variant="outline"
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
        )}
        {mybranchesData?.data?.data?.next_page_url && (
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

export default BrancheList;
