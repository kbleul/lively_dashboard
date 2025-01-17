"use client";

import React, { useState } from "react";
import LogoImage from "@public/bg.png";

import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";

import { queryKeys } from "@/react-query/query-keys";
import Spinner from "@/components/ui/spinner";
import { Button, Title } from "rizzui";
import Image from "next/image";
import Link from "next/link";
import { routes } from "@/config/routes";

import { MdOutlineCategory } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineStorefront } from "react-icons/md";
import PageHeader from "@/app/shared/page-header";
import { BsThreeDots } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";

const pageHeader = {
  title: "Store Owner",
  breadcrumb: [
    {
      href: routes.operationalManager.places.list,
      name: "Stores",
    },
    {
      name: "View Stores",
    },
  ],
};

const ViewStore = ({ params }: { params: { placeId: string } }) => {
  const headers = useGetHeaders({ type: "Json" });

  const storeData = useFetchData(
    [queryKeys.getSinglePlace],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/places/${params.placeId}`,
    headers
  );

  let branchData = useFetchData(
    [queryKeys.getAllPlaceBranches],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/branches/${params.placeId}`,
    headers
  );

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

  if (
    branchData?.isFetching ||
    branchData?.isLoading ||
    branchData?.isPending
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

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      {storeData?.data?.data && (
        <article className="relative">
          <section className="w-full h-[15vh] md:h-[25vh] rounded-3xl overflow-hidden relative">
            <Image
              src={LogoImage}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt={""}
            />
          </section>

          <section className="branchlogo flex items-start mt-40 justify-start pl-2 md:pl-20">
            <section className="">
              <section
                className="w-20 h-20 md:w-32 md:h-32 gap-x-4  bg-[#e1f7e6] rounded-full shadow-sm overflow-hidden  z-10"
                style={{
                  backgroundImage: `url('${storeData?.data?.data?.place_logo?.url}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 100,
                }}
              ></section>
            </section>
          </section>
        </article>
      )}

      <section className="mt-8 md:mt-0 md:w-3/4  md:ml-[30%] lg:[23%]  ">
        <h4 className="font-bold text-2xl py-2">
          {storeData?.data?.data?.name?.english}
        </h4>

        <section className="mb-4 ">
          <div className=" mb-3 flex items-center justify-start gap-x-4 ">
            <MdOutlineCategory size={18} color="#00BA63" />
            <p className="text-[#5F5F5F]">Business type : </p>
            <p className="text-black">
              {storeData?.data?.data?.place_types?.name?.english}
            </p>

            {storeData?.data?.data?.place_types.map((item: any) => (
              <p key={item.id}>{item?.name?.english} </p>
            ))}
          </div>

          {storeData?.data?.data?.phone && (
            <div className=" mb-3 flex items-center justify-start gap-x-4 ">
              <LuPhone size={18} color="#00BA63" />

              <p className="text-[#5F5F5F]">Phone number : </p>
              <p className="text-black">{storeData?.data?.data?.phone}</p>
            </div>
          )}

          {storeData?.data?.data?.owner && (
            <div className=" mb-3 flex items-center justify-start gap-x-4 ">
              <IoPersonOutline size={18} color="#00BA63" />

              <p className="text-[#5F5F5F]">Store Owner : </p>
              <p className="text-black">
                {storeData?.data?.data?.owner?.first_name +
                  " " +
                  storeData?.data?.data?.owner?.last_name}
              </p>
            </div>
          )}

          {storeData?.data?.data?.owner?.phone && (
            <div className=" mb-3 flex items-center justify-start gap-x-4 ">
              <LuPhone size={18} color="#00BA63" />

              <p className="text-[#5F5F5F]">Owner number : </p>
              <p className="text-black">
                {storeData?.data?.data?.owner?.phone}
              </p>
            </div>
          )}

          {storeData?.data?.data?.website && (
            <div className=" mb-2 flex items-center justify-start gap-x-4 ">
              <MdOutlineStorefront size={18} color="#00BA63" />
              <p className="text-[#5F5F5F]">website : </p>
              <p className="text-black">{storeData?.data?.data?.website}</p>
            </div>
          )}
        </section>

        <p className="text-[#6F6F6F] pr-4 md:w-4/5 leading-8">
          About Store : {storeData?.data?.data?.description?.english}
        </p>
      </section>

      {storeData?.data?.data?.id && branchData.data.data && (
        <section className="w-full flex flex-col items-center justify-center gap-y-6 mt-4 pt-6 border-t">
          {branchData.data.data.length === 0 && (
            <h4 className="pt-6 text-[#5F5F5F] text-center md:text-xl font-normal">
              There is no branch created. Please create one!
            </h4>
          )}

          <Button
            type="submit"
            color="primary"
            className="min-w-[200px] w-1/5  @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 my-4"
          >
            <Link
              href={routes.operationalManager.places["create-branch"](
                storeData?.data?.data?.id
              )}
            >
              Create Branch
            </Link>
          </Button>

          {branchData.data.data.length > 0 && (
            <div className="mb-10 grid grid-cols-1 md:grid-cols-2  gap-7  @2xl:gap-9 @3xl:gap-11 w-full  items-center justify-evenly">
              {branchData.data.data.map((data: any) => (
                <BranchCard
                  key={data.id}
                  data={data}
                  placeId={params.placeId}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
};

const BranchCard = ({ data, placeId }: { data: any; placeId: string }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <article className="w-full relative border border-gray-200 bg-gray-0  dark:bg-gray-50  rounded-lg">
      <section className="relative h-44 w-full overflow-hidden group">
        <Image
          src={
            data?.branch_covers &&
            data?.branch_covers.length > 0 &&
            data.branch_covers[0]?.url
              ? data.branch_covers[0].url
              : LogoImage
          }
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={""}
        />
      </section>

      <h4 className="px-4 py-2">{data.name.english}</h4>
      <p className="px-4 pb-4 h-[14vh] overflow-y-hidden">
        {data.description.english}
      </p>

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
              href={routes.operationalManager.places["branch-dashboard"](
                placeId,
                data.id
              )}
              className="text-black bg-white z-50 px-8 py-2  border-b border-b-gray-300  flex justify-start items-center gap-2 hover:border-none"
            >
              Manage
            </Link>
          </div>
        )}
      </section>

      <div className="flex justify-start items-center gap-x-2 mb-4 px-4">
        <CiDeliveryTruck size={24} color="black" />
        <p className="font-medium">
          Dilivery Support :{" "}
          <span className="font-semibold">
            {data.has_delivery ? "Yes" : "No"}
          </span>
        </p>
      </div>
    </article>
  );
};

export default ViewStore;
