"use client";

import PencilIcon from "@/components/icons/pencil";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { routes } from "@/config/routes";
import Link from "next/link";
import { GrFormView } from "react-icons/gr";
import { ClipLoader } from "react-spinners";
import { ActionIcon, Tooltip } from "rizzui";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { truncateAmharicText } from "@/utils/trim-text";

export const getColumns = (
  viewPlan: (reason: any) => void,
  onEditItem: (reasonId: string) => void,
  updateHiddenStatus: (planId: string) => Promise<void>,
  isLoading: boolean
) => [
  {
    title: <HeaderCell title="Report Reason" />,
    dataIndex: "reason",
    key: "reason",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">
        {truncateAmharicText(value, 50)}
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
        {/* <Tooltip
          size="sm"
          content={() => "View Plan"}
          placement="top"
          color="invert"
        >
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => viewPlan(row)}
          >
            <GrFormView size={25} />
          </ActionIcon>
        </Tooltip> */}
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
            onClick={() => onEditItem(row.id)}
          >
            <PencilIcon className="h-4 w-4" />
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
          >
            {isLoading ? (
              <ClipLoader color="#000" size={10} />
            ) : (
              <>
                {row.active ? (
                  <FaToggleOff size={20} />
                ) : (
                  <FaToggleOn size={20} className="text-green-400" />
                )}
              </>
            )}
          </ActionIcon>
        </Tooltip>
      </div>
    ),
  },
];
