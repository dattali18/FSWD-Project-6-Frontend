import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { convertToDateTime } from "../../utils/DateUtils";

import { getArticles } from "../../api/articles";

import "./articles.css";

const ARTICLES_TO_DISPLAY = 10;
const ARTICLES_PER_PAGE = 5;

export default function Articles() {
  // the articles page will have
  // 1. A top list of articles (title, categories, author, date)
  // 2. A search bar to search for articles
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

        setArticles(latestArticles);
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

    // make a filtered version of the articles
    const filteredArticles = articles.filter((article) => {
      return article.title.toLocaleLowerCase().includes(searchQuery);
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
      <div className="latest">
        <h2>Latest</h2>
        <div className="articles-list">
          {articles.map((article) => (
            <ArticleCard key={article.articleId} {...article} />
          ))}
          {articles.length === 0 && <p>No articles found</p>}
        </div>
      </div>
      <div className="search">
        <h2>Search</h2>
        <form className="search-form" onSubmit={onSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Search articles"
            name="search"
          />
          <button className="btn btn-blue">Search</button>
        </form>
        <div className="articles-list">
          {currentArticles.map((article) => (
            <ArticleCard key={article.articleId} {...article} />
          ))}
          {articles.length === 0 && (
            <p>No articles found with that search query</p>
          )}
          <br/>
          <div className="pagination-controls">
            <button
              className="btn btn-blue"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-blue"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ArticleCard(article) {
  return (
    <div className="article-card">
      {/* make the title a link to the article page */}
      <Link to={"/article/" + article.articleId}>
        <h1>{article.title}</h1>
      </Link>
      <p>{convertToDateTime(article.createdDate)}</p>
      <ul className="categories">
        {article.tags.map((category) => (
          <li className="category" key={category}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
