"use client";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { Avatar } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { GrFormView } from "react-icons/gr";
import { routes } from "@/config/routes";

export const getColumns = () => [
  {
    title: <HeaderCell title="Profile" />,
    dataIndex: "profile_image",
    key: "profile_image",
    width: 50,
    render: (profile_image: string | null) => (
      <div>
        {profile_image &&
        !profile_image.includes("https://ui-avatars.com/api/") ? (
          <Avatar name="profile image" src={profile_image} />
        ) : (
          <Avatar
            name={"user profile"}
            src={
              "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            }
          />
        )}
      </div>
    ),
  },
  {
    title: <HeaderCell title="First Name" />,
    dataIndex: "first_name",
    key: "first_name",
    width: 50,
    render: (first_name: string) => (
      <Text className="font-medium text-gray-700">{first_name}</Text>
    ),
  },
  {
    title: <HeaderCell title="Last Name" />,
    dataIndex: "last_name",
    key: "last_name",
    width: 50,
    render: (last_name: string) => (
      <Text className="font-medium text-gray-700">{}</Text>
    ),
  },
  {
    title: <HeaderCell title="Username" />,
    dataIndex: "username",
    key: "username",
    width: 50,
    render: (username: string) => (
      <Text className="font-medium text-gray-700">{username}</Text>
    ),
  },
  {
    title: <HeaderCell title="Gender" />,
    dataIndex: "gender",
    key: "gender",
    width: 50,
    render: (gender: string) => (
      <Text className="font-medium text-gray-700">{gender}</Text>
    ),
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: "phone",
    key: "phone",
    width: 50,
    render: (phone: string) => (
      <Text className="font-medium text-gray-700">+{phone}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 50,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => "View client detail"}
          placement="top"
          color="invert"
        >
          <Link href={routes.expert["client-detail"](row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <GrFormView size={25} />
            </ActionIcon>
          </Link>
        </Tooltip>
      </div>
    ),
  },
];
