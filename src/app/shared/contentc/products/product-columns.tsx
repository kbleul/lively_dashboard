"use client";
import { HeaderCell } from "@/components/ui/table";
import { Title, Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import PencilIcon from "@/components/icons/pencil";
import { Avatar } from "@/components/ui/avatar";
import DeletePopover from "@/components/delete-popover";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import ReusabelPopover from "@/components/reusabel-popover";
import Image from "next/image";
type Columns = {
  deleteProduct: (id: string) => void;
};

export const getColumns = ({ deleteProduct }: Columns) => [
  {
    title: <HeaderCell title="Product Image" />,
    dataIndex: "user",
    key: "user",
    width: 50,
    render: (value: { profile_image: string; first_name: string }) => (
      <div>
        {/* <Image
          src={value?.profile_image}
          alt={value?.first_name}
          width={40}
          height={40}
          className="rounded-full"
        /> */}
      </div>
    ),
  },
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
    title: <HeaderCell title="Title Amharic" />,
    dataIndex: "title",
    key: "title",
    width: 50,
    render: (value: { amharic: string }) => (
      <Text className="font-medium text-gray-700">{value?.amharic}</Text>
    ),
  },
  {
    title: <HeaderCell title="description English" />,
    dataIndex: "description",
    key: "description",
    width: 50,
    render: (value: { english: string }) => (
      <Text className="font-medium text-gray-700">{value?.english}</Text>
    ),
  },
  {
    title: <HeaderCell title="description Amharic" />,
    dataIndex: "description",
    key: "description",
    width: 50,
    render: (value: { amharic: string }) => (
      <Text className="font-medium text-gray-700">{value?.amharic}</Text>
    ),
  },
  {
    title: <HeaderCell title="variant type" />,
    dataIndex: "variant_type",
    key: "variant_type",
    width: 50,
    render: (value: string) => (
      <Badge className="whitespace-nowrap">{value}</Badge>
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
          content={() => "Approve Appintment"}
          placement="top"
          color="invert"
        >
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
          >
            <PencilIcon />
          </ActionIcon>
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
