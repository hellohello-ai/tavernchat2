"use client";

import { useEffect, useMemo, useState } from "react";

type Participant = {
  id: string;
  name: string;
};

type ChatSessionPanelProps = {
  title: string;
  participants: Participant[];
  sessionKey: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  speaker?: string;
  createdAt: string;
};

type ChatSession = {
  id: string;
  title: string;
  participantIds: string[];
  messages: ChatMessage[];
};

const getVisitorId = () => {
  if (typeof window === "undefined") {
    return "";
  }
  const key = "tavern-visitor-id";
  const existing = window.localStorage.getItem(key);
  if (existing) {
    return existing;
  }
  const generated = Math.random().toString(36).slice(2, 10);
  window.localStorage.setItem(key, generated);
  return generated;
};

export default function ChatSessionPanel({
  title,
  participants,
  sessionKey
}: ChatSessionPanelProps) {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      const visitorId = getVisitorId();
      const response = await fetch(`/api/sessions/${sessionKey}?visitorId=${visitorId}`);
      if (response.ok) {
        const data = (await response.json()) as ChatSession;
        setSession(data);
        return;
      }
      const fallbackTitle = title || "New conversation";
      const createResponse = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: sessionKey,
          title: fallbackTitle,
          participantIds: participants.map((participant) => participant.id),
          visitorId
        })
      });
      if (createResponse.ok) {
        const created = (await createResponse.json()) as ChatSession;
        setSession(created);
      }
    };
    void loadSession();
  }, [participants, sessionKey, title]);

  const messages = session?.messages ?? [];

  const helperMessage = useMemo(() => {
    if (participants.length === 1) {
      return `${participants[0].name} is ready to chat.`;
    }
    return `The circle is listening. ${participants.length} companions are ready to respond.`;
  }, [participants]);

  const sendMessage = async () => {
    if (!session || !input.trim()) {
      return;
    }
    setIsSending(true);
    const visitorId = getVisitorId();
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: session.id,
        visitorId,
        content: input.trim(),
        participants
      })
    });
    if (response.ok) {
      const data = (await response.json()) as ChatSession;
      setSession(data);
      setInput("");
    }
    setIsSending(false);
  };

  const startNewChat = async () => {
    const visitorId = getVisitorId();
    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `${title} · ${new Date().toLocaleTimeString()}`,
        participantIds: participants.map((participant) => participant.id),
        visitorId
      })
    });
    if (response.ok) {
      const data = (await response.json()) as ChatSession;
      setSession(data);
    }
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
          disabled={isSending}
        />
        <button className="cta" type="button" onClick={sendMessage} disabled={isSending}>
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
