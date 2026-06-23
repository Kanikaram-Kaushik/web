"use client";

import Link from "next/link";
import { useEngagements } from "@/hooks/useEngagements";

export default function AccountLikesPage() {
  const { likes, isSignedIn } = useEngagements();
  const likedInspirations = likes.filter(
    (item) => item.itemType === "inspiration"
  );

  if (!isSignedIn) {
    return (
      <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-8 text-sm text-muted">
        Log in to view your liked inspirations.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          Likes
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Your liked inspirations</h1>
        <p className="mt-2 text-sm text-muted">
          Inspirations you have liked appear here.
        </p>
      </div>

      {likedInspirations.length === 0 ? (
        <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-8 text-sm text-muted">
          You have not liked any inspirations yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {likedInspirations.map((item) => (
            <Link
              key={`${item.itemType}-${item.itemId}`}
              href={`/designs/${item.itemId}`}
              className="group overflow-hidden rounded-3xl border border-foreground/10 bg-card/80 transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,10,5,0.12)]"
            >
              <div className="flex h-52 w-full items-center justify-center bg-gradient-to-br from-white/10 via-transparent to-white/5">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
                  Inspiration
                </span>
              </div>
              <div className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  Liked inspiration
                </p>
                <h3 className="text-2xl font-semibold">{item.itemId}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
