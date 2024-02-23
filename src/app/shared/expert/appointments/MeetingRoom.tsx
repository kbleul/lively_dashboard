"use client";

import React, { useState } from "react";
import { HMSPrebuilt } from "@100mslive/roomkit-react";
import Logo from "@public/logo.png";

const MeetingRoom = ({ roomCode }: { roomCode: string }) => {
  const [isMeetingOn, setIsMeetingOn] = useState(false);
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
      <div className="h-[100vh] w-full">
        <HMSPrebuilt
          roomCode={roomCode}
          logo="https://lively-et.com/static/media/logo.15e5bfa8f5041f4b2cc8a32834c821c0.svg"
          onJoin={handleJoin}
          onLeave={handleLeave}
        />
      </div>
      {roomCode}
    </main>
  );
};

export default MeetingRoom;
