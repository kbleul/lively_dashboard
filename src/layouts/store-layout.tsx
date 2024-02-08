import Header from "@/layouts/header";
import StoreSidebar from "./store-sidebar";
import StoreiInfo from "./storeiinfo";
export default function StoreLayout({
  children,
  placeId,
}: {
  children: React.ReactNode;
  placeId: string;
}) {
  return (
    <main className="flex min-h-screen flex-grow">
      <StoreSidebar className="fixed hidden dark:bg-gray-50 xl:block" />
      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
        <Header />
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          <StoreiInfo placeId={placeId} />
          {children}
        </div>
      </div>
    </main>
  );
}
