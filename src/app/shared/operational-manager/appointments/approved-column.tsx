"use client";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const getColumns = () => [
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
    title: <HeaderCell title="price" />,
    dataIndex: "price",
    key: "price",
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
        {value?.user &&
          value?.user?.first_name &&
          value?.user?.last_name &&
          value?.user?.first_name + " " + value?.user?.last_name}
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
];
