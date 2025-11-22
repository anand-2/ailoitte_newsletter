import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  loading: boolean;
  error: string | null;
  articlesLength: number;
  page: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  loading,
  error,
  articlesLength,
  page,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  if (loading || error || articlesLength === 0) {
    return null;
  }

  return (
    <div className="news_home_pagination_bar">
      <div className="news_home_pagination_info">
        Showing page{" "}
        <span className="news_home_pagination_page_number">
          {page}
        </span>{" "}
        of{" "}
        <span className="news_home_pagination_page_number">
          {totalPages}
        </span>
      </div>
      <div className="news_home_pagination_buttons">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="news_home_page_button news_home_prev_button"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className="news_home_page_button news_home_next_button"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;