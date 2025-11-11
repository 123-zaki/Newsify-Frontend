import React from "react";
import { Link } from "react-router-dom";

export default function News({ article, ind }) {
  // console.log(article)
  function handleExternalOpen(e) {
    e.preventDefault();
    e.stopPropagation();
    window.open(article.url, "_blank", "noopener,noreferrer");
  }
  return (
    <div className="h-full shadow-md rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
      <Link
        to={`/article/${encodeURIComponent(ind)}`}
        state={{ article }}
        className="no-underline block h-full relative bg-(--bg)"
      >
        <div className="bg-(--bg) text(--text)">
          <img
            src={
              article.urlToImage ||
              "https://images.unsplash.com/photo-1503264116251-35a269479413?blur=80&auto=format&fit=crop&w=800&q=20"
            }
            alt="news-image"
            className="w-full h-48 object-cover"
          />
          <div className="p-3 flex flex-col flex-1">
            <h2 className="text-2xl font-semibold mb-2 text-(--text)">
              {article.title}
            </h2>
            <p className="mb-8 text-(--text)">{article.description}</p>
            <button
              onClick={handleExternalOpen}
              aria-label={`Open Source Article: ${article.title}`}
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline absolute bottom-2 self-center cursor-pointer mt-auto"
            >
              Read More →
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
