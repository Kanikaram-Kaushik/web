import { Style } from "./types";

export const styles: Style[] = [
  { id: "style.japandi", title: "Japandi", slug: "japandi" },
  { id: "style.contemporary", title: "Contemporary", slug: "contemporary" },
  { id: "style.warm-minimal", title: "Warm Minimal", slug: "warm-minimal" },
  { id: "style.heritage", title: "Heritage", slug: "heritage" },
  { id: "style.biophilic", title: "Biophilic", slug: "biophilic" },
  { id: "style.coastal", title: "Coastal", slug: "coastal" },
];

export const getStyleBySlug = (slug: string): Style | undefined =>
  styles.find((s) => s.slug === slug);

export const getStylesBySlugs = (slugs: string[]): Style[] =>
  styles.filter((s) => slugs.includes(s.slug));
