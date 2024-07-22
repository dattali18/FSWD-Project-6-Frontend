import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../data/api";

import Prism from "prismjs";
import "../style/prism-onedark.css"; // Import the Prism CSS file
import "prismjs/components/prism-javascript"; // Import the JavaScript language

import "../style/article.css";

export default function Article() {
  // get the id of the article from the url
  const { id } = useParams();

  // the page is an HTML file
  const [page, setPage] = useState("");

  useEffect(() => {
    const url = `${BASE_URL}/api/articles/${id}`;
    const fetchArticle = async () => {
      try {
        const response = await axios.get(url);
        setPage(response.data);
        Prism.highlightAll(); // Highlight code after setting the page content
      } catch (error) {
        console.error("Error fetching article", error);
      }
    };
    fetchArticle();
  }, [id]);

  useEffect(() => {
    Prism.highlightAll();
  }, [page]);

  return (
    <div>
      <h1>Article</h1>
      <div className="article" dangerouslySetInnerHTML={{ __html: page }}></div>
    </div>
  );
}
