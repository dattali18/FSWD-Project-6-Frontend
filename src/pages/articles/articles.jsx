import { useEffect, useState } from "react";

import { getArticles } from "../../api/articles";
import ArticleCard from "../article/articleCard";

import "./articles.css";

// arrow left and right icons
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ARTICLES_TO_DISPLAY = 3;
const ARTICLES_PER_PAGE = 3;

export default function Articles() {
  // the articles page will have
  // 1. A top list of articles (title, categories, author, date)
  // 2. A search bar to search for articles
  const [articles, setArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("title");

  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);

  // fetch the latest articles
  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await getArticles();
        const articlesResponse = response.data.articles || [];

        // Sort articles by createdDate (assuming it's a valid date format)
        const sortedArticles = articlesResponse.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );

        // Keep only the latest <ARTICLES_TO_DISPLAY> articles
        const latestArticles = sortedArticles.slice(0, ARTICLES_TO_DISPLAY);

        setLatestArticles(latestArticles);
        setArticles(articlesResponse);
        setFilteredArticles(articlesResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLatestArticles();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchQuery = formData.get("search");

    // if the search query is empty, show all the articles
    if (!searchQuery) {
      setFilteredArticles(articles);
      setCurrentPage(1); // Reset page to 1 when showing all articles
      return;
    }

    // filter the articles based on the filter type
    const filteredArticles = articles.filter((article) => {
      if (filterType === "title") {
        return article.title.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (filterType === "category") {
        return article.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    });

    setFilteredArticles(filteredArticles);
    setCurrentPage(1); // Reset page to 1 on new search
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  return (
    <>
      <h1>Articles</h1>
      <div className="search">
        <h2>Search</h2>
        <form className="search-form" onSubmit={onSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Search articles"
            name="search"
          />
          <select
            name="filter-type"
            id="filter-type"
            className="form-input"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="category">Category</option>
            {/* <option value="author">Author</option> */}
          </select>
          <button className="btn btn-blue">Search</button>
        </form>
        <div className="articles-list">
          {currentArticles.map((article) => (
            <ArticleCard key={article.articleId} {...article} />
          ))}
          {articles.length === 0 && (
            <p>No articles found with that search query</p>
          )}
        </div>
        <div className="pagination-controls">
          <button
            className={
              currentPage === 1 ? "btn btn-gray btn-inactive" : "btn btn-blue"
            }
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={
              currentPage === totalPages
                ? "btn btn-gray btn-inactive"
                : "btn btn-blue"
            }
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
      <div className="latest">
        <h2>Latest</h2>
        <div className="articles-list">
          {latestArticles.map((article) => (
            <ArticleCard key={article.articleId} {...article} />
          ))}
          {latestArticles.length === 0 && <p>No articles found</p>}
        </div>
      </div>
    </>
  );
}
