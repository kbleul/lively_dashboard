"use client";
import PageLoader from "@/components/loader/page-loader";
import { routes } from "@/config/routes";
import { Role } from "@/constants/role.enum";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <PageLoader />;

  if (
    session?.user?.user?.roles
      ?.map((item: { name: string }) => item.name)
      .includes(Role.Expert)
  ) {
    return router.push(routes.expert.dashboard);
  }
  if (
    session?.user?.user?.roles
      ?.map((item: { name: string }) => item.name)
      .includes(Role.Operation_Manager)
  ) {
    return router.push(routes.operationalManager.dashboard);
  }
  if (
    session?.user?.user?.roles
      ?.map((item: { name: string }) => item.name)
      .includes(Role.Content_Creator)
  ) {
    return router.push(routes.contentCreator.dashboard);
  }
  if (
    session?.user?.user?.roles
      ?.map((item: { name: string }) => item.name)
      .includes(Role.Store_Owner)
  ) {
    return router.push(routes.storeOwner.home);
  }
  if (
    session?.user?.user?.roles
      ?.map((item: { name: string }) => item.name)
      .includes(Role.Branch_Manager)
  ) {
    return router.push(routes.branchManger.dashboard);
  }

  return <div>Home</div>;
};

export default Home;
