"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import PencilIcon from "@/components/icons/pencil";

import { GrFormView } from "react-icons/gr";
import { FaTimes } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import ReusabelPopover from "@/components/reusabel-popover";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/config/routes";
import { truncateAmharicText } from "@/utils/trim-text";

type Columns = {
  deleteProduct: (id: string) => void;
};

export const getColumns = ({ deleteProduct }: Columns) => [
  {
    title: <HeaderCell title="Logo" />,
    dataIndex: "place_logo",
    key: "place_logo",
    width: 50,
    render: (value: { url: string }) => (
      <div>
        <Image
          src={value?.url}
          alt={""}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Name English" />,
    dataIndex: "name",
    key: "name",
    width: 50,
    render: (value: { english: string }) => (
      <Text className="font-medium text-gray-700">{value?.english}</Text>
    ),
  },
  {
    title: <HeaderCell title="Name Amharic" />,
    dataIndex: "name",
    key: "name",
    width: 50,
    render: (value: { amharic: string }) => (
      <Text className="font-medium text-gray-700">{value?.amharic}</Text>
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
          content={() => "View"}
          placement="top"
          color="invert"
        >
          <Link href={`${routes.operationalManager.places.view(row.id)}`}>
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
        <Tooltip
          size="sm"
          content={() => "Edit"}
          placement="top"
          color="invert"
        >
          <Link href={`${routes.operationalManager.places.edit(row.id)}`}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <PencilIcon />
            </ActionIcon>
          </Link>
        </Tooltip>
        <ReusabelPopover
          title={`Delete Product`}
          icon={<FaTimes className="h-4 w-4" />}
          description={`Are you sure you want to Delte this #${row.id} Product?`}
          onDelete={() => deleteProduct(row.id)}
        />
      </div>
    ),
  },
];
