import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp, rateLimitHeaders } from "@/lib/rate-limit";

const toTargetType = (value: string | null) => {
  if (value === "professional" || value === "inspiration") {
    return value;
  }
  return null;
};

export async function GET(req: NextRequest) {
  const rate = checkRateLimit({
    key: `comments:get:${getClientIp(req)}`,
    limit: 30,
    windowMs: 60_000,
  });
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: rateLimitHeaders(rate) }
    );
  }

  const { searchParams } = req.nextUrl;
  const targetType = toTargetType(searchParams.get("targetType"));
  const targetId = searchParams.get("targetId");
  if (!targetType || !targetId) {
    return NextResponse.json({ error: "Missing target" }, { status: 400 });
  }

  const comments = await prisma.engagementComment.findMany({
    where: { targetType, targetId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ comments }, { headers: rateLimitHeaders(rate) });
}
