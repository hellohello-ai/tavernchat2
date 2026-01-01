"use client";

import { useState } from "react";

const notices = [
  {
    title: "The Cozy Circle",
    detail: "Join a rotating group chat where characters decide the speaker.",
    tag: "group chat"
  },
  {
    title: "Lantern Guild",
    detail: "Unlock weekly story arcs with your favorite companions.",
    tag: "events"
  },
  {
    title: "Traveler's Log",
    detail: "Every session is archived, searchable, and ready to revisit.",
    tag: "history"
  }
];

export default function NoticeBoard() {
  const [pinned, setPinned] = useState<string[]>([]);

  const togglePinned = (title: string) => {
    setPinned((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  return (
    <div className="panel notice-board">
      <div className="notice-board-title">
        <strong>Notice Board</strong>
        <span className="badge">New announcements</span>
      </div>
      {notices.map((notice) => (
        <div key={notice.title} className="card">
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <strong>{notice.title}</strong>
              <p style={{ margin: "0.5rem 0 0", color: "var(--muted)" }}>{notice.detail}</p>
            </div>
            <button className="cta ghost" onClick={() => togglePinned(notice.title)}>
              {pinned.includes(notice.title) ? "Pinned" : "Pin"}
            </button>
          </div>
          <div className="tag-row" style={{ marginTop: "0.75rem" }}>
            <span className="badge accent">{notice.tag}</span>
            {pinned.includes(notice.title) && <span className="badge">saved</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
