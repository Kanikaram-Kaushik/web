"use client";

import Link from "next/link";
import { useEngagements } from "@/hooks/useEngagements";

export default function AccountFollowingPage() {
  const { follows, isSignedIn } = useEngagements();

  if (!isSignedIn) {
    return (
      <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-8 text-sm text-muted">
        Log in to view the studios you follow.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          Following
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Studios you follow</h1>
        <p className="mt-2 text-sm text-muted">
          Keep tabs on your favorite professionals.
        </p>
      </div>

      {follows.length === 0 ? (
        <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-8 text-sm text-muted">
          You are not following any studios yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {follows.map((follow) => (
            <Link
              key={follow.profileId}
              href={`/discover/${follow.profileId}`}
              className="group overflow-hidden rounded-3xl border border-foreground/10 bg-card/80 transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,10,5,0.12)]"
            >
              <div className="flex h-52 w-full items-center justify-center bg-gradient-to-br from-white/10 via-transparent to-white/5">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
                  Studio
                </span>
              </div>
              <div className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  Followed studio
                </p>
                <h3 className="text-2xl font-semibold">{follow.profileId}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
