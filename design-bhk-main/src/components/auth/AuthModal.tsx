"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";

type AuthModalProps = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: AuthModalProps) {
  const { requestOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<"input" | "otp">("input");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-lg rounded-[32px] border border-foreground/10 bg-card/85 p-6 shadow-[0_30px_60px_rgba(15,10,5,0.25)] sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted sm:text-xs">
              Secure Access
            </p>
            <h3 className="mt-2 text-xl font-semibold sm:text-2xl">Login with OTP</h3>
          </div>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-white/25 hover:bg-white/10 hover:text-foreground"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6l-12 12" />
            </svg>
          </button>
        </div>

        {step === "input" ? (
          <div className="mt-6 space-y-5">
            <div className="flex gap-2 rounded-full border border-foreground/15 bg-white/75 p-1 text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-xs">
              <button
                className={`flex-1 rounded-full px-4 py-2 transition ${
                  method === "email" ? "bg-foreground text-background" : "text-[#5c524a]"
                }`}
                onClick={() => {
                  setMethod("email");
                  setIdentifier("");
                }}
              >
                Email
              </button>
              <button
                className={`flex-1 rounded-full px-4 py-2 transition ${
                  method === "phone" ? "bg-foreground text-background" : "text-[#5c524a]"
                }`}
                onClick={() => {
                  setMethod("phone");
                  setIdentifier("");
                }}
              >
                Phone
              </button>
            </div>
            <label className="space-y-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs">
              {method === "email" ? "Email address" : "Phone number"}
              <input
                type={method === "email" ? "email" : "tel"}
                className="mt-2 w-full rounded-2xl border border-foreground/15 bg-white/90 px-4 py-2.5 text-sm text-[#1f1a16] placeholder:text-[#9b8f86] focus:border-accent focus:outline-none sm:text-base"
                placeholder={method === "email" ? "you@studio.com" : "+1 555 000 0000"}
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
              />
            </label>
            <button
              className="mt-2 w-full rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60 sm:text-sm"
              disabled={isLoading}
              onClick={async () => {
                if (!identifier) return;
                setIsLoading(true);
                setError(null);
                const message = await requestOtp(method, identifier);
                setIsLoading(false);
                if (message) {
                  setError(message);
                  return;
                }
                setStep("otp");
              }}
            >
              Send OTP
            </button>
            {error ? <p className="text-xs text-[#d8895b]">{error}</p> : null}
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <p className="text-xs text-muted sm:text-sm">
              We sent a 6-digit OTP to <strong>{identifier}</strong>.
            </p>
            <label className="space-y-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs">
              Enter OTP
              <input
                type="text"
                className="mt-2 w-full rounded-2xl border border-foreground/15 bg-white/90 px-4 py-2.5 text-sm text-[#1f1a16] placeholder:text-[#9b8f86] focus:border-accent focus:outline-none sm:text-base"
                placeholder="123456"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
              />
            </label>
            <button
              className="mt-2 w-full rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60 sm:text-sm"
              disabled={isLoading}
              onClick={async () => {
                if (!otp) return;
                setIsLoading(true);
                setError(null);
                const message = await verifyOtp(method, identifier, otp);
                setIsLoading(false);
                if (message) {
                  setError(message);
                  return;
                }
                onClose();
              }}
            >
              Verify &amp; Continue
            </button>
            <button
              className="w-full rounded-full border border-foreground/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:text-xs"
              onClick={() => setStep("input")}
            >
              Change {method}
            </button>
            {error ? <p className="text-xs text-[#d8895b]">{error}</p> : null}
          </div>
        )}
      </div>
    </div>
  );
}
