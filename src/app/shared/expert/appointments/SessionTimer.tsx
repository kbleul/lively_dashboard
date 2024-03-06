"use client";

import React, { useState } from "react";

const SessionTimer = () => {
  const [timer, setTimer] = useState(10);

  return (
    <section className="absolute top-4 right-4 z-50 text-lg px-4 py-2 border rounded-xl border-green-400 text-green-400">
      <p>
        Timer : <span className="font-semibold">{timer}</span>
      </p>
    </section>
  );
};

export default SessionTimer;
