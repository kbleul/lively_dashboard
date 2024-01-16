import React from "react";
import { metaObject } from "@/config/site.config";
import EditPlace from "@/app/shared/operational-manager/places/edit-place";

export const metadata = {
  ...metaObject("Places"),
};
const Page = ({ params }: { params: { placeId: string } }) => {
  return <EditPlace placeId={params.placeId} />;
};

export default Page;
