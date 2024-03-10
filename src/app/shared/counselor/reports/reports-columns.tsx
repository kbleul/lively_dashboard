"use client";

import { GrFormView } from "react-icons/gr";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { ActionIcon, Tooltip } from "rizzui";
import { truncateAmharicText } from "@/utils/trim-text";

export const getColumns = (onViewItem: (reasonId: any) => void) => [
  {
    title: <HeaderCell title="Client Id" />,
    dataIndex: "unique_code",
    key: "unique_code",
    width: 50,
    render: (unique_code: string) => (
      <Text className="font-medium text-gray-700">{unique_code}</Text>
    ),
  },
  {
    title: <HeaderCell title="Expert Name" />,
    dataIndex: "reportable",
    key: "reportable",
    width: 50,
    render: (reportable: {
      user: { first_name: string; last_name: string };
    }) => (
      <Text className="font-medium text-gray-700">
        {reportable.user.first_name + " " + reportable.user.last_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Report" />,
    dataIndex: "reason",
    key: "reason",
    width: 50,
    render: (reason: string) => (
      <Text className="font-medium text-gray-700">
        {truncateAmharicText(reason, 25)}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Created At" />,
    dataIndex: "reportable",
    key: "reportable",
    width: 50,
    render: (reportable: { created_at: string }) => (
      <Text className="font-medium text-gray-700">{reportable.created_at}</Text>
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
          content={() => "View"}
          placement="top"
          color="invert"
        >
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => onViewItem(row)}
          >
            <GrFormView className="h-4 w-4 " />
          </ActionIcon>
        </Tooltip>
      </div>
    ),
  },
];
