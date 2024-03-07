"use client";
import React, { useEffect, useState } from "react";
import ClientIntake from "./client-Intake-form";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { useGetHeaders } from "@/hooks/use-get-headers";
import Spinner from "@/components/ui/spinner";
import { Title } from "rizzui";
import SessionForm from "./session-form";

export const ClientFormTypes = {
  INTAKE: "client-intake",
  SESSION: "session-review",
  PROGRESS: "client-progress",
};

const QuestionnaireDispatch = ({ clientId }: { clientId: string }) => {
  const [viewFormType, setViewedFormType] = useState<string | null>(null);
  const headers = useGetHeaders({ type: "Json" });

  const clientData = useFetchData(
    [queryKeys.getClient + clientId],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/client-detail/${clientId}`,
    headers
  );

  useEffect(() => {
    if (clientData.isFetched) {
      clientData?.data?.data?.expert_intake_taken
        ? setViewedFormType(ClientFormTypes.SESSION)
        : setViewedFormType(ClientFormTypes.INTAKE);
    }
  }, [clientData.isFetching, clientData.isFetched]);

  if (clientData.isFetching && viewFormType === null) {
    <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
      <Spinner size="xl" />

      <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
        Loading...
      </Title>
    </div>;
  }
  return (
    <main className="grid grid-cols-4">
      <section className=" col-span-1" />
      {viewFormType === ClientFormTypes.INTAKE && (
        <ClientIntake
          clientId={clientId}
          setViewedFormType={setViewedFormType}
        />
      )}
      {viewFormType === ClientFormTypes.SESSION && (
        <SessionForm clientId={clientId} />
      )}
      <section className=" col-span-1" />
    </main>
  );
};

export default QuestionnaireDispatch;
