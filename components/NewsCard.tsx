import React, { useState } from "react";
import { Article } from "../types";
import { formatDate } from "../services/api";
import { PLACEHOLDER_IMAGE } from "../constants";
import { ExternalLink } from "lucide-react";
import "./NewsCard.css";

interface NewsCardProps {
  article: Article;
  featured?: boolean;
  onClick: (article: Article) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  featured = false,
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(article.urlToImage || PLACEHOLDER_IMAGE);

  const containerClasses = `group newsCard_container ${
    featured ? "col-span-1 md:col-span-2 row-span-2" : "col-span-1"
  }`;

  const imageWrapperClasses = `newsCard_imageWrapper ${
    featured
      ? "newsCard_imageWrapper_featured"
      : "newsCard_imageWrapper_default"
  }`;

  const titleClasses = `newsCard_articleTitle ${
    featured ? "newsCard_articleTitle_featured" : ""
  }`;

  return (
    <div className={containerClasses} onClick={() => onClick(article)}>
      <div className={imageWrapperClasses}>
        <img
          src={imgSrc}
          alt={article.title}
          onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
          className="newsCard_image"
        />
        <div className="newsCard_overlay" />

        <div className="newsCard_hoverActions">
          <button
            className="newsCard_actionButton"
            onClick={(e) => {
              e.stopPropagation();
              window.open(article.url, "_blank");
            }}
          >
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      <div className="newsCard_content">
        <div className="newsCard_metaInfo">
          <span className="newsCard_sourceName">
            {article.source.name || "Unknown Source"}
          </span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        <h3 className={titleClasses}>{article.title}</h3>

        {featured && article.description && (
          <p className="newsCard_articleDescription">{article.description}</p>
        )}

        <div className="newsCard_authorInfo">
          <div className="newsCard_avatar">
            <svg
              className="newsCard_avatar_svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className="newsCard_authorDetails">
            <span className="newsCard_authorName">
              {article.author
                ? article.author.split(",")[0].slice(0, 20)
                : "Editorial"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;