import BoxLoader from "@/components/loader/box-loader";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import React from "react";

const StoreiInfo = ({ placeId }: { placeId: string }) => {
  const headers = useGetHeaders({ type: "Json" });

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

  return <div></div>;
};

export default StoreiInfo;
