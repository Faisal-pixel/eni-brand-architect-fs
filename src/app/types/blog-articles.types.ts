export type Article = {
id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  imageUrl?: string;
  author?: string;
  authorAvatar?: string;
  fileUnderTags?: string[];
  latestArticle?: boolean; // Indicates if this is the latest article
};

export type Articles = Article[];