"use client";

import { useState } from "react";

const hooks = [
  "A moonstone map has begun to glow again—only in this tavern.",
  "A caravan vanished into the mist, leaving a single bell behind.",
  "The hearthfire whispers a name you have never heard before.",
  "An enchanted tankard refills only for the brave-hearted.",
  "A star fell into the lake, and the water now sings.",
  "A library key is missing, and the shelves are rearranging themselves."
];

export default function QuestHook() {
  const [hook, setHook] = useState(hooks[0]);

  const shuffleHook = () => {
    const next = hooks[Math.floor(Math.random() * hooks.length)];
    setHook(next);
  };

  return (
    <div className="panel glow-card" style={{ display: "grid", gap: "1rem" }}>
      <div className="notice-board-title">
        <strong>Quest Spark</strong>
        <button className="cta ghost" onClick={shuffleHook}>
          Draw a new hook
        </button>
      </div>
      <p style={{ color: "var(--muted)", margin: 0 }}>{hook}</p>
      <div className="tag-row">
        <span className="badge accent">story seed</span>
        <span className="badge">cozy</span>
        <span className="badge">dynamic group chat</span>
      </div>
    </div>
  );
}
