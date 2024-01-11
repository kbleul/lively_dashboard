"use client";
import React from "react";
import cn from "@/utils/class-names";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@/components/ui/tabs";
import { EditType } from "./edit-product-form";
interface Props {
  setActiveTab: React.Dispatch<React.SetStateAction<EditType>>;
  activeTab: EditType;
}
const ProductEditTab = ({ setActiveTab, activeTab }: Props) => {
  return (
    <div className="pb-5">
      <Tabs defaultIndex={activeTab === EditType.Product ? 0 : 1}>
        <TabList className="flex w-full  justify-start space-x-8 border-b border-b-gray-300">
          <Tab
            className={({ selected }) =>
              cn(
                "relative w-fit py-2 text-sm outline-none",
                selected
                  ? "font-medium text-primary"
                  : "text-gray-500 hover:text-gray-800"
              )
            }
            onClick={() => setActiveTab(EditType.Product)}
          >
            {({ selected }) => (
              <>
                <p className="whitespace-nowrap">Product Detail</p>
                <span
                  className={cn(
                    "absolute left-0 -bottom-px h-0.5 w-full",
                    selected ? "bg-primary" : "bg-transparent"
                  )}
                />
              </>
            )}
          </Tab>
          <Tab
            className={({ selected }) =>
              cn(
                "relative w-fit py-2 text-sm outline-none",
                selected
                  ? "font-medium text-primary"
                  : "text-gray-500 hover:text-gray-800"
              )
            }
            onClick={() => setActiveTab(EditType.Variant)}
          >
            {({ selected }) => (
              <>
                <p className="whitespace-nowrap">Vriants</p>
                <span
                  className={cn(
                    "absolute left-0 -bottom-px h-0.5 w-full",
                    selected ? "bg-primary" : "bg-transparent"
                  )}
                />
              </>
            )}
          </Tab>
        </TabList>
      </Tabs>
    </div>
  );
};

export default ProductEditTab;
