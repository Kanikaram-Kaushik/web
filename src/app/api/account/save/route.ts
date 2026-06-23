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

export async function PATCH(req: NextRequest) {
  const session = await requireAuthSession(req.headers);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rate = checkRateLimit({
    key: `account:save:patch:${session.user.id}`,
    limit: 30,
    windowMs: 60_000,
  });
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: rateLimitHeaders(rate) }
    );
  }

  const body = (await req.json()) as { targetType?: string; targetId?: string };
  const targetType = toTargetType(body.targetType ?? null);
  const targetId = body.targetId?.trim();
  if (!targetType || !targetId) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existing = await prisma.engagementSave.findFirst({
    where: { userId: session.user.id, targetType, targetId },
  });

  if (existing) {
    await prisma.engagementSave.deleteMany({
      where: { userId: session.user.id, targetType, targetId },
    });
    return NextResponse.json({ saved: false }, { headers: rateLimitHeaders(rate) });
  }

  const save = await prisma.engagementSave.create({
    data: {
      userId: session.user.id,
      targetType,
      targetId,
    },
  });

  return NextResponse.json({ saved: true, save }, { headers: rateLimitHeaders(rate) });
}
