"use client";

import PencilIcon from "@/components/icons/pencil";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { routes } from "@/config/routes";
import Link from "next/link";
import { GrFormView } from "react-icons/gr";
import { ActionIcon, Tooltip } from "rizzui";

export const getColumns = (
  viewPackages: (discount: any) => void,
  placeId: string,
  branchId: string
) => [
  {
    title: <HeaderCell title="Title English" />,
    dataIndex: "title",
    key: "title",
    width: 50,
    render: (value: { english: string }) => (
      <Text className="font-medium text-gray-700">{value?.english}</Text>
    ),
  },
  {
    title: <HeaderCell title="Promo_Code" />,
    dataIndex: "promo_code",
    key: "promo_code",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Discount" />,
    dataIndex: "discount",
    key: "discount",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Tickets" />,
    dataIndex: "tickets",
    key: "tickets",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Days Left" />,
    dataIndex: "left_days",
    key: "left_days",
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
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => viewPackages(row)}
          >
            <GrFormView size={25} />
          </ActionIcon>
        </Tooltip>
      </div>
    ),
  },
];
