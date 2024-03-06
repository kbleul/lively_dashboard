import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import QuotesList from "@/app/shared/counselor/quotes/QuotesList";

export const metadata = {
  ...metaObject("Dashboard"),
};

const pageHeader = {
  title: "Counselor",
  breadcrumb: [
    {
      href: routes.counselor.dashboard,
      name: "Counselor",
    },

    {
      name: "Quotes",
    },
  ],
};

export default function Quotes() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <QuotesList />
    </>
  );
}
