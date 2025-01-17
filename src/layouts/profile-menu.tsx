"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { Title, Text } from "@/components/ui/text";
import { routes } from "@/config/routes";
import cn from "@/utils/class-names";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function DropdownMenu() {
  const { data: session } = useSession();
  const role = session?.user.user.roles?.map(
    (item: { name: string }) => item.name
  );

  const menuItems = [
    {
      name: "My Profile",
      href: role?.includes("Expert")
        ? routes.expert.profile
        : "routes.operationalManager.profile",
    },

    {
      name: "Activity Log",
      href: "#",
    },
  ];

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp"
          name="Albert Flores"
          color="invert"
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold whitespace-nowrap">
            {session?.user.user.first_name + " " + session?.user.user.last_name}
          </Title>
          <Text className="text-gray-600">{session?.user.user.phone}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={() => signOut({ callbackUrl: "http://localhost:5000/ss" })}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <DropdownMenu />}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <button
        className={cn(
          "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10",
          buttonClassName
        )}
      >
        {session && (
          <Avatar
            src={
              session?.user?.user?.profile_image ??
              "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp"
            }
            name={session?.user?.user.username}
            className={cn("!h-9 w-9 sm:!h-10 sm:w-10", avatarClassName)}
          />
        )}
      </button>
    </Popover>
  );
}
