"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { truncateAmharicText } from "@/utils/trim-text";
import { CiEdit } from "react-icons/ci";
import { GrFormView } from "react-icons/gr";
import { ActionIcon, Tooltip } from "rizzui";

type Columns = {
  handleEdit: (id: string, isView?: boolean) => void;
};

export const getColumns = ({ handleEdit }: Columns) => [
  {
    title: <HeaderCell title="English Prompt" />,
    dataIndex: "title",
    key: "title",
    width: 50,
    render: (value: { english: string }) => (
      <Text className="font-medium text-gray-700">
        {truncateAmharicText(value.english, 20)}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Amharic Prompt" />,
    dataIndex: "title",
    key: "title",
    width: 50,
    render: (value: { amharic: string }) => (
      <Text className="font-medium text-gray-700">
        {truncateAmharicText(value.amharic, 20)}
      </Text>
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
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => handleEdit(row.id)}
          >
            <CiEdit size={25} />
          </ActionIcon>
        </Tooltip>
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
            onClick={() => handleEdit(row.id, true)}
          >
            <GrFormView size={25} />
          </ActionIcon>
        </Tooltip>
      </div>
    ),
  },
];
