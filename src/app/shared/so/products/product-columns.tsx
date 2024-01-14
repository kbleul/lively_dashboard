"use client";
import { HeaderCell } from "@/components/ui/table";
import { Title, Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import PencilIcon from "@/components/icons/pencil";
import DeletePopover from "@/components/delete-popover";
import { Badge } from "@/components/ui/badge";
import Placeholder from "@public/Placeholder.png";
import Image from "next/image";

type Columns = {
  onDeleteItem: (id: string) => void;
  onEditItem?: (id: string) => void;
};

export const getColumns = ({ onDeleteItem, onEditItem }: Columns) => [
  {
    title: <HeaderCell title="Image" />,
    dataIndex: "product_variant",
    key: "product_variant",
    width: 50,
    render: (value: { product_image: { url: string } }) => (
      <Image
        src={value?.product_image?.url ?? Placeholder}
        alt="Icon"
        height={60}
        width={60}
        className="object-cover"
      />
    ),
  },
  {
    title: <HeaderCell title="Name English" />,
    dataIndex: "product_variant",
    key: "product_variant",
    width: 50,
    render: (value: { product: { title: { english: string } } }) => (
      <Text className="font-medium text-gray-700 line-clamp-1">
        {value?.product?.title?.english}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Variant Type" />,
    dataIndex: "product_variant",
    key: "product_variant",
    width: 50,
    render: (value: { product: { variant_type: string } }) => (
      <Badge color="primary">{value?.product?.variant_type}</Badge>
    ),
  },
  {
    title: <HeaderCell title="value" />,
    dataIndex: "product_variant",
    key: "product_variant",
    width: 50,
    render: (value: { value: { english: string } }) => (
      <Text className="font-medium text-gray-700 line-clamp-1">
        {value?.value?.english}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="price" />,
    dataIndex: "price",
    key: "price",
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
          content={() => `Edit Service`}
          placement="top"
          color="invert"
        >
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => onEditItem && onEditItem(row.id)}
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={`Delete the ${name}`}
          description={`Are you sure you want to delete this Service?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
