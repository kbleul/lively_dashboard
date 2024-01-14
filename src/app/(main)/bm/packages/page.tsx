import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import PackageList from "@/app/shared/bm/packages/package-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  ...metaObject("Dashboard"),
};

const pageHeader = {
  title: "Branch Manager",
  breadcrumb: [
    {
      href: routes.branchManger.dashboard,
      name: "Branch Manager",
    },
    {
      name: "Packages",
    },
  ],
};

const CreateProduct = () => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link href={routes.branchManger.createPackage}>
          <Button color="primary" size="lg">
            Create Package
          </Button>
        </Link>
      </PageHeader>
      <PackageList />
    </>
  );
};

export default CreateProduct;
