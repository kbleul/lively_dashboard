"use client";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { Badge } from "@/components/ui/badge";

export const getColumns = () => [
  {
    title: <HeaderCell title="Name" />,
    dataIndex: "user",
    key: "user",
    render: (value: { first_name: string; last_name: string }) => (
      <Text className="font-medium text-gray-700">
        {value?.first_name + " " + value?.last_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Service" />,
    dataIndex: "bookingable",
    key: "bookingable",
    render: (value: {
      service: { name: { english: string; amharic: string } };
    }) => (
      <Text className="font-medium text-gray-700">
        {value?.service?.name?.english}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Date" />,
    dataIndex: "date",
    key: "date",
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Payment Method" />,
    dataIndex: "method",
    key: "method",
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
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="status" />,
    dataIndex: "status",
    key: "status",
    render: (value: string) => (
      <Badge className="whitespace-nowrap">{value}</Badge>
    ),
  },
];
