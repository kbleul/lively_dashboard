import EditProductForm from "@/app/shared/contentc/products/edit-product/edit-product-form";
import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import CreatePackageForm from "@/app/shared/bm/packages/create-package/create-package-form";

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
      href: routes.branchManger.products,
      name: "Products",
    },
    {
      name: "Add",
    },
  ],
};

const CreateProduct = () => {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <CreatePackageForm />
    </>
  );
};

export default CreateProduct;
