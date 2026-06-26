import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const exercises = await prisma.exerciseCompletion.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(exercises);
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { exerciseId, language, level } = await req.json();

  const exercise = await prisma.exerciseCompletion.create({
    data: {
      id: crypto.randomUUID(),
      userId: session.user.id,
      exerciseId,
      language,
      level,
    },
  });

  return NextResponse.json(exercise, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await req.json();

  await prisma.exerciseCompletion.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Ejercicio eliminado" });
}