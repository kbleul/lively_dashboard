"use client";
import { HeaderCell } from "@/components/ui/table";
import { Title, Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { Avatar } from "@/components/ui/avatar";
import DeletePopover from "@/components/delete-popover";
import { FaCheck, FaEdit } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import ReusabelPopover from "@/components/reusabel-popover";
import { AiTwotoneDelete } from "react-icons/ai";
import { ExpertType } from "../experts-list";
import Link from "next/link";
import { routes } from "@/config/routes";
type Columns = {
  onDeleteExpert: (id: string) => void;
  type: ExpertType;
};

export const getColumns = ({ onDeleteExpert, type }: Columns) => [
  {
    title: <HeaderCell title="user Profile" />,
    dataIndex: "user",
    key: "user",
    width: 50,
    render: (value: { profile_image: string; first_name: string }) => (
      <div>
        {value?.profile_image ? (
          <Avatar name={value?.first_name} src={value?.profile_image} />
        ) : (
          <Avatar
            name={"user profile"}
            src={
              "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            }
          />
        )}
      </div>
    ),
  },
  {
    title: <HeaderCell title="Full name" />,
    dataIndex: "user",
    key: "user",
    width: 50,
    render: (value: { first_name: string; last_name: string }) => (
      <Text className="font-medium text-gray-700">
        {value?.first_name + " " + value?.last_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="phone number" />,
    dataIndex: "user",
    key: "user",
    width: 50,
    render: (value: { phone: string }) => (
      <Text className="font-medium text-gray-700">{value?.phone}</Text>
    ),
  },
  {
    title: <HeaderCell title="occupation" />,
    dataIndex: "occupation",
    key: "occupation",
    width: 50,
    render: (value: { name: { english: string } }) => (
      <Text className="font-medium text-gray-700">{value?.name?.english}</Text>
    ),
  },
  {
    title: <HeaderCell title="city" />,
    dataIndex: "city",
    key: "city",
    width: 50,
    render: (value: { name: { english: string } }) => (
      <Text className="font-medium text-gray-700">{value?.name?.english}</Text>
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
          <Link href={routes.counselor["edit-expert"](row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <FaEdit />
            </ActionIcon>
          </Link>
        </Tooltip>
        <ReusabelPopover
          title={`Delete Expert`}
          icon={<AiTwotoneDelete className="h-4 w-4" />}
          description={`Are you sure you want to Delete this  Expert?`}
          onDelete={() => onDeleteExpert(row.id)}
        />
      </div>
    ),
  },
];
