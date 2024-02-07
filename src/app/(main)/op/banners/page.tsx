import BannersList from "@/app/shared/operational-manager/banners/banners-list";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";

export const metadata = {
  ...metaObject("Banners"),
};

const pageHeader = {
  title: "Banners",
  breadcrumb: [
    {
      href: routes.operationalManager.dashboard,
      name: "Dashboard",
    },

    {
      name: "Banners",
    },
  ],
};

export default function Banners() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <BannersList />
    </>
  );
}
