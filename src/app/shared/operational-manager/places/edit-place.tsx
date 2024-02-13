"use client";
import LogoImage from "@public/bg.png";

import Spinner from "@/components/ui/spinner";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { queryKeys } from "@/react-query/query-keys";
import { useFetchData } from "@/react-query/useFetchData";
import Image from "next/image";
import { Title } from "rizzui";
import EditStoreInfo from "./edit-store-info";
import { RiImageEditLine } from "react-icons/ri";
import { useState } from "react";
import EditPlaceCover from "./edit-place-cover";

const EditPlace = ({ placeId }: { placeId: string }) => {
  const headers = useGetHeaders({ type: "Json" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const storeData = useFetchData(
    [queryKeys.getSinglePlace],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}operation-manager/places/${placeId}`,
    headers
  );

  if (storeData?.isFetching || storeData?.isLoading || storeData.isPending) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  return (
    <>
      <section className="pb-8 mb-8">
        <h4 className="font-medium text-2xl text-black">Store</h4>
        <div className="flex justify-start items-center gap-x-4">
          <p className="text-[#5F5F5F]">Operation Manager</p>
          <p className="w-2 h-2 rounded-full  bg-[#5F5F5F] " />
          <p className="text-[#5F5F5F]">Edit Place</p>
        </div>

        {storeData?.data?.data && (
          <>
            <article className="relative mt-8">
              <section className=" w-full h-[18vh] md:h-[25vh] bg-[#9bfab1] rounded-3xl overflow-hidden relative">
                <Image
                  src={LogoImage}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt={""}
                />
              </section>

              <section className=" branchlogo flex items-start mt-20 md:mt-40 justify-start md:pl-20">
                <section className="">
                  <section
                    className="relative shadow-sm w-24 h-24 md:w-32 md:h-32 gap-x-4  bg-[#e1f7e6] rounded-full overflow-hidden  "
                    style={{
                      backgroundImage: `url('${storeData?.data?.data?.place_logo?.url}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      zIndex: 100,
                    }}
                  >
                    <button
                      style={{
                        background: "rgba(0, 0, 0, 0.4)",
                      }}
                      onClick={() => setIsModalOpen(true)}
                      className="z-10  absolute bottom-0 py-1 flex items-center justify-center w-full"
                    >
                      <RiImageEditLine color="#fff" size={24} />
                    </button>
                  </section>
                </section>
              </section>
            </article>

            <EditPlaceCover
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              placeId={placeId}
              storeData={storeData}
            />

            <div className="mt-[6vh] md:mt-[13vh]">
              <EditStoreInfo storeData={storeData?.data?.data} />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default EditPlace;
