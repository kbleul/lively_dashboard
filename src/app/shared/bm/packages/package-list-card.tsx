import { PackageDataType } from "@/types/packages";
import React from "react";
import { Title, Text } from "@/components/ui/text";
import PencilIcon from "@/components/icons/pencil";
import { Badge } from "@/components/ui/badge";
interface Props {
  data: PackageDataType;
}
const PackageListCard = ({ data }: Props) => {
  return (
    <div className="bg-white dark:bg-black shadow-xl p-5 md:p-10 rounded-xl flex flex-col items-start space-y-3">
      <div className="flex items-center gap-2">
        <Title as="h4">{data?.category}</Title>
        <PencilIcon className="h-6 w-6 cursor-pointer" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-5">
        {data?.packages?.map((item) => (
          <div
            className="rounded-xl border-2 border-primary p-3 flex flex-col space-y-2"
            key={item.id}
          >
            <div className="flex items-end justify-end">
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
