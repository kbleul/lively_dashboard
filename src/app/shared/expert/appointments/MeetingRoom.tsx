"use client";

import React, { useEffect, useState } from "react";
import { HMSPrebuilt } from "@100mslive/roomkit-react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import SessionTimer from "./SessionTimer";
import { Button } from "rizzui";
import useDynamicMutation from "@/react-query/usePostData";
import { useGetHeaders } from "@/hooks/use-get-headers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";

const MeetingRoom = ({
  clientId,
  roomCode,
}: {
  clientId: string;
  roomCode: string;
}) => {
  const router = useRouter();

  const postMutation = useDynamicMutation();
  const headers = useGetHeaders({ type: "Json" });

  const [isMeetingOn, setIsMeetingOn] = useState(false);

  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions]);

  const handleJoin = () => {
    setIsMeetingOn(true);
  };
  const handleLeave = () => {
    setIsMeetingOn(false);
  };

  const endSession = async () => {
    console.log("object");
    const savedAppointment = localStorage.getItem("appointmentDetails");
    const appointmentData = savedAppointment
      ? JSON.parse(savedAppointment)
      : null;

    if (appointmentData) {
      try {
        await postMutation.mutateAsync({
          url: `${process.env.NEXT_PUBLIC_WELLBEING_BACKEND_URL}expert/end-meeting/${appointmentData.id}`,
          method: "POST",
          headers,
          body: {},
          onSuccess: () => {
            router.push(routes.expert.questionnaire(clientId));
          },
          onError: (err) => {
            toast.error(err?.response?.data?.data);
            router.push(routes.expert.questionnaire(clientId));
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <main
      className={
        isMeetingOn
          ? "fixed top-0 right-0 left-0 z-50"
          : "w-full h-[100vh] relative"
      }
    >
      <article className="h-[100vh] w-full relative">
        {isMeetingOn && <SessionTimer />}
        {!isMeetingOn && (
          <div className="absolute z-50 top-[73vh] flex w-full justify-center items-center">
            <Button className="bg-red-400 text-white" onClick={endSession}>
              End Session
            </Button>
          </div>
        )}
        <HMSPrebuilt
          roomCode={roomCode}
          onJoin={handleJoin}
          onLeave={handleLeave}
        />
      </article>
    </main>
  );
};

export default MeetingRoom;
