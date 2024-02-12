"use client";

import Link from "next/link";

import HamburgerButton from "@/layouts/hamburger-button";
import StoreSidebar from "@/layouts/store-sidebar";
import Sidebar from "@/layouts/sidebar";

import { Badge } from "@/components/ui/badge";
import cn from "@/utils/class-names";
import Logo from "@/components/logo";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import ProfileMenu from "./profile-menu";
import SettingsButton from "@/components/settings/settings-button";
import { usePathname } from "next/navigation";
import StoreRoleInfo from "./StoreRoleInfo";
// import SettingsButton from '@/components/settings/settings-button';

function HeaderMenuRight() {
  return (
    <div className=" ms-auto grid shrink-0 grid-cols-2 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <SettingsButton />
      <ProfileMenu />
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();

  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex flex-col items-center bg-gray-0/80 px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 2xl:py-5 3xl:px-8 4xl:px-10",
        ((isMounted && windowScroll.y) as number) > 2 ? "card-shadow" : ""
      )}
    >
      <article className="w-full flex ">
        <div className="flex  w-full max-w-2xl items-center">
          {pathname.split("/")[1].includes("so") && (
            <StoreRoleInfo className="w-full hidden md:block px-4 md:px-6 py-2 rounded-md bg-yellow-100 " />
          )}
          <div className="flex items-center">
            <HamburgerButton
              view={
                pathname.split("/")[1].includes("so") ? (
                  <StoreSidebar className="static w-full 2xl:w-full" />
                ) : (
                  <Sidebar className="static w-full 2xl:w-full" />
                )
              }
            />

            <Link href={"/"} aria-label="Site Logo">
              <Logo className="w-full me-4 h-7 shrink-0 lg:me-5 xl:hidden" />
            </Link>
          </div>
        </div>

        <HeaderMenuRight />
      </article>

      {pathname.split("/")[1].includes("so") && (
        <StoreRoleInfo className="w-full  mt-3 md:mt-0 md:hidden px-4 md:px-6 py-2 rounded-md bg-yellow-100 " />
      )}
    </header>
  );
}
