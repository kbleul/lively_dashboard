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
type Columns = {
  onApproveItem: (id: string) => void;
  onRejectItem: (id: string) => void;
};

export const getColumns = ({ onApproveItem, onRejectItem }: Columns) => [
  {
    title: <HeaderCell title="Name" />,
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
    title: <HeaderCell title="expert Name" />,
    dataIndex: "appointable",
    key: "appointable",
    width: 50,
    render: (value: { user: { first_name: string; last_name: string } }) => (
      <Text className="font-medium text-gray-700">
        {value?.user?.first_name + " " + value?.user?.last_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Date" />,
    dataIndex: "date",
    key: "date",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Payment Method" />,
    dataIndex: "method",
    key: "method",
    width: 50,
    render: (value: { bank_name: { english: string } }) => (
      <Text className="font-medium text-gray-700">
        {value?.bank_name?.english}
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
    title: <HeaderCell title="status" />,
    dataIndex: "status",
    key: "status",
    width: 50,
    render: (value: string) => (
      <Badge className="whitespace-nowrap">{value}</Badge>
    ),
  },

  // status
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 50,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        {/* <Tooltip
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
            <FaCheck />
          </ActionIcon>
        </Tooltip> */}

        <ReusabelPopover
          title={`Approve  Appintment`}
          icon={<FaCheck className="h-4 w-4" />}
          description={`Are you sure you want to Approve this #${row.id} Appoitment?`}
          onDelete={() => onApproveItem(row.id)}
        />
        <ReusabelPopover
          title={`Reject  Appintment`}
          icon={<FaTimes className="h-4 w-4" />}
          description={`Are you sure you want to Reject this #${row.id} Appoitment?`}
          onDelete={() => onRejectItem(row.id)}
        />
      </div>
    ),
  },
];
