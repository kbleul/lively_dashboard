"use client";
import { PackageDataType } from "@/types/packages";
import React from "react";
import { Title, Text } from "@/components/ui/text";
import PencilIcon from "@/components/icons/pencil";
import { Badge } from "@/components/ui/badge";
import { useModal } from "../../modal-views/use-modal";
import UpdatePackageForm from "./update-package-form";
import UpdatePackageCategoryForm from "./updated-branch-category";
interface Props {
  data: PackageDataType;
  branchId: string;
}
const PackageListCard = ({ data, branchId }: Props) => {
  const { openModal } = useModal();
  return (
    <div className="bg-white dark:bg-black shadow-xl p-5 md:p-10 rounded-xl flex flex-col items-start space-y-3 w-full">
      <div className="flex items-center gap-2">
        <Title as="h4">{data?.category}</Title>
        <PencilIcon
          onClick={() =>
            openModal({
              view: (
                <UpdatePackageCategoryForm
                  id={data.packages[0].id}
                  cat={data?.category}
                  branchId={branchId}
                />
              ),
              customSize: "550px",
            })
          }
          className="h-6 w-6 cursor-pointer"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-5 w-full">
        {data?.packages?.map((item) => (
          <div
            className="rounded-xl border-2 border-primary p-3 flex flex-col space-y-2 w-full"
            key={item.id}
          >
            <div className="flex items-center justify-end gap-3">
              <PencilIcon
                onClick={() =>
                  openModal({
                    view: (
                      <UpdatePackageForm
                        id={item.id}
                        item={{
                          title: item.title.english,
                          description: item.description.english,
                          package_type_id: item.package_type_id,
                          enrollment_type: item.enrollment_type,
                          startTime:
                            item.duration && item.duration !== ""
                              ? item.duration.split("-")[0]
                              : "",
                          endTime:
                            item.duration && item.duration !== ""
                              ? item.duration.split("-")[1]
                              : "",
                          price: item.price.toString(),
                          frequency: item.frequency,
                          frequency_type: item.frequency_type,
                        }}
                      />
                    ),
                    customSize: "850px",
                  })
                }
                className="h-5 w-5 cursor-pointer"
              />
              <Badge color="primary" className="b bg-opacity-30">
                {item.frequency}
              </Badge>
            </div>
            <Title as="h6" className="line-clamp-1">
              {item.title?.english}
            </Title>
            <Text as="p">{item.duration}</Text>
            <div></div>
            <div className="flex items-center justify-between  border-t border-primary">
              <Title as="h6">Price</Title>
              <Text as="strong">{item.price} Birr</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageListCard;
