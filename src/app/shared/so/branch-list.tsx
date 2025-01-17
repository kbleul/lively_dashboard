"use client";
import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";
import { Title } from "@/components/ui/text";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Text } from "@/components/ui/text";
import { BsThreeDots } from "react-icons/bs";
import PencilIcon from "@/components/icons/pencil";

import Image from "next/image";

import { routes } from "@/config/routes";
import { BranchDataType } from "@/types/branch";
import { CiDeliveryTruck } from "react-icons/ci";

const BrancheList = ({ id }: { id: string }) => {
  const [page, setPage] = React.useState(1);

  const headers = useGetHeaders({ type: "Json" });
  const mybranchesData = useFetchData(
    [queryKeys.getMyBranches, page, id],
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

      {mybranchesData.isSuccess && mybranchesData?.data?.data?.length === 0 && (
        <div className="flx justify-center items-center w-full mt-32 ">
          <p className="text-xl text-center w-full">No branches yet</p>
        </div>
      )}
      {mybranchesData.isSuccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {mybranchesData?.data?.data?.map((branch: BranchDataType) => (
            <BranchCard key={branch.id} id={id} branch={branch} />
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

const BranchCard = ({ id, branch }: { id: string; branch: BranchDataType }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      key={branch.id}
      className="w-full relative border border-gray-200 bg-gray-0  dark:bg-gray-50  rounded-lg"
    >
      <div className="relative h-44 w-full overflow-hidden group">
        <Image
          onMouseOut={() => setShowMenu(false)}
          src={branch.branch_cover.url}
          alt="Center Cover"
          priority
          fill
          className="object-cover rounded-t-lg group-hover:scale-105 transition-all duration-500 ease-in-out"
        />
        <section className="absolute top-3 right-3">
          <Button
            color="primary"
            variant="outline"
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-black bg-white z-50  rounded-full border-white py-1 px-[0.6rem] flex justify-center items-center"
          >
            <BsThreeDots size={20} />
          </Button>

          {showMenu && (
            <div
              className="absolute top-8 right-10 border bg-white"
              onMouseEnter={() => setShowMenu(true)}
            >
              <Link
                href={routes.storeOwner.branch["edit-branch"](id, branch.id)}
                className="text-black bg-white z-50 px-8 py-2   border-white  flex justify-center items-center gap-2 hover:border-none"
              >
                <PencilIcon className="h-4 w-4 cursor-pointer" />
                Edit
              </Link>
            </div>
          )}
        </section>
      </div>

      <div className="p-5 lg:p-7">
        <Title as="h5" className="line-clamp-2">
          {branch.name.english}
        </Title>
        <Text as="p" className="line-clamp-2">
          {branch.description.english}
        </Text>
      </div>

      <div className="flex justify-end items-center gap-x-2 mb-4 px-4">
        <CiDeliveryTruck size={24} color="black" />
        <p className="font-medium">
          Dilivery Support :{" "}
          <span className="font-semibold">
            {branch.has_delivery ? "Yes" : "No"}
          </span>
        </p>
      </div>

      <div className="flex items-center justify-start gap-2 px-5 lg:px-7 pb-4">
        <Link href={routes.storeOwner.branch.dashboard(id, branch.id)}>
          <Button
            color="primary"
            variant="outline"
            className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63]"
          >
            Manage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BrancheList;
