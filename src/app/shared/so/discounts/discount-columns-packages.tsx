"use client";

import PencilIcon from "@/components/icons/pencil";
import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { routes } from "@/config/routes";
import Link from "next/link";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import { ClipLoader } from "react-spinners";
import { ActionIcon, Tooltip } from "rizzui";

export const getColumns = (
  viewPackages: (discount: any) => void,
  placeId: string,
  branchId: string,
  updateHiddenStatus: (discountId: string) => void,
  isLoading: boolean
) => [
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
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 50,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={() => "View Packages"}
          placement="top"
          color="invert"
        >
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => viewPackages(row)}
          >
            <GrFormView size={25} />
          </ActionIcon>
        </Tooltip>

        <Tooltip
          size="sm"
          content={() => "Edit Discount"}
          placement="top"
          color="invert"
        >
          <Link
            href={routes.storeOwner.branch["edit-package-discount"](
              placeId,
              branchId,
              row.id
            )}
          >
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => "Change hidden Status"}
          placement="top"
          color="invert"
        >
          <ActionIcon
            tag="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
            onClick={() => updateHiddenStatus(row.id)}
          >
            {isLoading ? (
              <ClipLoader color="#000" size={10} />
            ) : (
              <>
                {row.is_hidden ? (
                  <FaToggleOff size={20} />
                ) : (
                  <FaToggleOn size={20} className="text-green-400" />
                )}
              </>
            )}
          </ActionIcon>
        </Tooltip>
      </div>
    ),
  },
];
