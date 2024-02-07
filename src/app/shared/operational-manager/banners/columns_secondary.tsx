"use client";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

export const getColumns = () => [
  {
    title: <HeaderCell title="Title" />,
    dataIndex: "title",
    key: "title",
    width: 50,
    render: (value: { english: string }) => (
      <Text className="font-medium text-gray-700">{value?.english}</Text>
    ),
  },
  {
    title: <HeaderCell title="Discount" />,
    dataIndex: "discount",
    key: "discount",
    width: 50,
    render: (value: number | string) => (
      <Text className="font-medium text-gray-700">{value}%</Text>
    ),
  },
  {
    title: <HeaderCell title="Remaining Days" />,
    dataIndex: "left_days",
    key: "left_days",
    width: 50,
    render: (value: string | number) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Promo_Code" />,
    dataIndex: "promo_code",
    key: "promo_code",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
];
