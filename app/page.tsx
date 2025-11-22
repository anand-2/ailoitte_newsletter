"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, ChevronRight, ArrowLeft } from "lucide-react";
import { Category, Article } from "../types";
import { CATEGORIES, PAGE_SIZE } from "../constants";
import { fetchTopHeadlines, searchNews, formatDate } from "../services/api";
import NewsCard from "../components/NewsCard";
import NavBar from "../components/NavBar";
import PaginationControls from "../components/PaginationControls";
import AppFooter from "../components/AppFooter";
import "./homePage.css";

const CategoryPill: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => {
  const pillClasses = `
    news_home_category_pill 
    ${
      active
        ? "news_home_category_pill_active" : "news_home_category_pill_inactive"
    }
  `;

  return (
    <button onClick={onClick} className={pillClasses}>
      {label}
    </button>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination State
  const [activeCategory, setActiveCategory] = useState<Category>(() => {
    try {
      const saved = localStorage.getItem("newsletter:lastCategory");
      return saved ? (saved as Category) : Category.GENERAL;
    } catch (e) {
      return Category.GENERAL;
    }
  });
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    try {
      return localStorage.getItem("newsletter:lastSearch") || "";
    } catch (e) {
      return "";
    }
  });
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== "") {
      setIsSearching(true);
      setPage(1);
    }
  }, []);

  // Fetch News
  const loadNews = useCallback(
    async (resetPage = false) => {
      setLoading(true);
      setError(null);

      try {
        const currentPage = resetPage ? 1 : page;
        let response;
        if (isSearching && searchQuery) {
          response = await searchNews(searchQuery, currentPage);
        } else {
          response = await fetchTopHeadlines(activeCategory, currentPage);
        }

        setArticles(response.articles);
        setTotalResults(response.totalResults);
      } catch (err: any) {
        setError(err.message || "Something went wrong fetching the news.");
      } finally {
        setLoading(false);
      }
    },
    [activeCategory, searchQuery, page, isSearching]
  );

  useEffect(() => {
    if (!isSearching) {
      setPage(1);
      loadNews(true);
    }
  }, [activeCategory, isSearching]);

  useEffect(() => {
    try {
      localStorage.setItem("newsletter:lastSearch", searchQuery);
    } catch (e) {}
  }, [searchQuery]);

  useEffect(() => {
    try {
      localStorage.setItem("newsletter:lastCategory", activeCategory);
    } catch (e) {}
  }, [activeCategory]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // Search Handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (query.trim() === "") {
      setIsSearching(false);
      setPage(1);
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(true);
      setPage(1); 
    }, 800);
  };

  // Pagination Handlers
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderArticleDetail = (): React.ReactElement | null => {
    if (!selectedArticle) return null;
    return (
      <div className="animate_fadeIn news_home_detail_container">
        <button
          onClick={() => setSelectedArticle(null)}
          className="news_home_detail_back_button group"
        >
          <ArrowLeft size={20} className="news_home_detail_back_icon" />
          Back to News
        </button>

        <article className="news_home_article_card">
          <div className="news_home_detail_image_wrapper">
            <img
              src={selectedArticle.urlToImage || ""}
              alt={selectedArticle.title}
              className="news_home_detail_image"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
            <div className="news_home_detail_image_gradient" />
            <div className="news_home_detail_header">
              <div className="news_home_detail_meta">
                <span className="news_home_detail_source_pill">
                  {selectedArticle.source.name}
                </span>
                <span>{formatDate(selectedArticle.publishedAt)}</span>
              </div>
              <h1 className="news_home_detail_title">
                {selectedArticle.title}
              </h1>
            </div>
          </div>

          <div className="news_home_detail_body">
            <div className="news_home_prose">
              <p className="news_home_description">
                {selectedArticle.description}
              </p>
              <div className="news_home_separator" />
              <p className="news_home_article_content">
                {selectedArticle.content
                  ? selectedArticle.content.replace(/\[\+\d+ chars\]/, "")
                  : "To read the full story, please visit the source website."}
              </p>
            </div>

            <div className="news_home_continue_reading_box">
              <h3 className="news_home_continue_reading_title">
                Continue Reading
              </h3>
              <p className="news_home_continue_reading_text">
                This article is available in full on the publishers website.
                Click the button below to read more.
              </p>
              <a
                href={selectedArticle.url}
                target="_blank"
                rel="noreferrer"
                className="news_home_read_full_button"
              >
                Read Full Article <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </article>
      </div>
    );
  };

  const renderNewsGrid = (): React.ReactElement => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`rounded-xl bg-stone-200 dark:bg-stone-800 h-80 ${
                i === 0 ? "md:col-span-2 row-span-2 h-full" : ""
              }`}
            ></div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="news_home_state_box news_home_error_box">
          <div className="news_home_error_icon">!</div>
          <h3 className="news_home_error_title">Unable to load news</h3>
          <p className="news_home_error_message max-w-md">{error}</p>
          <button
            onClick={() => loadNews(false)}
            className="news_home_error_button"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (articles.length === 0) {
      return (
        <div className="news_home_state_box news_home_empty_box">
          <Search className="news_home_empty_icon" />
          <h3 className="news_home_empty_title">No articles found</h3>
          <p className="news_home_empty_text">
            Try adjusting your search or category.
          </p>
        </div>
      );
    }

    return (
      <div className="news_home_grid">
        {articles.map((article, idx) => (
          <NewsCard
            key={`${article.url}-${idx}`}
            article={article}
            featured={idx === 0 && page === 1 && !isSearching}
            onClick={setSelectedArticle}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="news_home_app_container">
      <NavBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        setActiveCategory={setActiveCategory}
        setIsSearching={setIsSearching}
        setSearchQuery={setSearchQuery}
        setSelectedArticle={setSelectedArticle}
        activeCategory={activeCategory}
      />

      <main className="news_home_main">
        <div className="news_home_content_area">
          {selectedArticle ? (
            renderArticleDetail()
          ) : (
            <>
              <div className="news_home_grid_header_group">
                <h1 className="news_home_main_title">
                  {isSearching ? `Results for "${searchQuery}"` : "Latest News"}
                </h1>
                {!isSearching && (
                  <p className="news_home_date_text">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>

              {!isSearching && (
                <div className="news_home_categories_strip">
                  {CATEGORIES.map((cat) => (
                    <CategoryPill
                      key={cat.value}
                      label={cat.label}
                      active={activeCategory === cat.value}
                      onClick={() => {
                        setActiveCategory(cat.value);
                        setIsSearching(false);
                        setSearchQuery("");
                        setPage(1);
                      }}
                    />
                  ))}
                </div>
              )}

              {renderNewsGrid()}

              <PaginationControls
                loading={loading}
                error={error}
                articlesLength={articles.length}
                page={page}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </>
          )}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
