import { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "../../data/api";

export default function Articles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const url = `${BASE_URL}/api/articles/best?time_period=week`;
            try {
                const response = await axios.get(url);
                console.log(response.data);
                setArticles(response.data);
            } catch (error) {
                // console.error(error);
            }
        };

        fetchArticles();
    }, []);

  return (
    <>
      <h1>Articles</h1>
      <h2>Read More</h2>
      <div className="articles">
        {articles.map((article) => (
          <div key={article.id} className="article">
            <p>{article.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
