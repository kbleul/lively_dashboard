"use client";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";

import { Badge } from "@/components/ui/badge";
import { GrFormView } from "react-icons/gr";

import { truncateAmharicText } from "@/utils/trim-text";

export const getColumns = () => [
  {
    title: <HeaderCell title="Client" />,
    dataIndex: "user",
    key: "user",
    width: 100,
    render: (user: { first_name: string; last_name: string }) => (
      <Text className="font-medium text-gray-700">
        {user
          ? truncateAmharicText(user.first_name + " " + user.last_name, 15)
          : "-"}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Expert" />,
    dataIndex: "appointable",
    key: "appointable",
    width: 50,
    render: (appointable: {
      user: { first_name: string; last_name: string };
    }) => (
      <Text className="font-medium text-gray-700">
        {appointable.user.first_name + " " + appointable.user.last_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: "appointable",
    key: "appointable",
    width: 50,
    render: (appointable: { user: { phone: string } }) => (
      <Text className="font-medium text-gray-700">
        +{appointable.user.phone}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Date" />,
    dataIndex: "date",
    key: "date",
    width: 50,
    render: (date: string) => (
      <Text className="font-medium text-gray-700">{date}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "status",
    width: 50,
    render: (status: string) => (
      <Badge
        className={
          status === "Pending"
            ? "whitespace-nowrap bg-[#0cad09] rounded-md"
            : status === "Expired"
            ? "whitespace-nowrap bg-black rounded-md"
            : "whitespace-nowrap bg-[#FF9900] rounded-md"
        }
      >
        {status}
      </Badge>
    ),
  },
  {
    title: <HeaderCell title="Session Notes" />,
    dataIndex: "has_session_summary",
    key: "has_session_summary",
    width: 50,
    render: (has_session_summary: boolean) => (
      <Badge
        className={
          has_session_summary
            ? "whitespace-nowrap bg-[#0cad09] rounded-md"
            : "whitespace-nowrap bg-[#FF9900] rounded-md"
        }
      >
        {has_session_summary ? "Included" : "Not included"}
      </Badge>
    ),
  },
  // {
  //   title: <HeaderCell title="Actions" className="opacity-0" />,
  //   dataIndex: "action",
  //   key: "action",
  //   width: 50,
  //   render: (_: string, row: any) => (
  //     <div className="flex items-center justify-center gap-3 ">
  //       <Tooltip
  //         size="sm"
  //         content={() =>
  //           row.has_session_summary
  //             ? "View session notes"
  //             : "Session notes not added"
  //         }
  //         placement="top"
  //         color="invert"
  //       >
  //         <ActionIcon
  //           tag="span"
  //           size="sm"
  //           variant="outline"
  //           className="hover:text-gray-700"
  //           onClick={() => row.has_session_summary && viewNotes(row.id)}
  //         >
  //           <GrFormView
  //             size={24}
  //             color={row.has_session_summary ? "black" : "gray"}
  //           />
  //         </ActionIcon>
  //       </Tooltip>
  //     </div>
  //   ),
  // },
];
