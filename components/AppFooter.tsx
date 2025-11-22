import React from "react";

const AppFooter: React.FC = () => {
  return (
    <footer className="news_home_footer">
      <div className="news_home_footer_inner">
        <h2 className="news_home_footer_logo">NewsLetter</h2>
        <div className="news_home_footer_links">
          <a href="#" className="news_home_footer_link">
            Privacy Policy
          </a>
          <a href="#" className="news_home_footer_link">
            Terms of Service
          </a>
          <a href="#" className="news_home_footer_link">
            Contact
          </a>
        </div>
        <p className="news_home_footer_copyright">
          © 2024 NewsLetter. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;