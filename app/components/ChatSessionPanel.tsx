"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addMessage,
  buildMessage,
  createSession,
  listSessions,
  ChatSession
} from "../lib/chatStore";

type Participant = {
  id: string;
  name: string;
};

type ChatSessionPanelProps = {
  title: string;
  participants: Participant[];
  sessionKey: string;
};

export default function ChatSessionPanel({
  title,
  participants,
  sessionKey
}: ChatSessionPanelProps) {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const sessions = listSessions();
    const existing = sessions.find((item) => item.id === sessionKey);
    if (existing) {
      setSession(existing);
      return;
    }
    const fallbackTitle = title || "New conversation";
    const created = createSession(
      fallbackTitle,
      participants.map((participant) => participant.id),
      sessionKey
    );
    setSession(created);
  }, [participants, sessionKey, title]);

  const messages = session?.messages ?? [];

  const helperMessage = useMemo(() => {
    if (participants.length === 1) {
      return `${participants[0].name} is ready to chat.`;
    }
    return `The circle is listening. ${participants.length} companions are ready to respond.`;
  }, [participants]);

  const sendMessage = () => {
    if (!session || !input.trim()) {
      return;
    }
    const userMessage = buildMessage("user", input.trim(), "You");
    const nextSession = addMessage(session, userMessage);
    const responder = participants[Math.floor(Math.random() * participants.length)];
    const assistantMessage = buildMessage(
      "assistant",
      `(${responder.name}) I hear you. Let us weave the next thread together.`,
      responder.name
    );
    const finalSession = addMessage(nextSession, assistantMessage);
    setSession(finalSession);
    setInput("");
  };

  const startNewChat = () => {
    const newSession = createSession(
      `${title} · ${new Date().toLocaleTimeString()}`,
      participants.map((participant) => participant.id)
    );
    setSession(newSession);
  };

  return (
    <div className="panel" style={{ display: "grid", gap: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
        <strong>{title}</strong>
        <button className="cta ghost" type="button" onClick={startNewChat}>
          New chat
        </button>
      </div>
      <p style={{ color: "var(--muted)", margin: 0 }}>{helperMessage}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {messages.length === 0 ? (
          <div className="message">
            <div className="meta">Tavern host</div>
            A new chapter awaits. Say hello to begin.
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role === "user" ? "user" : ""}`}
            >
              <div className="meta">{message.speaker ?? "Tavern"}</div>
              {message.content}
            </div>
          ))
        )}
      </div>
      <div className="bottom-input">
        <input
          className="input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Send a message..."
        />
        <button className="cta" type="button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
