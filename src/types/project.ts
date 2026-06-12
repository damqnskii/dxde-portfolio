export type ProjectCollection = "personal" | "marketplace" | "commission";

export type Project = {
  slug: string;
  collection: ProjectCollection;
  title: string;
  subtitle?: string;
  category: string;
  year: string;
  client?: string;
  coverImage: string;
  description: string;
  longDescription?: string;
  images: string[];
  tags: string[];
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
};
