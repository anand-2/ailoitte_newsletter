import axios, { AxiosResponse } from "axios";
import { API_KEY, BASE_URL, PAGE_SIZE } from "../constants";
import { NewsApiResponse, Category, Article } from "../types";

const getNewsApi = (): any => {
  const instance = axios.create({
    baseURL: BASE_URL,
    params: {
      apiKey: API_KEY,
    },
  }) as any;

  try {
    if (
      instance &&
      instance.interceptors &&
      instance.interceptors.response &&
      typeof instance.interceptors.response.use === "function"
    ) {
      instance.interceptors.response.use(
        (response: AxiosResponse) => {
          if ((response as any).data?.status === "error") {
            return Promise.reject(
              new Error(
                (response as any).data?.message ||
                  `API Error: status 'error' returned in success response.`
              )
            );
          }
          return response;
        },
        (error: any) => {
          const errorMessage =
            error.response?.data?.message || error.message ||
            "An unknown network error occurred.";
          return Promise.reject(new Error(errorMessage));
        }
      );
    }
  } catch(error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }

  return instance;
};

/*top headlines by category*/
export const fetchTopHeadlines = async (
  category: Category,
  page: number = 1,
  language?: string
): Promise<NewsApiResponse> => {
  try {
    const api = getNewsApi();
    const response: AxiosResponse<NewsApiResponse> = await api.get(
      "/top-headlines",
      {
        params: {
          country: "us",
          category: category,
          page: page,
          pageSize: PAGE_SIZE,
          ...(language ? { language } : {}),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch headlines:", error);
    throw error;
  }
};

/* Search news  */
export const searchNews = async (
  query: string,
  page: number = 1,
  language: string = 'en'
): Promise<NewsApiResponse> => {
  if (!query) return { status: "ok", totalResults: 0, articles: [] };

  try {
    const api = getNewsApi();
    const response: AxiosResponse<NewsApiResponse> = await api.get(
      "/everything",
      {
        params: {
          q: query,
          page: page,
          pageSize: PAGE_SIZE,
          language,
          sortBy: "publishedAt",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to search news:", error);
    throw error;
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};