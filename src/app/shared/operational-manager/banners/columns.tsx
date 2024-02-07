"use client";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { Tooltip } from "rizzui";

import { ActionIcon } from "@/components/ui/action-icon";
import { FaPlusCircle } from "react-icons/fa";

type Columns = {
  onAddBanner: (discountId: string) => void;
};

export const getColumns = ({ onAddBanner }: Columns) => [
  {
    title: <HeaderCell title="Title" />,
    dataIndex: "title",
    key: "title",
    width: 50,
    render: (value: { english: string }) => (
      <Text className="font-medium text-gray-700">{value?.english}</Text>
    ),
  },
  {
    title: <HeaderCell title="Discount" />,
    dataIndex: "discount",
    key: "discount",
    width: 50,
    render: (value: number | string) => (
      <Text className="font-medium text-gray-700">{value}%</Text>
    ),
  },
  {
    title: <HeaderCell title="Remaining Days" />,
    dataIndex: "left_days",
    key: "left_days",
    width: 50,
    render: (value: string | number) => (
      <Text className="font-medium text-gray-700">{value}</Text>
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

  // status
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 50,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => "Add Banner"}
          placement="top"
          color="invert"
        >
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => onAddBanner(row.id)}
          >
            <FaPlusCircle />
          </ActionIcon>
        </Tooltip>
      </div>
    ),
  },
];
