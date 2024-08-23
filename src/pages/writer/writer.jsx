/**
 * @desc page for writer (showing all articles)
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getArticleByAuthor } from "../../api/articles";
import { getUserById } from "../../api/users";

import ArticleCard from "../article/articleCard";

const ARTICLES_PER_PAGE = 4;

export default function Writer() {
  const { id } = useParams();

  const [articles, setArticles] = useState([]);
  const [author, setAuthor] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  useEffect(() => {
    const fetchArticlesByWriter = async () => {
      try {
        const response = await getArticleByAuthor(id);
        const articleSorted = response.data.articles.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        setArticles(articleSorted);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAuthor = async () => {
      try {
        const response = await getUserById(id);
        setAuthor(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticlesByWriter();
    fetchAuthor();
  }, [id]);

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
  const currentArticles = articles.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Welcome to {author.username}</h1>
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
  );
}
