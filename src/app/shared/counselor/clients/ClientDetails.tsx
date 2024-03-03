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
import Assessments from "./Assessments";
import UpcommingAppointments from "./UpcommingAppointment";
import AppointmentsHistory from "./AppointmentsHistory";
import SessionNotes from "./SessionNotes";

const CategoriesArr = [
  "Personal Info",
  "Notes",
  "Assessment Answers",
  "Upcoming Appointment",
  "Appointment History",
];

const ClientDetails = ({ clientId }: { clientId: string }) => {
  const fetchCategoryLinks = {
    [CategoriesArr[0]]: `client-detail/${clientId}`,
  };

  const headers = useGetHeaders({ type: "Json" });

  const [categoryLink, setCategoryLink] = useState(CategoriesArr[0]);

  const clientData = useFetchData(
    [queryKeys.getUpcommingAppointments + clientId, clientId],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/client-upcoming-appointments/${clientId}`,
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

  return (
    <main className="">
      <div className="flex justify-start">
        <Link
          href={routes.expert.clients}
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
        {/* {categoryLink === CategoriesArr[0] && (
          <ClientInfo userData={clientData?.data?.data?.user} />
        )} */}
        {/* 
        {categoryLink === CategoriesArr[1] && (
          <SessionNotes
            clientId={clientId}
            clientData={clientData?.data?.data?.user}
          />
        )}

        {categoryLink === CategoriesArr[2] && (
          <Assessments
            clientId={clientId}
            clientData={clientData?.data?.data?.user}
          />
        )} */}

        {categoryLink === CategoriesArr[3] && (
          <UpcommingAppointments clientId={clientId} />
        )}

        {categoryLink === CategoriesArr[4] && (
          <AppointmentsHistory clientId={clientId} />
        )}
      </section>
    </main>
  );
};

export default ClientDetails;
