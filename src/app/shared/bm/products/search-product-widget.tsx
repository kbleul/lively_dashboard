"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Title } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { ActionIcon } from "@/components/ui/action-icon";
import { Empty, SearchNotFoundIcon } from "@/components/ui/empty";
import { PiCommand, PiMagnifyingGlassBold, PiXBold } from "react-icons/pi";
import cn from "@/utils/class-names";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import { SearchProductData } from "@/types/product";
import { useFormikContext } from "formik";
import Spinner from "@/components/ui/spinner";

function SearchBox({
  onClose,
  setSelectedProduct,
}: {
  onClose: () => void;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<SearchProductData | null>
  >;
}) {
  const { setFieldValue } = useFormikContext();
  const headers = useGetHeaders({ type: "Json" });
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const productsData = useFetchData(
    [queryKeys.getAllBranchProducts, searchText],
    `${process.env.NEXT_PUBLIC_SERVICE_BACKEND_URL}branch-manager/all-products?search=${searchText}`,
    headers
  );

  useEffect(() => {
    if (inputRef?.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
    return () => {
      inputRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="w-full flex items-center px-5 py-4">
        <Input
          variant="flat"
          value={searchText}
          ref={inputRef}
          onChange={(e) => setSearchText(() => e.target.value)}
          placeholder="Search Products..."
          className=" w-full"
          prefix={
            <PiMagnifyingGlassBold className="h-[18px] w-[18px] text-gray-600" />
          }
          suffix={
            searchText && (
              <Button
                size="sm"
                variant="text"
                className="h-auto w-auto px-0"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchText(() => "");
                }}
              >
                Clear
              </Button>
            )
          }
        />
        <ActionIcon
          variant="text"
          size="sm"
          className="ms-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>
      <div>
        {productsData.isLoading ||
          (productsData.isRefetching && <Spinner size="lg" />)}
      </div>
      <div className="custom-scrollbar max-h-[60vh] overflow-y-auto border-t border-gray-300 px-2 py-4">
        <>
          {productsData.isSuccess && productsData?.data?.data.length === 0 ? (
            <Empty
              className="scale-75"
              image={<SearchNotFoundIcon />}
              text="No Result Found"
              textClassName="text-xl"
            />
          ) : (
            <Title
              as="h6"
              className="mb-5 px-3 font-semibold dark:text-gray-700"
            >
              Products
            </Title>
          )}
        </>

        {productsData?.data?.data.map(
          (item: SearchProductData, index: number) => {
            return (
              <div
                onClick={() => {
                  setFieldValue("product_variant_id", item.id);
                  onClose();
                  setSelectedProduct(item);
                }}
                key={item.id}
                className="relative my-0.5 flex items-center rounded-lg px-3 py-2 text-sm hover:bg-gray-100 focus:outline-none focus-visible:bg-gray-100 dark:hover:bg-gray-50/50 dark:hover:backdrop-blur-lg"
              >
                <Title
                  as="h6"
                  className={cn(
                    "mb-1 px-3 text-xs font-semibold uppercase tracking-widest text-gray-800 cursor-pointer",
                    index !== 0 && "mt-6 4xl:mt-7"
                  )}
                >
                  {item?.product?.title?.english}
                </Title>
              </div>
            );
          }
        )}
      </div>
    </>
  );
}

export default function SearchWidget({
  className,
  icon,
  setSelectedProduct,
}: {
  className?: string;
  icon?: React.ReactNode;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<SearchProductData | null>
  >;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const pathname = usePathname();
  useEffect(() => {
    setOpen(() => false);
  }, [pathname]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "group w-full inline-flex items-center focus:outline-none active:translate-y-px xl:h-10 xl:w-full xl:max-w-sm xl:rounded-xl xl:border xl:border-gray-200 xl:py-2 xl:pe-2 xl:ps-3.5 xl:shadow-sm xl:backdrop-blur-md xl:transition-colors xl:duration-200 xl:hover:border-primary xl:hover:outline-double xl:hover:outline-[0.5px] xl:hover:outline-primary xl:focus-visible:border-primary xl:focus-visible:outline-double xl:focus-visible:outline-[0.5px] xl:focus-visible:outline-primary",
          className
        )}
      >
        {icon ? (
          icon
        ) : (
          <PiMagnifyingGlassBold className="magnifying-glass me-2 h-[18px] w-[18px]" />
        )}
        <span className="placeholder-text hidden text-sm text-gray-600 group-hover:text-gray-900 xl:inline-flex">
          Type what you are looking for...
        </span>
        <span className="search-command ms-auto hidden items-center text-sm text-gray-600 lg:flex lg:rounded-md lg:bg-gray-200/70 lg:px-1.5 lg:py-1 lg:text-xs lg:font-semibold xl:justify-normal">
          <PiCommand strokeWidth={1.3} className="h-[15px] w-[15px]" />K
        </span>
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        overlayClassName="dark:bg-opacity-20 dark:bg-gray-50 dark:backdrop-blur-sm"
        containerClassName="dark:bg-gray-100/90 overflow-hidden"
      >
        <SearchBox
          onClose={() => setOpen(false)}
          setSelectedProduct={setSelectedProduct}
        />
      </Modal>
    </>
  );
}
