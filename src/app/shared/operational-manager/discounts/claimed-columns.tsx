"use client";

import { HeaderCell } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { convertDateTimeFormate } from "@/utils/time_manuplation";
import { FaCheck } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import { ClipLoader } from "react-spinners";

import { ActionIcon, Badge, Tooltip } from "rizzui";

export const getColumns = (
  applyClaim: (id: string) => void,
  isLoading: boolean,
  handleView: (id: string) => void
) => [
  {
    title: <HeaderCell title="User Name" />,
    dataIndex: "user",
    key: "user",
    width: 150,
    render: (value: { first_name: string; last_name: string }) => (
      <Text className="font-medium text-gray-700">
        {value?.first_name + " " + value?.last_name}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Promo_Code" />,
    dataIndex: "claimable",
    key: "claimable",
    width: 150,
    render: (place_branch_product: { discount: { promo_code: string } }) => (
      <Text className="font-medium text-gray-700">
        {place_branch_product.discount.promo_code}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Product Name" />,
    dataIndex: "claimable",
    key: "claimable",
    width: 150,
    render: (claimable: {
      place_branch_product: {
        product_variant: { product: { title: { english: string } } };
      };
    }) => (
      <Text className="font-medium text-gray-700">
        {claimable.place_branch_product.product_variant.product.title.english}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Created At" />,
    dataIndex: "claimable",
    key: "claimable",
    width: 150,
    render: (created_at: string) => (
      <Text className="text-sm text-gray-700">
        {convertDateTimeFormate(created_at)}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "applied",
    key: "applied",
    width: 150,
    render: (value: boolean) => (
      <div className="flex items-center justify-start">
        {value ? (
          <Badge color="primary" className="text-black bg-opacity-30 ">
            Applied
          </Badge>
        ) : (
          <p className="text-red-300 font-semibold text-xl text-center  md:pl-6">
            x
          </p>
        )}
      </div>
    ),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "applied",
    key: "applied",
    width: 150,
    render: (value: boolean, row: any) => (
      <>
        <div className="flex items-center justify-start gap-4">
          <Tooltip
            size="sm"
            content={() => "View"}
            placement="top"
            color="invert"
          >
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:text-gray-700"
            >
              <GrFormView size={25} onClick={() => handleView(row.id)} />
            </ActionIcon>
          </Tooltip>

          {!value && (
            <Tooltip
              size="sm"
              content={() => "Apply Claim"}
              placement="top"
              color="invert"
            >
              <ActionIcon
                tag="span"
                size="sm"
                variant="outline"
                className="text-[#008579] hover:text-gray-700 border-[#008579]"
              >
                {isLoading ? (
                  <ClipLoader color="#008579" size={10} />
                ) : (
                  <FaCheck
                    size={16}
                    color="#008579"
                    onClick={() => applyClaim(row.id)}
                  />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </div>
      </>
    ),
  },
];
