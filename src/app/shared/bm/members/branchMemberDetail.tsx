"use client";

import BgImage from "@public/bg.png";

import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React, { useState } from "react";
import { Title } from "rizzui";

import { CiUser } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";

import Image from "next/image";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "./details-column";

const BranchMemberDetail = ({ userId }: { userId: string }) => {
  const headers = useGetHeaders({ type: "Json" });
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const branchMemberData = useFetchData(
    [queryKeys.getSingleMember + userId, pageSize, currentPage],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}branch-manager/member-bookings/${userId}`,
    headers
  );

  if (
    branchMemberData?.isFetching ||
    branchMemberData?.isLoading ||
    branchMemberData.isPending
  ) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  console.log(branchMemberData.data.data);

  return (
    <>
      <article className="relative">
        <section className="w-full h-[10vh] md:h-[20vh]  overflow-hidden relative">
          <Image
            src={BgImage}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={""}
          />
        </section>

        <section className="branchlogo flex items-start mt-32 justify-start pl-2 md:pl-10">
          <section className="">
            <section
              className="w-16 h-16 md:w-28 md:h-28 gap-x-4 border-4 border-white  bg-[#e1f7e6] rounded-full shadow-sm overflow-hidden  z-10"
              style={{
                backgroundImage: `url('${branchMemberData?.data?.data?.profile_image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 100,
              }}
            ></section>
          </section>
        </section>
      </article>

      <section className="mt-8 md:mt-0 md:w-3/4  ml-8 md:ml-56 ">
        <h4 className="font-normal text-2xl py-2">
          {branchMemberData?.data?.data?.first_name +
            " " +
            branchMemberData?.data?.data?.last_name}
        </h4>

        <section className="mb-4 ">
          <div className=" mb-3 flex items-center justify-start gap-x-2 ">
            <CiUser size={20} color="#008579" />
            <p className="text-[#5F5F5F] pt-[0.1rem]">
              {branchMemberData?.data?.data?.username}
            </p>
          </div>
          <div className=" mb-3 flex items-center justify-start gap-x-2 ">
            <PiPhoneLight size={20} color="#008579" />
            <p className="text-[#5F5F5F] ">
              +{branchMemberData?.data?.data?.phone}
            </p>
          </div>
        </section>
      </section>

      <section className="py-4 md:mx-8 border-b my-4">
        <h4 className="text">Packages History</h4>
        <p>All package purchase by a user</p>
      </section>

      <div className={"table-wrapper flex-grow md:mx-8"}>
        <ControlledTable
          variant={"modern"}
          isLoading={branchMemberData.isFetching}
          showLoadingText={true}
          data={branchMemberData?.data?.data?.bookings?.data}
          scroll={{ x: 900 }}
          // @ts-ignore
          columns={getColumns()}
          paginatorOptions={{
            pageSize: 1,
            setPageSize,
            total: 0,
            current: 1,
            onChange: (page: number) => setCurrentPage(page),
          }}
          className={
            "overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
          }
        />
      </div>
    </>
  );
};

export default BranchMemberDetail;
