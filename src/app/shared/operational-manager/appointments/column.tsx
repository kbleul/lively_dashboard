"use client";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { FaCheck, FaTimes } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import ReusabelPopover from "@/components/reusabel-popover";
type Columns = {
  onApproveItem: (id: string) => void;
  onRejectItem: (id: string) => void;
};

export const getColumns = ({ onApproveItem, onRejectItem }: Columns) => [
  {
    title: <HeaderCell title="first name" />,
    dataIndex: "user",
    key: "user",
    width: 50,
    render: (value: { first_name: string }) => (
      <Text className="font-medium text-gray-700">{value?.first_name}</Text>
    ),
  },
  {
    title: <HeaderCell title="last name" />,
    dataIndex: "user",
    key: "user",
    width: 50,
    render: (value: { last_name: string }) => (
      <Text className="font-medium text-gray-700">{value?.last_name}</Text>
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
    title: <HeaderCell title="date" />,
    dataIndex: "date",
    key: "date",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="payment method" />,
    dataIndex: "payment_method",
    key: "payment_method",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
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
    title: <HeaderCell title="deposited by" />,
    dataIndex: "deposited_by",
    key: "deposited_by",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="reference number" />,
    dataIndex: "reference_number",
    key: "reference_number",
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
    title: <HeaderCell title="expert Phone" />,
    dataIndex: "appointable",
    key: "appointable",
    width: 50,
    render: (value: { user: { phone: string } }) => (
      <Text className="font-medium text-gray-700">{value?.user?.phone}</Text>
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
