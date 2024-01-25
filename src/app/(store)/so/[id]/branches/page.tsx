import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import BrancheList from "@/app/shared/so/branch-list";
import { Button } from "@/components/ui/button";

const pageHeader = {
  title: "Store Owner",
  breadcrumb: [
    {
      href: routes.branchManger.dashboard,
      name: "Store Owner",
    },
    {
      name: "List",
    },
  ],
};

const Product = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Button color="primary">Add Branch</Button>
      </PageHeader>
      <BrancheList id={params.id} />
    </>
  );
};

export default Product;
