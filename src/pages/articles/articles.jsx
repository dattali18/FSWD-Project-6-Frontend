import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../data/api";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [recommendationFilter, setRecommendationFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      const url = `${BASE_URL}/api/articles/best?time_period=week`;
      try {
        const response = await axios.get(url);
        setArticles(response.data);
        setFilteredArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const url = `${BASE_URL}/api/articles/categories`;
      try {
        const response = await axios.get(url);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (recommendationFilter) {
        const url = `${BASE_URL}/api/articles/recommendations?filter=${recommendationFilter}`;
        try {
          const response = await axios.get(url);
          setFilteredArticles(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        // Reset to original articles if no filter is applied
        setFilteredArticles(articles);
      }
    };

    fetchRecommendations();
  }, [recommendationFilter, articles]);

  useEffect(() => {
    setFilteredArticles(
      articles.filter(
        (article) =>
          article.title.toLowerCase().includes(search.toLowerCase()) &&
          (selectedCategory ? article.category === selectedCategory : true)
      )
    );
  }, [search, articles, selectedCategory]);

  return (
    <>
      <h1>Articles</h1>
      <div className="filters">
        <input
          className="form-input"
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="btn btn-blue"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          className="btn btn-blue"
          onClick={() => setRecommendationFilter("popular")}
        >
          Popular
        </button>
        <button
          className="btn btn-blue"
          onClick={() => setRecommendationFilter("latest")}
        >
          Latest
        </button>
        <button
          className="btn btn-blue"
          onClick={() => setRecommendationFilter("")}
        >
          Reset Recommendations
        </button>
      </div>
      <div className="articles">
        {filteredArticles.map((article) => (
          <div key={article.id} className="article">
            <p>{article.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
