"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

export const getColumns = () => [
  {
    title: <HeaderCell title="Package name" />,
    dataIndex: "bookingable",
    key: "bookingable",
    width: 50,
    render: (value: { title: { english: string } }) => (
      <Text className="font-medium text-gray-700">{value.title.english}</Text>
    ),
  },
  {
    title: <HeaderCell title="Started At" />,
    dataIndex: "created_at",
    key: "created_at",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Service Type" />,
    dataIndex: "bookingable",
    key: "bookingable",
    width: 50,
    render: (value: { service: { name: { english: string } } }) => (
      <div className="w-full flex justify-start pl-2 items-center">
        <Text className="font-medium px-4 md:px-4 text-sm text-gray-700 border border-black text-center py-1 rounded-lg ">
          {value?.service?.name?.english}
        </Text>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Price" />,
    dataIndex: "price",
    key: "price",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">ETB {value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Frequency Type" />,
    dataIndex: "bookingable",
    key: "bookingable",
    width: 50,
    render: (value: { frequency_type: string }) => (
      <Text className="font-medium text-gray-700 text-center">
        {value.frequency_type}
      </Text>
    ),
  },
];
