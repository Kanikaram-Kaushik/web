"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/components/auth/AuthProvider";
import { useEngagements } from "@/hooks/useEngagements";

export default function AccountIndexPage() {
  const { user, updateProfile } = useAuth();
  const { counts } = useEngagements();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(
    typeof (user as { firstName?: string })?.firstName === "string"
      ? (user as { firstName?: string }).firstName ?? ""
      : ""
  );
  const [lastName, setLastName] = useState(
    typeof (user as { lastName?: string })?.lastName === "string"
      ? (user as { lastName?: string }).lastName ?? ""
      : ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const displayFirstName =
    typeof (user as { firstName?: string })?.firstName === "string"
      ? (user as { firstName?: string }).firstName
      : "";
  const displayLastName =
    typeof (user as { lastName?: string })?.lastName === "string"
      ? (user as { lastName?: string }).lastName
      : "";
  const fallbackName =
    user?.name || user?.email || user?.phoneNumber || "Member";
  const displayName =
    displayFirstName || displayLastName
      ? `${displayFirstName} ${displayLastName}`.trim()
      : fallbackName;

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Welcome back
            </p>
            <h1 className="mt-3 text-3xl font-semibold">{displayName}</h1>
            <p className="mt-2 text-sm text-muted">
              Here is your personalized discovery dashboard.
            </p>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition hover:border-foreground/40 hover:text-foreground"
            onClick={() => {
              setSaveMessage(null);
              setIsEditing((prev) => !prev);
            }}
          >
            {isEditing ? "Close" : "Edit"}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isEditing ? (
            <motion.div
              key="edit-profile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    First name
                    <input
                      type="text"
                      className="mt-2 w-full rounded-2xl border border-foreground/15 bg-white/90 px-4 py-2.5 text-base text-[#1f1a16] placeholder:text-[#9b8f86] focus:border-accent focus:outline-none"
                      placeholder="First name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </label>
                  <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Last name
                    <input
                      type="text"
                      className="mt-2 w-full rounded-2xl border border-foreground/15 bg-white/90 px-4 py-2.5 text-base text-[#1f1a16] placeholder:text-[#9b8f86] focus:border-accent focus:outline-none"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </label>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <button
                    className="rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60"
                    disabled={isSaving}
                    onClick={async () => {
                      setIsSaving(true);
                      setSaveMessage(null);
                      const message = await updateProfile({
                        firstName: firstName.trim() || undefined,
                        lastName: lastName.trim() || undefined,
                      });
                      setIsSaving(false);
                      if (!message) {
                        setIsEditing(false);
                      }
                      setSaveMessage(message ?? "Profile updated.");
                    }}
                  >
                    Save changes
                  </button>
                  {saveMessage ? (
                    <p className="text-xs text-muted">{saveMessage}</p>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-foreground/10 bg-card/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            Saved
          </p>
          <p className="mt-3 text-3xl font-semibold">{counts.saves}</p>
        </div>
        <div className="rounded-3xl border border-foreground/10 bg-card/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            Comments
          </p>
          <p className="mt-3 text-3xl font-semibold">{counts.comments}</p>
        </div>
        <div className="rounded-3xl border border-foreground/10 bg-card/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            Likes
          </p>
          <p className="mt-3 text-3xl font-semibold">{counts.likes}</p>
        </div>
        <div className="rounded-3xl border border-foreground/10 bg-card/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            Follows
          </p>
          <p className="mt-3 text-3xl font-semibold">{counts.follows}</p>
        </div>
      </div>
    </div>
  );
}
