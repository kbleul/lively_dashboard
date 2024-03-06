"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";

import { GrFormView } from "react-icons/gr";
import Link from "next/link";
import { routes } from "@/config/routes";

export const getColumns = () => [
  {
    title: <HeaderCell title="First name" />,
    dataIndex: "first_name",
    key: "first_name",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Last name" />,
    dataIndex: "last_name",
    key: "last_name",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Username" />,
    dataIndex: "username",
    key: "username",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },

  {
    title: <HeaderCell title="Phone" />,
    dataIndex: "phone",
    key: "phone",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
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
          content={() => "View Packages"}
          placement="top"
          color="invert"
        >
          <Link href={routes.branchManger["view-member"](row.id)}>
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
