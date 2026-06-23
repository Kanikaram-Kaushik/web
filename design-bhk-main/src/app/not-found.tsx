import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center gap-6 px-4 py-24 text-center sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
        404
      </p>
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="max-w-md text-base text-muted">
        The page you are looking for has moved or no longer exists. Go to
        discover or head back home.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white"
        >
          Back Home
        </Link>
        <Link
          href="/discover"
          className="rounded-full border border-foreground/20 bg-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground"
        >
          Discover
        </Link>
      </div>
    </div>
  );
}
