import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuthSession } from "@/lib/auth-session";
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit";

const toTargetType = (value: string | null) => {
  if (value === "professional" || value === "inspiration") {
    return value;
  }
  return null;
};

export async function POST(req: NextRequest) {
  const session = await requireAuthSession(req.headers);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rate = checkRateLimit({
    key: `account:comments:post:${session.user.id}`,
    limit: 10,
    windowMs: 60_000,
  });
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: rateLimitHeaders(rate) }
    );
  }

  const body = (await req.json()) as {
    targetType?: string;
    targetId?: string;
    content?: string;
    rating?: number;
  };

  const targetType = toTargetType(body.targetType ?? null);
  const targetId = body.targetId?.trim();
  const content = body.content?.trim();
  const rating = body.rating;

  if (!targetType || !targetId || !content) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
  }

  const comment = await prisma.engagementComment.create({
    data: {
      userId: session.user.id,
      targetType,
      targetId,
      content,
      rating,
    },
  });

  return NextResponse.json({ comment }, { headers: rateLimitHeaders(rate) });
}

export async function PATCH(req: NextRequest) {
  const session = await requireAuthSession(req.headers);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rate = checkRateLimit({
    key: `account:comments:patch:${session.user.id}`,
    limit: 10,
    windowMs: 60_000,
  });
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: rateLimitHeaders(rate) }
    );
  }

  const body = (await req.json()) as {
    id?: string;
    content?: string;
    rating?: number;
    action?: "update" | "delete";
  };

  const id = body.id;
  const action = body.action ?? "update";
  const content = body.content?.trim();
  const rating = body.rating;

  if (!id) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existing = await prisma.engagementComment.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (action === "delete") {
    await prisma.engagementComment.delete({ where: { id } });
    return NextResponse.json(
      { deleted: true },
      { headers: rateLimitHeaders(rate) }
    );
  }

  if (!content) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
  }

  const comment = await prisma.engagementComment.update({
    where: { id },
    data: { content, rating },
  });

  return NextResponse.json({ comment }, { headers: rateLimitHeaders(rate) });
}
