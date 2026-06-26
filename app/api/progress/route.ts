import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const progress = await prisma.progress.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(progress);
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const language = body.language;
  const level = body.level;

  const progress = await prisma.progress.create({
    data: {
      id: crypto.randomUUID(),
      userId: session.user.id,
      language,
      level,
      completed: true,
    },
  });

  return NextResponse.json(progress, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id, completed } = await req.json();

  const progress = await prisma.progress.update({
    where: { id },
    data: { completed },
  });

  return NextResponse.json(progress);
}

export async function DELETE(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await req.json();

  await prisma.progress.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Progreso eliminado" });
}