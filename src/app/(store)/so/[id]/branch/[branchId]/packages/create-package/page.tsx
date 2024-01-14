import EditProductForm from "@/app/shared/contentc/products/edit-product/edit-product-form";
import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import CreatePackageForm from "@/app/shared/so/packages/create-package/create-package-form";

export const metadata = {
  ...metaObject("Create Package"),
};

const pageHeader = {
  title: "Store Owner",
  breadcrumb: [
    {
      href: routes.branchManger.dashboard,
      name: "Store Owner",
    },
    {
      href: routes.branchManger.packages,
      name: "Products",
    },
    {
      name: "Add",
    },
  ],
};

interface Props {
    params: {
      id: string;
      branchId: string;
    };
  }
const CreateProduct = ({params}:Props) => {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <CreatePackageForm branchId={params.branchId}/>
    </>
  );
};

export default CreateProduct;
