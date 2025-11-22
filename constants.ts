import { Category } from './types';

export const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
export const BASE_URL = 'https://newsapi.org/v2';

export const PAGE_SIZE = 12; 
export const CATEGORIES = [
  { label: 'Politics', value: Category.GENERAL },
  { label: 'Business', value: Category.BUSINESS },
  { label: 'Tech', value: Category.TECHNOLOGY },
  { label: 'Arts', value: Category.ENTERTAINMENT },
  { label: 'Science', value: Category.SCIENCE },
  { label: 'Health', value: Category.HEALTH },
  { label: 'Sports', value: Category.SPORTS },
];

export const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop';
