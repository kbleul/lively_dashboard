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

export const getColumns = (
  viewPlan: (plan: any) => void,
  updateHiddenStatus: (planId: string) => Promise<void>,
  isLoading: boolean
) => [
  {
    title: <HeaderCell title="Title" />,
    dataIndex: "name",
    key: "name",
    width: 50,
    render: (value: { english: string }) => (
      <Text className="font-medium text-gray-700">{value?.english}</Text>
    ),
  },
  {
    title: <HeaderCell title="Type" />,
    dataIndex: "type",
    key: "type",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Price" />,
    dataIndex: "price",
    key: "price",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Currency" />,
    dataIndex: "currency",
    key: "currency",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Iteration" />,
    dataIndex: "iteration",
    key: "iteration",
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
          content={() => "Edit Discount"}
          placement="top"
          color="invert"
        >
          <Link href={routes.admin["edit-plan"](row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => "Change active Status"}
          placement="top"
          color="invert"
        >
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => updateHiddenStatus(row.id)}
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
