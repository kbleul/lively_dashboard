import React from "react";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { routes } from "@/config/routes";
import ExpertProfile from "@/app/shared/expert/profile";
export const metadata = {
  ...metaObject("Profile Settings"),
};

const pageHeader = {
  title: "Profile Settings",
  breadcrumb: [
    {
      href: routes.expert.dashboard,
      name: "Expert",
    },

    {
      name: "Profile",
    },
  ],
};
const Profile = () => {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <ExpertProfile />
    </>
  );
};

export default Profile;
