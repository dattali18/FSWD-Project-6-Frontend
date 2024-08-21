import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { convertToDateTime } from "../../utils/DateUtils";

import { getArticles } from "../../api/articles";

import "./articles.css";

const ARTICLES_TO_DISPLAY = 10;

export default function Articles() {
  // the articles page will have
  // 1. A top list of articles (title, categories, author, date)
  // 2. A search bar to search for articles
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

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
      return;
    }

    // make a filtered version of the articles
    const filteredArticles = articles.filter((article) => {
      return article.title.toLocaleLowerCase().includes(searchQuery);
    });
    setFilteredArticles(filteredArticles);
  };

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
          {filteredArticles.map((article) => (
            <ArticleCard key={article.articleId} {...article} />
          ))}
          {articles.length === 0 && (
            <p>No articles found with that search query</p>
          )}
          {/* TODO add pagination to this part */}
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
