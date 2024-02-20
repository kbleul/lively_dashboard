"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { GrFormView } from "react-icons/gr";

import { FaCheck } from "react-icons/fa6";

import { ActionIcon, Tooltip } from "rizzui";
import ReusabelPopover from "@/components/reusabel-popover";
import { FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export const getColumns = (
  viewSubscription: (discount: any) => void,
  onApproveSubscription: (discountId: string) => void,
  onRejectSubscription: (discountId: string) => void,
  isLoading: boolean
) => [
  {
    title: <HeaderCell title="User" />,
    dataIndex: "user",
    key: "user",
    width: 50,
    render: (value: { first_name: string; last_name: string }) => (
      <Text className="font-medium text-gray-700">
        {value?.first_name + " " + value?.last_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: "user",
    key: "user",
    width: 50,
    render: (value: { phone: string }) => (
      <Text className="font-medium text-gray-700">{value?.phone}</Text>
    ),
  },
  {
    title: <HeaderCell title="Plan" />,
    dataIndex: "plan",
    key: "plan",
    width: 50,
    render: (value: { name: { english: string } }) => (
      <Text className="font-medium text-gray-700">{value?.name?.english}</Text>
    ),
  },
  {
    title: <HeaderCell title="Price" />,
    dataIndex: "plan",
    key: "plan",
    width: 50,
    render: (value: { price: string }) => (
      <Text className="font-medium text-gray-700">{value.price}</Text>
    ),
  },
  {
    title: <HeaderCell title="Type" />,
    dataIndex: "plan",
    key: "plan",
    width: 50,
    render: (value: { type: string }) => (
      <Text className="font-medium text-gray-700">{value.type}</Text>
    ),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 50,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <div className="mr-4">
          <Tooltip
            size="sm"
            content={() => "View request"}
            placement="top"
            color="invert"
          >
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
              onClick={() => viewSubscription(row)}
            >
              <GrFormView size={25} />
            </ActionIcon>
          </Tooltip>
        </div>

        <ReusabelPopover
          title={`Reject  Subscription`}
          icon={
            isLoading ? (
              <ClipLoader color="#000" size={10} />
            ) : (
              <FaTimes className="h-4 w-4" />
            )
          }
          description={`Are you sure you want to reject this subscription?`}
          onDelete={() => onRejectSubscription(row.id)}
        />
        <ReusabelPopover
          title={`Approve  Subscription`}
          icon={
            isLoading ? (
              <ClipLoader color="#000" size={10} />
            ) : (
              <FaCheck className="h-4 w-4" />
            )
          }
          description={`Are you sure you want to approve this subscription?`}
          onDelete={() => onApproveSubscription(row.id)}
        />
      </div>
    ),
  },
];
