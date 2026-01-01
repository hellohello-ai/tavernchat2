"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getVisitorId } from "../lib/visitor";

type Session = {
  id: string;
  title: string;
  updatedAt: string;
  messages: { id: string }[];
};

export default function SessionHistory() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSessions = async () => {
      const visitorId = getVisitorId();
      const response = await fetch(`/api/sessions?visitorId=${visitorId}`);
      if (response.ok) {
        const data = (await response.json()) as Session[];
        setSessions(data);
      }
      setLoading(false);
    };
    void loadSessions();
  }, []);

  return (
    <div className="panel" style={{ display: "grid", gap: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <strong>Conversation history</strong>
        <span className="badge">{sessions.length} chats</span>
      </div>
      {loading ? (
        <p style={{ color: "var(--muted)", margin: 0 }}>Loading your sessions...</p>
      ) : sessions.length === 0 ? (
        <p style={{ color: "var(--muted)", margin: 0 }}>
          No saved chats yet. Start a conversation to see it here.
        </p>
      ) : (
        <div className="notice-board">
          {sessions.map((session) => (
            <Link key={session.id} href={`/chat/${session.id}`} className="card">
              <strong>{session.title}</strong>
              <span style={{ color: "var(--muted)" }}>
                {session.messages.length} messages ·{" "}
                {new Date(session.updatedAt).toLocaleString()}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
