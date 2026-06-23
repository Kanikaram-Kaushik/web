import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuthSession } from "@/lib/auth-session";
import { checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const session = await requireAuthSession(req.headers);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rate = checkRateLimit({
    key: `account:get:${session.user.id}`,
    limit: 30,
    windowMs: 60_000,
  });
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: rateLimitHeaders(rate) }
    );
  }

  const [likes, saves, follows, comments] = await Promise.all([
    prisma.engagementLike.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.engagementSave.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.engagementFollow.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.engagementComment.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return NextResponse.json(
    {
      counts: {
        likes: likes.length,
        saves: saves.length,
        follows: follows.length,
        comments: comments.length,
      },
      likes,
      saves,
      follows,
      comments,
    },
    { headers: rateLimitHeaders(rate) }
  );
}
