import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PackageList from "@/app/shared/so/packages/package-list";

export const metadata = {
  ...metaObject("Packages"),
};

const pageHeader = {
  title: "Store Owner",
  breadcrumb: [
    {
      href: routes.branchManger.dashboard,
      name: "Store Owner",
    },
    {
      name: "Packages",
    },
  ],
};
interface Props {
  params: {
    id: string;
    branchId: string;
  };
}
const CreateProduct = ({ params }: Props) => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.storeOwner.branch.createPackage(
            params.id,
            params.branchId
          )}
        >
          <Button color="primary" size="lg">
            Create Package
          </Button>
        </Link>
      </PageHeader>
      <PackageList branchId={params.branchId} />
    </>
  );
};

export default CreateProduct;
