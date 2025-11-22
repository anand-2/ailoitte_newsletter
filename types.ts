export interface Source {
  id: string | null;
  name: string;
}

export interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
  code?: string;
  message?: string;
}

export enum Category {
  GENERAL = 'general',
  BUSINESS = 'business',
  TECHNOLOGY = 'technology',
  ENTERTAINMENT = 'entertainment',
  HEALTH = 'health',
  SCIENCE = 'science',
  SPORTS = 'sports',
}

export interface ApiError {
  message: string;
}