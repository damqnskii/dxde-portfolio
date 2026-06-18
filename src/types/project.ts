export type ProjectCollection = "personal" | "marketplace" | "commission";

export type ProjectMediaItem =
  | {
      type: "image";
      src: string;
      alt?: string;
    }
  | {
      type: "youtube";
      url: string;
      title?: string;
    };

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
  media?: ProjectMediaItem[];
  tags: string[];
  featured?: boolean;
  githubUrl?: string;
};
