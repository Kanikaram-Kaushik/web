"use client";

import { useState } from "react";
import Link from "next/link";
import { useEngagements } from "@/hooks/useEngagements";

const filters = ["All", "Inspirations", "Professionals"] as const;
const ghostPill =
  "border border-foreground/15 bg-transparent text-foreground/65 hover:bg-foreground/5 hover:text-foreground";

export default function AccountSavedPage() {
  const { savedItems, isSignedIn } = useEngagements();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const showInspirations = filter === "All" || filter === "Inspirations";
  const showProfessionals = filter === "All" || filter === "Professionals";

  const savedInspirations = savedItems.filter(
    (item) => item.itemType === "inspiration"
  );
  const savedProfessionals = savedItems.filter(
    (item) => item.itemType === "professional"
  );

  const isEmpty =
    (showInspirations && savedInspirations.length === 0) &&
    (showProfessionals && savedProfessionals.length === 0);

  if (!isSignedIn) {
    return (
      <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-8 text-sm text-muted">
        Log in to view your saved items.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          Saved
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Your saved items</h1>
        <p className="mt-2 text-sm text-muted">
          Keep track of inspirations and studios you want to revisit.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {filters.map((item) => (
            <button
              key={item}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${filter === item
                  ? "border border-foreground bg-foreground text-[var(--card)] shadow-sm"
                  : ghostPill
                }`}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {isEmpty ? (
        <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-8 text-sm text-muted">
          You have not saved anything yet. Browse inspirations or discovery to
          add items here.
        </div>
      ) : (
        <div className="space-y-10">
          {showInspirations ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Inspirations</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {savedInspirations.map((item) => (
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
                        Saved inspiration
                      </p>
                      <h3 className="text-2xl font-semibold">{item.itemId}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {showProfessionals ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Professionals</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {savedProfessionals.map((item) => (
                  <Link
                    key={`${item.itemType}-${item.itemId}`}
                    href={`/discover/${item.itemId}`}
                    className="group overflow-hidden rounded-3xl border border-foreground/10 bg-card/80 transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,10,5,0.12)]"
                  >
                    <div className="flex h-52 w-full items-center justify-center bg-gradient-to-br from-white/10 via-transparent to-white/5">
                      <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">
                        Studio
                      </span>
                    </div>
                    <div className="space-y-2 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                        Saved studio
                      </p>
                      <h3 className="text-2xl font-semibold">{item.itemId}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
