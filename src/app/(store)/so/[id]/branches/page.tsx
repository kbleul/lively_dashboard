import React from "react";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import BrancheList from "@/app/shared/so/branch-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const Branches = ({ params }: { params: { id: string } }) => {
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
