import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // Revalidate all content paths
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/discover");
  revalidatePath("/designs");
  revalidatePath("/services");

  return NextResponse.json({ revalidated: true });
}
