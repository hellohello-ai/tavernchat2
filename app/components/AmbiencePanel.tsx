"use client";

import { useState } from "react";

const ambienceModes = [
  { id: "hearth", label: "Hearth Glow" },
  { id: "rain", label: "Rainy Evening" },
  { id: "library", label: "Quiet Archive" }
];

export default function AmbiencePanel() {
  const [mode, setMode] = useState(ambienceModes[0].id);
  const [soundOn, setSoundOn] = useState(false);

  return (
    <div className="panel" style={{ display: "grid", gap: "1rem" }}>
      <strong>Ambient controls</strong>
      <div className="tag-row">
        {ambienceModes.map((ambience) => (
          <button
            key={ambience.id}
            className="badge"
            onClick={() => setMode(ambience.id)}
            style={{
              border: mode === ambience.id ? "1px solid var(--accent)" : "1px solid transparent"
            }}
          >
            {ambience.label}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <span style={{ color: "var(--muted)" }}>
          Current mood: <strong>{ambienceModes.find((item) => item.id === mode)?.label}</strong>
        </span>
        <button className="cta ghost" onClick={() => setSoundOn((prev) => !prev)}>
          {soundOn ? "Sound on" : "Sound off"}
        </button>
      </div>
      <p style={{ margin: 0, color: "var(--muted)" }}>
        Ambient audio will be configurable when the soundscape library is connected.
      </p>
    </div>
  );
}
