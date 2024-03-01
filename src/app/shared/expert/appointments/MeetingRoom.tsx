"use client";

import React, { useEffect, useState } from "react";
import { HMSPrebuilt } from "@100mslive/roomkit-react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import SessionTimer from "./SessionTimer";

const MeetingRoom = ({
  clientId,
  roomCode,
}: {
  clientId: string;
  roomCode: string;
}) => {
  const [isMeetingOn, setIsMeetingOn] = useState(false);

  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      hmsActions.leave();
    };
  }, [hmsActions]);

  const handleJoin = () => {
    setIsMeetingOn(true);
  };
  const handleLeave = () => {
    setIsMeetingOn(false);
  };

  return (
    <main
      className={
        isMeetingOn ? "fixed top-0 right-0 left-0 z-50" : "w-full h-[100vh]"
      }
    >
      <div className="h-[100vh] w-full relative">
        <SessionTimer />

        <HMSPrebuilt
          roomCode={roomCode}
          onJoin={handleJoin}
          onLeave={handleLeave}
        />
      </div>
      {roomCode}
    </main>
  );
};

export default MeetingRoom;
