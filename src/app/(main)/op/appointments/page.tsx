import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import AppointmentList from "@/app/shared/operational-manager/appointments/appointment-list";

export const metadata = {
  ...metaObject("Appointments"),
};

const pageHeader = {
  title: "Appointments",
  breadcrumb: [
    {
      href: routes.operationalManager.dashboard,
      name: "Dashboard",
    },

    {
      name: "Appointments",
    },
  ],
};

export default function Appointments() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <AppointmentList />
    </>
  );
}
