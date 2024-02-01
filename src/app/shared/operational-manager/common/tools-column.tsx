"use client";
import { HeaderCell } from "@/components/ui/table";
import { Title, Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import PencilIcon from "@/components/icons/pencil";
import DeletePopover from "@/components/delete-popover";

type Columns = {
  onDeleteItem: (id: string) => void;
  onEditItem?: (id: string) => void;
  name: string;
};

export const getColumns = ({ onDeleteItem, onEditItem, name }: Columns) => [
  {
    title: <HeaderCell title="Amharic Name" />,
    dataIndex: "name",
    key: "name",
    width: 50,
    render: (value: { amharic: string }) => (
      <Text className="font-medium text-gray-700">{value.amharic}</Text>
    ),
  },
  {
    title: <HeaderCell title="English Name" />,
    dataIndex: "name",
    key: "name",
    width: 50,
    render: (value: { english: string }) => (
      <Text className="font-medium text-gray-700">{value.english}</Text>
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
          content={() => `Edit ${name}`}
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
          description={`Are you sure you want to delete this #${row.id} ${name}?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
