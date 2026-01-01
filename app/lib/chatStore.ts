"use client";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  speaker?: string;
  createdAt: string;
};

export type ChatSession = {
  id: string;
  title: string;
  participantIds: string[];
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
};

const STORAGE_KEY = "tavern-chat-sessions";

const buildId = () => Math.random().toString(36).slice(2, 10);

const readSessions = (): ChatSession[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  return JSON.parse(raw) as ChatSession[];
};

const writeSessions = (sessions: ChatSession[]) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
};

export const createSession = (
  title: string,
  participantIds: string[],
  id?: string
) => {
  const now = new Date().toISOString();
  const session: ChatSession = {
    id: id ?? buildId(),
    title,
    participantIds,
    createdAt: now,
    updatedAt: now,
    messages: []
  };
  const sessions = readSessions();
  sessions.unshift(session);
  writeSessions(sessions);
  return session;
};

export const updateSession = (session: ChatSession) => {
  const sessions = readSessions();
  const exists = sessions.some((item) => item.id === session.id);
  const next = exists ? sessions.map((item) => (item.id === session.id ? session : item)) : [session, ...sessions];
  writeSessions(next);
};

export const listSessions = () => readSessions();

export const addMessage = (session: ChatSession, message: ChatMessage) => {
  const updated: ChatSession = {
    ...session,
    updatedAt: new Date().toISOString(),
    messages: [...session.messages, message]
  };
  updateSession(updated);
  return updated;
};

export const buildMessage = (
  role: "user" | "assistant",
  content: string,
  speaker?: string
): ChatMessage => ({
  id: buildId(),
  role,
  content,
  speaker,
  createdAt: new Date().toISOString()
});
