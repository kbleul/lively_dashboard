"use client";
import audioImg from "@public/audio.png";
import React, { useState } from "react";
import { Button, Title } from "rizzui";
import { useModal } from "../../modal-views/use-modal";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { useFetchData } from "@/react-query/useFetchData";
import { queryKeys } from "@/react-query/query-keys";
import Spinner from "@/components/ui/spinner";
import Image from "next/image";
import { truncateAmharicText } from "@/utils/trim-text";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import ViewCategory from "./view-category-modal";
import AddExerciseForm from "./add-exercise";
import { LuDot } from "react-icons/lu";

const ExercisesList = ({ categoryId }: { categoryId: string }) => {
  const { openModal } = useModal();

  const headers = useGetHeaders({ type: "Json" });

  const exercisesList = useFetchData(
    [queryKeys.getAllMindfulnessExercises + categoryId, categoryId],
    `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}counsellor/mindfulnesses/${categoryId}`,
    headers
  );

  if (exercisesList.isPending || exercisesList.isFetching) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />

        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  const ExerciseData = exercisesList?.data?.data;

  return (
    <article>
      <div className="flex justify-end mb-6">
        <Button
          size="lg"
          color="primary"
          className="text-white bg-gradient-to-r from-[#008579] to-[#00BA63]"
          onClick={() =>
            openModal({
              view: <AddExerciseForm categoryId={categoryId} />,
            })
          }
        >
          Add Exercise
        </Button>
      </div>

      <section className="flex flex-wrap justify-start gap-[4%]">
        {ExerciseData.map((exercise: any) => (
          <AudioCard
            key={exercise.id}
            categoryId={categoryId}
            exercise={exercise}
          />
        ))}
      </section>
    </article>
  );
};

const AudioCard = ({
  categoryId,
  exercise,
}: {
  categoryId: string;
  exercise: any;
}) => {
  const { openModal } = useModal();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative w-[48%] flex justify-start gap-4 bg-[#FBFBFB] mb-6 px-6 py-4 shadow-md">
      <Image src={audioImg} alt="" className="w-16 h-16" />
      <div className="">
        <p className="font-semibold  text-lg">{exercise.title.amharic}</p>

        <div className="flex items-center text-base text-[#7B7B7B]">
          <p className="">{exercise.duration}</p>
          <LuDot size={32} color="#000" />
          <p className="">{exercise.master.amharic}</p>
        </div>

        {!exercise.active && (
          <p className="border px-3 py-1 bg-red-400 text-white  rounded-full w-fit text-xs font-semibold ">
            Hidden
          </p>
        )}

        <section className="absolute top-3 right-3 ">
          <Button
            color="primary"
            variant="outline"
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-black bg-white z-50  rounded-full border-white py-1 px-[0.6rem] flex justify-center items-center"
          >
            <BsThreeDots size={20} />
          </Button>
          {showMenu && (
            <div
              className="absolute top-8 right-10 border bg-white px-8"
              onMouseEnter={() => setShowMenu(true)}
            >
              <button
                type="button"
                className="py-2 border-b"
                onClick={() => {
                  openModal({
                    view: (
                      <AddExerciseForm
                        categoryId={categoryId}
                        id={exercise.id}
                      />
                    ),
                  });
                }}
              >
                Edit
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
export default ExercisesList;
