"use client";

import { GrFormView } from "react-icons/gr";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { ActionIcon, Tooltip } from "rizzui";
import { truncateAmharicText } from "@/utils/trim-text";
import { CategoriesArr } from "./QuotesList";
import { CiEdit } from "react-icons/ci";

export const getColumns = (
  categoryLink: string,
  onViewItem: (quoteId: any) => void,
  onEditItem: (quoteId: any) => void
) => [
  {
    title: (
      <HeaderCell
        title={categoryLink === CategoriesArr[0] ? "Affirmation" : "Facts"}
      />
    ),
    dataIndex: "author",
    key: "author",
    width: 50,
    render: (author: string) => (
      <Text className="font-medium text-gray-700">
        {truncateAmharicText(author, 25)}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Body" />,
    dataIndex: "body",
    key: "body",
    width: 50,
    render: (body: string) => (
      <Text className="font-medium text-gray-700">
        {truncateAmharicText(body, 25)}
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
          content={() => "Edit"}
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
            onClick={() => onViewItem(row.id)}
          >
            <GrFormView size={24} className="h-4 w-4 " />
          </ActionIcon>
        </Tooltip>
      </div>
    ),
  },
];
