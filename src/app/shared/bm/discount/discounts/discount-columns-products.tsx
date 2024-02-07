"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

import { Badge } from "rizzui";

type Columns = {
  deleteProduct: (id: string) => void;
};

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
  // {
  //   // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
  //   title: <HeaderCell title="Actions" className="opacity-0" />,
  //   dataIndex: "action",
  //   key: "action",
  //   width: 50,
  //   render: (_: string, row: any) => (
  //     <div className="flex items-center justify-end gap-3 pe-4">
  //       <Tooltip
  //         size="sm"
  //         content={() => "Edit"}
  //         placement="top"
  //         color="invert"
  //       >
  //         <Link href={`#`}>
  //           <ActionIcon
  //             tag="span"
  //             size="sm"
  //             variant="outline"
  //             className="hover:text-gray-700"
  //           >
  //             <PencilIcon />
  //           </ActionIcon>
  //         </Link>
  //       </Tooltip>
  //     </div>
  //   ),
  // },
];
