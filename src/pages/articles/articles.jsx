import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../data/api";

export default function Articles() {
  // the articles page will have
  // 1. A top list of articles (title, categories, author, date)
  // 2. A search bar to search for articles
  const [LatestArticles, setLatestArticles] = useState([]);
  const [articles, setArticles] = useState([]);

  // fetch the latest articles
  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/articles/latest`);
        setLatestArticles(response.data);
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

    try {
      const response = await axios.get(
        `${BASE_URL}/api/articles/search?query=${searchQuery}`
      );
      setArticles(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <h1>Articles</h1>
      <div className="latest">
        <h2>Latest</h2>
        <div className="articles">
          {LatestArticles.map((article) => ArticleCard(article))}
        </div>
      </div>
      <div className="search">
        <h2>Search</h2>
        <form onSubmit={onSubmit}>
          <input className="form-input" type="text" placeholder="Search articles" />
          <button className="btn btn-blue">Search</button>
        </form>
        <div className="articles">
          {articles.map((article) => ArticleCard(article))}
          {articles.length === 0 && <p>No articles found with that search query</p>}
        </div>
      </div>
    </>
  );
}

function ArticleCard(article) {
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.author}</p>
      <p>{article.date}</p>
      {article.categories.map((category) => (
        <span key={category}>{category}</span>
      ))}
    </div>
  );
}
