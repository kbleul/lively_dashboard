import ServiceList from "@/app/shared/contentc/services/service-list";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Services"),
};

const page = () => {
  return <ServiceList />;
};

export default page;
