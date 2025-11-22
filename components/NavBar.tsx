import React from "react";
import {
  Menu,
  X,
  Search,
  Moon,
  Sun,
} from "lucide-react";

import { Category } from "@/types";


interface NavBarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setActiveCategory: (category: Category) => void;
  setIsSearching: (isSearching: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedArticle: (article: any | null) => void;
  activeCategory: Category;
}

const NavBar: React.FC<NavBarProps> = ({
  darkMode,
  setDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  searchQuery,
  handleSearch,
  setActiveCategory,
  setIsSearching,
  setSearchQuery,
  setSelectedArticle,
  activeCategory,
}) => {
  const handleHomeClick = () => {
    setSelectedArticle(null);
    setActiveCategory(Category.GENERAL);
    setIsSearching(false);
    setSearchQuery("");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="news_home_nav">
      <div className="news_home_nav_inner">
        <div className="news_home_nav_left">
          <button
            className="lg:hidden news_home_menu_toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <button onClick={handleHomeClick} className="news_home_logo">
            NewsLetter<span className="news_home_logo_dot">.</span>
          </button>
        </div>

        <div className="news_home_desktop_links">
          <button
            onClick={handleHomeClick}
            className={`news_home_nav_link ${
              activeCategory === Category.GENERAL && !setSelectedArticle
                ? "news_home_nav_link_active"
                : ""
            }`}
          >
            Home
          </button>
          <button className="news_home_nav_link news_home_nav_link_disabled">
            Latest News
          </button>
          <button className="news_home_nav_link news_home_nav_link_disabled">
            Reviews
          </button>
        </div>

        <div className="news_home_nav_right">
          <div className="news_home_search_wrapper group">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="news_home_search_input"
            />
            <Search className="news_home_search_icon" size={16} />
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="news_home_theme_toggle_button"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="news_home_contact_button">Contact Us</button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="news_home_mobile_overlay animate_slideDown">
          <div className="news_home_mobile_search_wrapper">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearch}
              className="news_home_mobile_search_input"
            />
            <Search className="news_home_mobile_search_icon" size={18} />
          </div>
          <button onClick={handleHomeClick} className="news_home_mobile_link">
            Home
          </button>
          <button className="news_home_mobile_link news_home_mobile_link_disabled">
            Latest News
          </button>
          <button className="news_home_mobile_link news_home_mobile_link_disabled">
            Reviews
          </button>
          <button className="news_home_mobile_link news_home_mobile_link_contact">
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;