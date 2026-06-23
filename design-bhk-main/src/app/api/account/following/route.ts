import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuthSession } from "@/lib/auth-session";
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export async function PATCH(req: NextRequest) {
  const session = await requireAuthSession(req.headers);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rate = checkRateLimit({
    key: `account:following:patch:${session.user.id}`,
    limit: 30,
    windowMs: 60_000,
  });
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: rateLimitHeaders(rate) }
    );
  }

  const body = (await req.json()) as { profileId?: string };
  const profileId = body.profileId?.trim();
  if (!profileId) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existing = await prisma.engagementFollow.findFirst({
    where: { userId: session.user.id, profileId },
  });

  if (existing) {
    await prisma.engagementFollow.deleteMany({
      where: { userId: session.user.id, profileId },
    });
    return NextResponse.json({ following: false }, { headers: rateLimitHeaders(rate) });
  }

  const follow = await prisma.engagementFollow.create({
    data: {
      userId: session.user.id,
      profileId,
    },
  });

  return NextResponse.json(
    { following: true, follow },
    { headers: rateLimitHeaders(rate) }
  );
}
