"use client";

import React, { useEffect, useRef, useState } from "react";
import { LuDot } from "react-icons/lu";
import audioImg from "@public/audio.png";
import Image from "next/image";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

const AudioPlayer = ({
  exerciseData,
  setPlayingExercise,
}: {
  exerciseData: any;
  setPlayingExercise: React.Dispatch<any>;
}) => {
  const audioUrl = exerciseData.audio.amharic.url;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      !isPlaying && setIsPlaying(true);
    }
  }, [exerciseData]);

  return (
    <article className="bg-black text-white z-50 w-[48%] flex justify-start gap-4  mb-6 px-3 py-2 rounded-lg absolute top-2">
      {/* <Image src={audioImg} alt="" className="w-16 h-16" /> */}
      <div className="">
        <audio ref={audioRef} src={audioUrl}></audio>
        {!isPlaying ? (
          <button
            className=" flex gap-2 justify-center items-center"
            onClick={handlePlay}
          >
            <FaCirclePlay className="w-8 h-8 " />
          </button>
        ) : (
          <button
            className=" flex gap-2 justify-center items-center"
            onClick={handlePause}
          >
            <FaCirclePause className="w-8 h-8 " />
          </button>
        )}
      </div>

      <section className="">
        <p className="font-semibold  text-sm">{exerciseData.title.amharic}</p>
        <div className="flex items-center text-base text-[#7B7B7B]">
          <p className="text-sm">{exerciseData.master.amharic}</p>
        </div>
      </section>

      <button
        className="absolute right-4 text-gray-300"
        onClick={() => setPlayingExercise(null)}
      >
        <MdCancel />
      </button>
    </article>
    // <div className="border-2">
    //   <audio ref={audioRef} src={audioUrl}></audio>
    //   <button onClick={handlePlay}>Play</button>
    //   <button onClick={handlePause}>Pause</button>
    // </div>
  );
};

export default AudioPlayer;
