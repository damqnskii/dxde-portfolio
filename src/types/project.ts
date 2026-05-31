export type Project = {
  slug: string;
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
