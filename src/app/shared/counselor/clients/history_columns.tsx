"use client";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { Tooltip } from "@/components/ui/tooltip";
import { ActionIcon } from "@/components/ui/action-icon";
import { Avatar } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { GrFormView } from "react-icons/gr";

export const getColumns = (viewFeedback: (appointmentId: string) => void) => [
  {
    title: <HeaderCell title="Profile" />,
    dataIndex: "user",
    key: "user",
    width: 100,
    render: (value: { profile_image: string; first_name: string }) => (
      <div>
        {!value?.profile_image ||
        value?.profile_image.includes("ui-avatars.com") ? (
          <Avatar
            name={"user profile"}
            src={
              "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
            }
          />
        ) : (
          <Avatar name={value?.first_name} src={value?.profile_image} />
        )}
      </div>
    ),
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: "user",
    key: "user",
    width: 100,
    render: (value: { first_name: string; last_name: string }) => (
      <Text className="font-medium text-gray-700">
        {value?.first_name + " " + value?.last_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="phone number" />,
    dataIndex: "user",
    key: "user",
    width: 100,
    render: (value: { phone: string }) => (
      <Text className="font-medium text-gray-700">+{value?.phone}</Text>
    ),
  },
  {
    title: <HeaderCell title="Booked Date" />,
    dataIndex: "date",
    key: "date",
    width: 100,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Summury" />,
    dataIndex: "has_session_summary",
    key: "has_session_summary",
    width: 100,
    render: (value: string) => (
      <Badge
        className={
          value
            ? "whitespace-nowrap bg-[#00BA63] rounded-md"
            : "whitespace-nowrap bg-[#fca103] rounded-md"
        }
      >
        {value ? "Completed" : "Incompleted"}
      </Badge>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (value: string) => (
      <Badge className="whitespace-nowrap bg-white border border-[#00BA63] text-[#00BA63] rounded-md">
        {value}
      </Badge>
    ),
  },
  {
    title: <HeaderCell title="Feedbacks" />,
    dataIndex: "action",
    key: "action",
    width: 100,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-3 pe-4">
        {!row.has_session_summary && (
          <Tooltip
            size="sm"
            content={() => "View feedback"}
            placement="top"
            color="invert"
          >
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              onClick={() => viewFeedback(row.id)}
              className="hover:text-gray-700"
            >
              <GrFormView size={18} />
            </ActionIcon>
          </Tooltip>
        )}
      </div>
    ),
  },
];
