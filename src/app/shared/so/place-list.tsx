"use client";
import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import { StoreDataType } from "@/types/store";
import React from "react";
import Placeholder from "@public/Placeholder.png";
import { Title } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio";
import { AdvancedRadio } from "@/components/ui/advanced-radio";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
const MyStores = () => {
  const router = useRouter();
  const [value, setValue] = React.useState<string>("");
  const headers = useGetHeaders({ type: "Json" });
  const myStoresData = useFetchData(
    [queryKeys.getMyStores],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}store-owner/my-places`,
    headers
  );
  console.log(myStoresData?.data?.data);

  React.useEffect(() => {
    if (myStoresData?.data?.data?.length < 2) {
      router.push(`/so/${myStoresData?.data?.data[0]?.id}`);
    }
  }, []);
  return (
    <div className="max-w-4xl mx-auto w-full flex items-center justify-center min-h-screen">
      {myStoresData.isFetched && myStoresData.isSuccess ? (
        <div className="flex flex-col items-center gap-3 w-full">
          <Title as="h3">Choose Your Store</Title>
          <RadioGroup
            value={value}
            setValue={setValue}
            className="grid grid-cols-2 gap-4 w-full"
          >
            {myStoresData?.data?.data?.length > 1 &&
              myStoresData?.data?.data.map((store: StoreDataType) => (
                <AdvancedRadio
                  key={store.id}
                  name="payment-secondary"
                  value={store.id}
                  className="flex w-full flex-col space-y-2 rounded-xl border border-secondary-lighter p-5 text-sm hover:cursor-pointer hover:border-primary"
                  inputClassName="[&:checked~span>div>.icon]:block [&:checked~span]:ring-1 [&:checked~span]:ring-offset-0 [&:checked~span]:ring-primary [&:checked~span]:!border-primary"
                >
                  <div className="flex justify-between">
                    <FaCheckCircle className="icon hidden h-5 w-5 text-primary" />
                    <span className="font-medium text-black">
                      {store.name.english}
                    </span>
                  </div>
                </AdvancedRadio>
              ))}
          </RadioGroup>
          {value && (
            <Link href={`/so/${value}`}>
              <Button color="primary" size="lg">
                Manage Store
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <Spinner size="xl" />
      )}
    </div>
  );
};

export default MyStores;
