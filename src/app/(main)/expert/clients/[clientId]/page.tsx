import React from "react";
import { metaObject } from "@/config/site.config";

import ClientDetails from "@/app/shared/expert/clients/ClientDetails";

export const metadata = {
  ...metaObject("Client Detail"),
};

const Client = ({ params }: { params: { clientId: string } }) => {
  return <ClientDetails clientId={params.clientId} />;
};

export default Client;
