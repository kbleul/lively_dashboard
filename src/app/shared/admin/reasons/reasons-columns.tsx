"use client";

import PencilIcon from "@/components/icons/pencil";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { ClipLoader } from "react-spinners";
import { ActionIcon, Tooltip } from "rizzui";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { truncateAmharicText } from "@/utils/trim-text";
import { RiDeleteBinLine } from "react-icons/ri";

export const getColumns = (
  onEditItem: (reasonId: string) => void,
  onDeleteItem: (reasonId: string) => Promise<void>,
  isLoading: boolean
) => [
  {
    title: <HeaderCell title="Report Reason" />,
    dataIndex: "reason",
    key: "reason",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">
        {truncateAmharicText(value, 70)}
      </Text>
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
          content={() => "View & Edit reason"}
          placement="top"
          color="invert"
        >
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => !isLoading && onEditItem(row.id)}
          >
            <PencilIcon className="h-4 w-4 " />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => "Delete report reason"}
          placement="top"
          color="invert"
        >
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => onDeleteItem(row.id)}
          >
            {isLoading ? (
              <ClipLoader color="#000" size={10} />
            ) : (
              <RiDeleteBinLine className="text-red-400 h-4 w-4" />
            )}
          </ActionIcon>
        </Tooltip>
      </div>
    ),
  },
];
