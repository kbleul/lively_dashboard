import { useModal } from "@/app/shared/modal-views/use-modal";
import { routes } from "@/config/routes";
import { useGetHeaders } from "@/hooks/use-get-headers";
import useDynamicMutation from "@/react-query/usePostData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
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

      <section className="flex justify-start items-start gap-3">
        <section className="w-16 h-16 bg-gray-100  rounded-full overflow-hidden">
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
        <section className="">
          <p className="font-medium text-lg">
            {appointment?.user?.first_name + " " + appointment?.user?.last_name}{" "}
          </p>
          <p className="font-light text-sm">{appointment?.user?.username} </p>
        </section>
      </section>

      <Title as="h5" className="font-semibold mt-8">
        Appointment Detail
      </Title>

      <section className="">
        <div>
          <p>{appointment.date}</p>
        </div>
        <div>
          <p>{appointment.time}</p>
        </div>
      </section>

      <section>
        <Button
          size="lg"
          color="primary"
          className="bg-gradient-to-r from-[#008579] to-[#00BA63]"
          onClick={getRoomLink}
        >
          {postMutation.isPending ? "Loading ..." : "Join Call"}
        </Button>
      </section>
    </article>
  );
};

export default UserAppointmentModal;
