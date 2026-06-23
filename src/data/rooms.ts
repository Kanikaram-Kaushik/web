import { Room } from "./types";

export const rooms: Room[] = [
  { id: "room.living-room", title: "Living Room", slug: "living-room" },
  { id: "room.bedroom", title: "Bedroom", slug: "bedroom" },
  { id: "room.kitchen", title: "Kitchen", slug: "kitchen" },
  { id: "room.dining-room", title: "Dining Room", slug: "dining-room" },
  { id: "room.hallway", title: "Hallway", slug: "hallway" },
];

export const getRoomBySlug = (slug: string): Room | undefined =>
  rooms.find((r) => r.slug === slug);

export const getRoomsBySlugs = (slugs: string[]): Room[] =>
  rooms.filter((r) => slugs.includes(r.slug));
