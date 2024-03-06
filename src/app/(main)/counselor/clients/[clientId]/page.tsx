import React from "react";
import { metaObject } from "@/config/site.config";

import ClientDetails from "@/app/shared/counselor/clients/ClientDetails";

export const metadata = {
  ...metaObject("Clients"),
};

const Clients = ({ params }: { params: { clientId: string } }) => {
  return <ClientDetails clientId={params.clientId} />;
};

export default Clients;
