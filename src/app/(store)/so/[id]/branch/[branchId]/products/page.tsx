import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ProductList from "@/app/shared/so/products/product-list";

export const metadata = {
  ...metaObject("Dashboard"),
};

const pageHeader = {
  title: "Store Owner",
  breadcrumb: [
    {
      href: routes.branchManger.dashboard,
      name: "Store Owner",
    },
    {
      name: "Products",
    },
  ],
};

interface Props{
    params:{
        id:string,
        branchId:string
    }
}
const Product = ({params}:Props) => {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <ProductList branchId={params.branchId}/>
    </>
  );
};

export default Product;
