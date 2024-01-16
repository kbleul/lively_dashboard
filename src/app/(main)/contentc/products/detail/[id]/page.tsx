import EditProductForm from "@/app/shared/contentc/products/edit-product/edit-product-form";
import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ProductDetail from "@/app/shared/contentc/products/product-detail";

export const metadata = {
  ...metaObject("Dashboard"),
};

const pageHeader = {
  title: "Content Creator",
  breadcrumb: [
    {
      href: routes.contentCreator.dashboard,
      name: "Content Creator",
    },
    {
      href: routes.contentCreator.product,
      name: "Products",
    },
    {
      name: "Detail",
    },
  ],
};
interface Props {
  params: {
    id: string;
  };
}
const Detail = ({ params }: Props) => {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <ProductDetail id={params.id} />
    </>
  );
};

export default Detail;
