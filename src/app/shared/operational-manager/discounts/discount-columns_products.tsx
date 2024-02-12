"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

import { Badge } from "rizzui";

export const getColumns = () => [
  {
    title: <HeaderCell title="Title English" />,
    dataIndex: "title",
    key: "title",
    width: 50,
    render: (value: { english: string }) => (
      <Text className="font-medium text-gray-700">{value?.english}</Text>
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
  {
    title: <HeaderCell title="Discount" />,
    dataIndex: "discount",
    key: "discount",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Tickets" />,
    dataIndex: "tickets",
    key: "tickets",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Days Left" />,
    dataIndex: "left_days",
    key: "left_days",
    width: 50,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Banner Requested" />,
    dataIndex: "need_banner",
    key: "need_banner",
    width: 50,
    render: (value: boolean) => (
      <div className="flex items-center justify-center">
        {value ? <IoCheckmarkOutline /> : <IoCloseOutline />}
      </div>
    ),
  },
  {
    title: <HeaderCell title="Banner Status" />,
    dataIndex: "banner_image",
    key: "banner_image",
    width: 50,
    render: (value: any) => (
      <div className="flex items-center justify-center">
        {value && value !== "" ? (
          <Badge color="primary" className="text-black bg-opacity-30">
            Added
          </Badge>
        ) : (
          <></>
        )}
      </div>
    ),
  },
];
