import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ProductList from "@/app/shared/bm/products/product-list";

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
      name: "Products",
    },
  ],
};

const Product = () => {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <ProductList />
    </>
  );
};

export default Product;
