"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import PencilIcon from "@/components/icons/pencil";

import { GrFormView } from "react-icons/gr";
import { FaTimes } from "react-icons/fa";
import ReusabelPopover from "@/components/reusabel-popover";
import Link from "next/link";
import { routes } from "@/config/routes";

type Columns = {
  deleteManager: (id: string) => void;
  params: {
    branchId: string;
    placeId: string;
  };
};

export const getColumns = ({ deleteManager, params }: Columns) => [
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
    title: <HeaderCell title="Last ame" />,
    dataIndex: "last_name",
    key: "last_name",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="username" />,
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
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 50,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => "Edit"}
          placement="top"
          color="invert"
        >
          <Link
            href={`${routes.storeOwner.branch["edit-manager"](
              params.placeId,
              params.branchId,
              row.id
            )}`}
          >
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
        <ReusabelPopover
          title={`Delete Product`}
          icon={<FaTimes className="h-4 w-4" />}
          description={`Are you sure you want to Delete this #${row.id} Product?`}
          onDelete={() => deleteManager(row.id)}
        />
      </div>
    ),
  },
];
