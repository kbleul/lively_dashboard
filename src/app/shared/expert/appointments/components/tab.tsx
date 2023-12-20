"use client";
import React from "react";
import cn from "@/utils/class-names";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@/components/ui/tabs";
import { AppointmentType } from "../appointments-list";
interface Props {
  setActiveTab: React.Dispatch<React.SetStateAction<AppointmentType>>;
  activeTab: AppointmentType;
}
const AppintmentListTab = ({ setActiveTab, activeTab }: Props) => {
  const tabs = ["Upcomming", "History"];
  return (
    <div className="pb-5">
      <Tabs defaultIndex={1}>
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
            onClick={() => setActiveTab(AppointmentType.Upcomming)}
          >
            {({ selected }) => (
              <>
                <p className="whitespace-nowrap">Upcomming</p>
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
            onClick={() => setActiveTab(AppointmentType.History)}
          >
            {({ selected }) => (
              <>
                <p className="whitespace-nowrap">History</p>
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

export default AppintmentListTab;
