import React from "react";
import { metaObject } from "@/config/site.config";
import SubscriptionsList from "@/app/shared/operational-manager/subscriptions/SubscriptionsList";

export const metadata = {
  ...metaObject("Subscriptions"),
};
const Page = () => {
  return <SubscriptionsList />;
};

export default Page;
