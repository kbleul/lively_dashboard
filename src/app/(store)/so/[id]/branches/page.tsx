import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import BrancheList from "@/app/shared/so/branch-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Branches = ({ params }: { params: { id: string } }) => {
  const pageHeader = {
    title: "Store Owner",
    breadcrumb: [
      {
        href: routes.storeOwner.dashboard(params.id),
        name: "Store Owner",
      },
      {
        name: "List",
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Button color="primary">
          <Link href={routes.storeOwner["create-branch"](params.id)}>
            Add Branch
          </Link>
        </Button>
      </PageHeader>
      <BrancheList id={params.id} />
    </>
  );
};

export default Branches;
