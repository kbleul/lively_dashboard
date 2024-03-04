"use client";

import React, { useState } from "react";
import { Button, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import AddCategoryForm from "./add-category";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Spinner from "@/components/ui/spinner";
import Image from "next/image";
import { truncateAmharicText } from "@/utils/trim-text";
import ViewCategory from "./view-category-modal";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";

const CategoriesList = () => {
  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const categoriesList = useFetchData(
    [queryKeys.getAllAssessmentCategory],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/self-assessment-categories`,
    headers
  );

  if (categoriesList.isPending || categoriesList.isFetching) {
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
    <article>
      <div className="flex justify-end">
        <Button
          size="lg"
          color="primary"
          className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63]"
          onClick={() =>
            openModal({
              view: <AddCategoryForm />,
            })
          }
        >
          Add Category
        </Button>
      </div>

      <article className="flex justify-start items-stretch gap-[2%] flex-wrap">
        {categoriesList.data.data &&
          categoriesList.data.data.map((category: any) => (
            <section
              className="w-[23%] border rounded-xl shadow-md overflow-hidden relative"
              key={category.id}
            >
              <div className="h-[14vh] w-full overflow-hidden relative">
                <Image
                  src={category.image.url}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  alt={""}
                />

                <section className="absolute bottom-2 flex justify-center gap-1">
                  <div className="px-4">
                    <p className="text-white  font-medium bg-black rounded-full px-2 py-1 text-xs">
                      {category.count} questions
                    </p>
                  </div>

                  {!category.active && (
                    <div className="px-4">
                      <p className="text-white font-medium bg-red-400 rounded-full px-2 py-1 text-xs">
                        Hidden
                      </p>
                    </div>
                  )}
                </section>
              </div>

              <SideMenu category={category} />

              <div className="p-4">
                <Title as="h6" className="text-lg font-medium">
                  {truncateAmharicText(category.name.english, 30)}
                </Title>
                <p className="py-1">
                  {truncateAmharicText(category.description.english, 40)}
                </p>

                <Button
                  color="primary"
                  type="button"
                  className="w-full border border-[#5F5F5F] text-[#5F5F5F] bg-white hover:text-white hover:border-none mt-4 mb-2"
                >
                  <Link
                    href={
                      routes.counselor["add-assessments-questions"](
                        category.id
                      ) + `?number_of_questions=${category.count}`
                    }
                  >
                    Add Question
                  </Link>
                </Button>
              </div>
            </section>
          ))}
      </article>
    </article>
  );
};

const SideMenu = ({ category }: { category: any }) => {
  const router = useRouter();

  const { openModal } = useModal();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <section className=" w-full">
      <Button
        color="primary"
        variant="outline"
        onClick={() => setShowMenu((prev) => !prev)}
        className="text-black bg-white z-50  rounded-full border-white absolute top-3 right-3 py-1 px-[0.6rem] flex justify-center items-center"
      >
        <BsThreeDots size={20} />
      </Button>
      {showMenu && (
        <div
          className="absolute top-12 right-10 border bg-white flex flex-col"
          onMouseEnter={() => setShowMenu(true)}
        >
          <button
            type="button"
            className="py-2 hover:bg-gray-100 px-6 border-b"
            onClick={() =>
              openModal({
                view: <ViewCategory category={category} />,
              })
            }
          >
            view category
          </button>
          <button
            type="button"
            className="py-2 hover:bg-gray-100 px-6 border-b"
            onClick={() =>
              openModal({
                view: <AddCategoryForm id={category.id} />,
              })
            }
          >
            edit category
          </button>
          <button
            type="button"
            className="py-2 hover:bg-gray-100 px-6"
            onClick={() =>
              router.push(
                routes.counselor["view-assessments-questions"](category.id)
              )
            }
          >
            view questions
          </button>
        </div>
      )}
    </section>
  );
};

export default CategoriesList;
