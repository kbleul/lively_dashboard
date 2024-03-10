"use client";

import React, { useState } from "react";

import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { useGetHeaders } from "@/hooks/use-get-headers";

import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { routes } from "@/config/routes";
import ClientDetailsHeader from "./ClientDetailsHeader";
import CustomCategoryButton from "@/components/ui/CustomCategoryButton";
import ClientInfo from "./ClientInfo";
import UpcommingAppointments from "./UpcommingAppointment";
import AppointmentsHistory from "./AppointmentsHistory";

const CategoriesArr = [
  "Personal Info",
  "Upcoming Appointment",
  "Appointment History",
];

const ClientDetails = ({ clientId }: { clientId: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  const [categoryLink, setCategoryLink] = useState(CategoriesArr[0]);

  const clientData = useFetchData(
    [queryKeys.getSingleClient + clientId, clientId],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/client-detail/${clientId}`,
    headers
  );

  if (clientData.isPending || clientData.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }
  console.log(clientData.data.data.data);

  return (
    <main className="">
      <div className="flex justify-start">
        <Link
          href={routes.counselor.clients}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-black"
        >
          <IoArrowBack />
          <p>Back</p>
        </Link>
      </div>

      <div className="my-3 mb-6">
        <ClientDetailsHeader userData={clientData?.data?.data?.user} />
      </div>

      <CustomCategoryButton
        categoryLink={categoryLink}
        setCategoryLink={setCategoryLink}
        categoriesArr={CategoriesArr}
        labels={CategoriesArr}
      />

      <section className="my-2">
        {categoryLink === CategoriesArr[0] && (
          <ClientInfo userData={clientData?.data?.data?.user} />
        )}

        {categoryLink === CategoriesArr[1] && (
          <UpcommingAppointments clientId={clientId} />
        )}

        {categoryLink === CategoriesArr[2] && (
          <AppointmentsHistory
            clientId={clientId}
            clientName={
              clientData?.data?.data?.user?.first_name +
              " " +
              clientData?.data?.data?.user?.last_name
            }
          />
        )}
      </section>
    </main>
  );
};

export default ClientDetails;
