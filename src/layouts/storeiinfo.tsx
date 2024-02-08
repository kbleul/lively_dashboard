import BoxLoader from "@/components/loader/box-loader";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { usePathname } from "next/navigation";
import React from "react";

const StoreiInfo = ({ placeId }: { placeId: string }) => {
  const headers = useGetHeaders({ type: "Json" });

  const pathname = usePathname();

  const storInfoeData = useFetchData(
    [queryKeys.getMyStores + placeId],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/my-places`,
    headers
  );

  if (storInfoeData.isLoading || storInfoeData.isFetching) {
    return (
      <div className="">
        <BoxLoader />
      </div>
    );
  }

  const myStore = storInfoeData?.data?.data.find(
    (store: any) => store.id === placeId
  );

  return (
    <>
      {myStore && (
        <article className="w-full mb-6 md:mb-8 px-4 md:px-6 py-4 rounded-2xl bg-yellow-100 ">
          <p className="mb-4 font-semibold text-lg md:text-xl">
            Acting as -{" "}
            <span className="font-medium underline">
              {pathname.split("/").includes("branch")
                ? "Branch Manager"
                : "Store Owner"}
            </span>
          </p>

          <section className="flex flex-col lg:flex-row justify-between mb-4 gap-y-2 items-center">
            <div className="flex w-full gap-1 items-center">
              <p className="font-bold">Store Name: </p>
              <p>{myStore?.name?.english}</p>
            </div>
            <div className="flex w-full gap-1 items-center">
              <p className="font-bold">Phone: </p>
              <p>+{myStore?.phone}</p>
            </div>
            {myStore?.place_types && myStore?.place_types.length > 0 && (
              <div className="flex w-full gap-1 items-center">
                <p className="font-bold">Place Types: </p>
                <p>
                  {myStore?.place_types.map(
                    (type: any, index: number) => ` ${type?.name?.english} `
                  )}
                </p>
              </div>
            )}
          </section>
          <section className="flex flex-col lg:flex-row justify-between items-center gap-y-2 border-t pt-4 lg:pt-0 lg:border-t-0">
            <div className="flex w-full gap-1 items-center">
              <p className="font-bold">Owner: </p>
              <p>
                {myStore?.owner?.first_name + " " + myStore?.owner?.last_name}
              </p>
            </div>
            <div className="flex w-full gap-1 items-center">
              <p className="font-bold">Phone: </p>
              <p>+{myStore?.owner?.phone}</p>
            </div>
            <div className="flex w-full gap-1 items-center">
              <p className="font-bold">Username: </p>
              <p>{myStore?.owner?.username}</p>
            </div>
          </section>
        </article>
      )}
    </>
  );
};

export default StoreiInfo;
