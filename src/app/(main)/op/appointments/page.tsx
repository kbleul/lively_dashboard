import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import AppointmentsList from "@/app/shared/operational-manager/appointments/appointments";

export const metadata = {
  ...metaObject("Appointments"),
};

const pageHeader = {
  title: "Appointments & Bookings",
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

      <AppointmentsList />
    </>
  );
}
