"use client";

import Link from "next/link";
import { useState } from "react";
import { useEngagements } from "@/hooks/useEngagements";

export default function AccountCommentsPage() {
  const { comments, updateComment, deleteComment } = useEngagements();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          Comments
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Your recent comments</h1>
        <p className="mt-2 text-sm text-muted">
          Review, edit, or delete feedback you have shared.
        </p>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-[28px] border border-foreground/10 bg-card/80 p-8 text-sm text-muted">
          You have not posted any comments yet.
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-3xl border border-foreground/10 bg-card/80 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.2em] text-muted">
                <span>{comment.targetType}</span>
                <span>
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted">
                Rating: {comment.rating} ★
              </div>
              {editingId === comment.id ? (
                <>
                  <textarea
                    rows={3}
                    className="mt-4 w-full rounded-2xl border border-foreground/15 bg-white/95 px-4 py-3 text-sm text-[#1f1a16] focus:border-accent focus:outline-none"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                  />
                  <label className="mt-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                    Rating
                    <select
                      className="rounded-full border border-foreground/15 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1f1a16]"
                      value={rating}
                      onChange={(event) => setRating(Number(event.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              ) : (
                <p className="mt-4 text-sm text-muted">{comment.content}</p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em]">
                <Link
                  href={
                    comment.targetType === "professional"
                      ? `/discover/${comment.targetId}`
                      : `/designs/${comment.targetId}`
                  }
                  className="text-foreground"
                >
                  View source
                </Link>
                {editingId === comment.id ? (
                  <button
                    className="text-accent"
                    onClick={() => {
                      if (!text.trim()) return;
                      updateComment(comment.id, text, rating);
                      setEditingId(null);
                      setText("");
                      setRating(5);
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-accent"
                    onClick={() => {
                      setEditingId(comment.id);
                      setText(comment.content);
                      setRating(comment.rating);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="text-muted"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
