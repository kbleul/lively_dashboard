import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import AppointmentsList from "@/app/shared/operational-manager/appointments/appointments";

export const metadata = {
  ...metaObject("Appointments"),
};

export default function Bookings({ placeId }: { placeId: string }) {
  const pageHeader = {
    title: "Bookings",
    breadcrumb: [
      {
        href: routes.operationalManager.places["package-bookings"](placeId),
        name: "Dashboard",
      },

      {
        name: "Bookings",
      },
    ],
  };

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
