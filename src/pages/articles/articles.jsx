import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { convertToDateTime } from "../../utils/DateUtils";

import { getArticles } from "../../api/articles";

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
        console.log(articlesResponse);

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
        <div className="articles">
          {/* TODO: filter the article by date and show only the latest 10 */}
          {articles.map((article) => ArticleCard(article))}
          {articles.length === 0 && <p>No articles found</p>}
        </div>
      </div>
      <div className="search">
        <h2>Search</h2>
        <form onSubmit={onSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="Search articles"
            name="search"
          />
          <button className="btn btn-blue">Search</button>
        </form>
        <div className="articles">
          {filteredArticles.map((article) => ArticleCard(article))}
          {articles.length === 0 && (
            <p>No articles found with that search query</p>
          )}
        </div>
      </div>
    </>
  );
}

// TODO - Style the ArticleCard component
function ArticleCard(article) {
  return (
    <div>
      {/* make the title a link to the article page */}
      <Link to={"/article/" + article.articleId}>
        <h1>{article.title}</h1>
      </Link>
      {/* TODO make the author be the first name of the author and like to the author profile */}
      <p>{article.author}</p>
      <p>{convertToDateTime(article.createdDate)}</p>
      {article.tags.map((category) => (
        <span key={category}>{category}</span>
      ))}
    </div>
  );
}
