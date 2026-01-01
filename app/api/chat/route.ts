import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatPayload = {
  sessionId: string;
  visitorId: string;
  content: string;
  participants: { id: string; name: string }[];
};

const pickResponder = (participants: ChatPayload["participants"]) =>
  participants[Math.floor(Math.random() * participants.length)];

export async function POST(request: Request) {
  const body = (await request.json()) as ChatPayload;
  if (!body.sessionId || !body.visitorId || !body.content) {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }

  const session = await prisma.chatSession.findUnique({
    where: { id: body.sessionId }
  });
  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  await prisma.message.create({
    data: {
      sessionId: body.sessionId,
      role: "user",
      content: body.content,
      speaker: "You"
    }
  });

  const responder = pickResponder(body.participants);
  let assistantContent = `(${responder?.name ?? "Companion"}) I hear you. Let us weave the next thread together.`;

  if (process.env.OPENAI_API_KEY) {
    const prompt = [
      {
        role: "system",
        content:
          "You are a cozy fantasy tavern companion. Respond warmly, succinctly, and stay in character."
      },
      { role: "user", content: body.content }
    ];
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: prompt,
        temperature: 0.8
      })
    });
    if (response.ok) {
      const data = (await response.json()) as {
        choices: { message: { content: string } }[];
      };
      assistantContent = data.choices?.[0]?.message?.content ?? assistantContent;
    }
  }

  await prisma.message.create({
    data: {
      sessionId: body.sessionId,
      role: "assistant",
      content: assistantContent,
      speaker: responder?.name ?? "Companion"
    }
  });

  const updated = await prisma.chatSession.findUnique({
    where: { id: body.sessionId },
    include: { messages: { orderBy: { createdAt: "asc" } } }
  });

  return NextResponse.json(updated);
}
