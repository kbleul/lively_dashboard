"use client";
import { useGetHeaders } from "@/hooks/use-get-headers";
import React from "react";

import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import ClientIntake from "./client-Intake-form";

const QuestionnaireDispatch = () => {
  const headers = useGetHeaders({ type: "Json" });

  return (
    <main className="grid grid-cols-4">
      <section className="border col-span-1" />
      <ClientIntake />
      <section className="border col-span-1" />
    </main>
  );
};

export default QuestionnaireDispatch;
