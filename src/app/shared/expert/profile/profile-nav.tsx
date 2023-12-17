import cn from "@/utils/class-names";
import SimpleBar from "@/components/ui/simplebar";
import BasicInfoForm from "./basic-info";
import MoreInfoForm from "./more-info";
import BillingInfoForm from "./billing-info";
import ChangePasswordForm from "./chnage-password";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@/components/ui/tabs";

interface ProfileNavProps {
  className?: string;
}

export default function ProfileNav({ className }: ProfileNavProps) {
  return (
    <div
      className={cn(
        "sticky top-[68px] z-20 border-b border-gray-300 bg-white py-0 font-medium text-gray-500 @2xl:top-[72px] dark:bg-gray-50 2xl:top-20",
        className
      )}
    >
      <Tabs defaultIndex={1}>
        <SimpleBar>
          <TabList className="flex w-full  justify-start space-x-8 border-b border-b-gray-300">
            <Tab
              className={({ selected }) =>
                cn(
                  "relative  py-2 text-sm outline-none w-full",
                  selected
                    ? "font-medium text-gray-900"
                    : "text-gray-500 hover:text-gray-800"
                )
              }
            >
              {({ selected }) => (
                <>
                  <p className="whitespace-nowrap">Basic Information</p>
                  <span
                    className={cn(
                      "absolute left-0 -bottom-px h-0.5 w-full",
                      selected ? "bg-gray-900" : "bg-transparent"
                    )}
                  />
                </>
              )}
            </Tab>
            <Tab
              className={({ selected }) =>
                cn(
                  "relative w-full py-2 text-sm outline-none",
                  selected
                    ? "font-medium text-gray-900"
                    : "text-gray-500 hover:text-gray-800"
                )
              }
            >
              {({ selected }) => (
                <>
                  <p className="whitespace-nowrap">More Information</p>
                  <span
                    className={cn(
                      "absolute left-0 -bottom-px h-0.5 w-full",
                      selected ? "bg-gray-900" : "bg-transparent"
                    )}
                  />
                </>
              )}
            </Tab>
            <Tab
              className={({ selected }) =>
                cn(
                  "relative w-full py-2 text-sm outline-none",
                  selected
                    ? "font-medium text-gray-900"
                    : "text-gray-500 hover:text-gray-800"
                )
              }
            >
              {({ selected }) => (
                <>
                  <p className="whitespace-nowrap">Billing Info</p>
                  <span
                    className={cn(
                      "absolute left-0 -bottom-px h-0.5 w-full",
                      selected ? "bg-gray-900" : "bg-transparent"
                    )}
                  />
                </>
              )}
            </Tab>
            <Tab
              className={({ selected }) =>
                cn(
                  "relative w-full py-2 text-sm outline-none",
                  selected
                    ? "font-medium text-gray-900"
                    : "text-gray-500 hover:text-gray-800"
                )
              }
            >
              {({ selected }) => (
                <>
                  <p className="whitespace-nowrap">Change Password</p>
                  <span
                    className={cn(
                      "absolute left-0 -bottom-px h-0.5 w-full",
                      selected ? "bg-gray-900" : "bg-transparent"
                    )}
                  />
                </>
              )}
            </Tab>
          </TabList>
        </SimpleBar>

        <TabPanels className="mt-2">
          <TabPanel className="py-2 text-sm leading-6 text-gray-600">
            <BasicInfoForm />
          </TabPanel>
          <TabPanel className="py-2 text-sm leading-6 text-gray-600">
            <MoreInfoForm />
          </TabPanel>
          <TabPanel className="py-2 text-sm leading-6 text-gray-600">
            <BillingInfoForm  />
          </TabPanel>
          <TabPanel className="py-2 text-sm leading-6 text-gray-600">
            <ChangePasswordForm  />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
