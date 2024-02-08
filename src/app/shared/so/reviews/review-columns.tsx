"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { FaStar } from "react-icons/fa6";

export const getColumns = () => [
  {
    title: <HeaderCell title="User" />,
    dataIndex: "user",
    key: "user",
    width: 50,
    render: (value: { first_name: string; last_name: string }) => (
      <Text className="font-medium text-gray-700">
        {value.first_name + " " + value.last_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Username" />,
    dataIndex: "user",
    key: "user",
    width: 50,
    render: (value: { username: string }) => (
      <Text className="font-medium text-gray-700">{value.username}</Text>
    ),
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: "user",
    key: "user",
    width: 50,
    render: (value: { phone: string }) => (
      <Text className="font-medium text-gray-700">{value.phone}</Text>
    ),
  },
  {
    title: <HeaderCell title="Rating" />,
    dataIndex: "rating",
    key: "rating",
    width: 50,
    render: (value: string) => (
      <div className="flex justify-start items-center gap-2 w-full">
        {Array.from({ length: parseInt(value) }).map((_, index) => (
          <FaStar key={index + "-ratings-"} color="black" />
        ))}
      </div>
    ),
  },
  {
    title: <HeaderCell title="Review" />,
    dataIndex: "review",
    key: "review",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value ? value : ""}</Text>
    ),
  },
];
