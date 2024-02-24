import { useModal } from "@/app/shared/modal-views/use-modal";
import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { PiXBold } from "react-icons/pi";
import { ActionIcon, Button, Title } from "rizzui";
import { toast } from "sonner";

const UserAppointmentModal = ({ appointment }: { appointment: any }) => {
  const { closeModal } = useModal();

  const postMutation = useDynamicMutation();

  const headers = useGetHeaders({ type: "Json" });
  const router = useRouter();

  const getRoomLink = async () => {
    try {
      await postMutation.mutateAsync({
        url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/get-meeting-link/${appointment.id}`,
        method: "GET",
        headers,
        body: {},
        onSuccess: (res: any) => {
          if (res.status === 200) {
            let roomCode = res.data.split("meeting/");
            roomCode = roomCode[roomCode.length - 1];
            console.log("--->", roomCode);
            router.push(routes.expert["join-meeting"](roomCode));
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.data);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <section className="mb-7 flex items-center justify-between border-b pb-2">
        <Title as="h4" className="font-semibold">
          User Detail
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </section>

      <section className="flex justify-start items-start gap-4">
        <section className="w-20 h-20 bg-gray-100  rounded-full overflow-hidden">
          {appointment?.user?.profile_image &&
            !appointment?.user?.profile_image.includes("ui-avatars.com/") && (
              <Image
                src={
                  appointment?.user?.profile_image &&
                  appointment?.user?.profile_image
                }
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                alt={""}
              />
            )}
        </section>
        <section className="pt-1">
          <p className="font-medium text-xl">
            {appointment?.user?.first_name + " " + appointment?.user?.last_name}{" "}
          </p>
          <p className="font-light">{appointment?.user?.username} </p>
        </section>
      </section>

      <Title as="h4" className="font-medium text-xl mt-8">
        Appointment Detail
      </Title>

      <section className="py-4 mb-6 border-b border-gray-200 flex items-center justify-start">
        <div className="flex items-center gap-2">
          <MdOutlineCalendarMonth
            size={24}
            color="#00BA63"
            className="hidden md:bloack"
          />

          <p className="text-md md:text-lg text-[#5F5F5F]">
            Date:{" "}
            <span className="font-bold block md:inline md:mx-2 text-black text-sm md:text-base">
              {appointment.date}
            </span>
          </p>
        </div>
        <div className="ml-4 border-l-2 border-l-[#D4D4D4] px-6 flex items-center gap-2">
          <FaRegClock size={22} color="#00BA63" className="hidden md:bloack" />

          <p className="text-md md:text-lg text-[#5F5F5F]">
            Time:{" "}
            <span className="font-bold md:mx-2 block md:inline  text-black text-sm md:text-base">
              {appointment.time}
            </span>
          </p>
        </div>
      </section>

      <section className="w-full flex justify-end">
        <Button
          size="lg"
          color="primary"
          className="bg-gradient-to-r from-[#008579] to-[#00BA63] px-16"
          onClick={getRoomLink}
        >
          {postMutation.isPending ? "Loading ..." : "Join Call"}
        </Button>
      </section>
    </article>
  );
};

export default UserAppointmentModal;
