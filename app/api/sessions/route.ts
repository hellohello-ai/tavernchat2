import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SessionPayload = {
  id?: string;
  title: string;
  participantIds: string[];
  visitorId: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const visitorId = searchParams.get("visitorId");
  if (!visitorId) {
    return NextResponse.json({ error: "visitorId required" }, { status: 400 });
  }
  const sessions = await prisma.chatSession.findMany({
    where: { visitorId },
    orderBy: { updatedAt: "desc" },
    include: { messages: { orderBy: { createdAt: "asc" } } }
  });
  return NextResponse.json(sessions);
}

export async function POST(request: Request) {
  const body = (await request.json()) as SessionPayload;
  if (!body.title || !body.visitorId) {
    return NextResponse.json({ error: "Missing payload" }, { status: 400 });
  }
  await prisma.visitor.upsert({
    where: { id: body.visitorId },
    update: {},
    create: { id: body.visitorId }
  });
  const session = await prisma.chatSession.upsert({
    where: { id: body.id ?? "" },
    update: {
      title: body.title,
      participantIds: body.participantIds
    },
    create: {
      id: body.id ?? undefined,
      title: body.title,
      participantIds: body.participantIds,
      visitorId: body.visitorId
    },
    include: { messages: { orderBy: { createdAt: "asc" } } }
  });
  return NextResponse.json(session);
}
