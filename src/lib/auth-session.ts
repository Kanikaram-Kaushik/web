import { auth } from "@/lib/auth";

export async function getAuthSession(requestHeaders: Headers) {
  return auth.api.getSession({
    headers: requestHeaders,
  });
}

export async function requireAuthSession(requestHeaders: Headers) {
  const session = await getAuthSession(requestHeaders);
  if (!session || !session.user || !session.user.id) {
    return null;
  }
  return session;
}
