import axios from "axios";
import parse from "html-react-parser";
import Prism from "prismjs";

import "prismjs/components/prism-javascript"; // Import the JavaScript language
import "prismjs/components/prism-python"; // Import the JSX language
import "prismjs/components/prism-shell-session"; // Import the JSX language

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../data/api";

import "../style/article.css";
import "../style/prism-onedark.css"; // Import Atom Dark theme

export default function Article() {
  const { id } = useParams();
  const [page, setPage] = useState("");

  // Function to add CSS class to specific tags
  const addClassToTags = (htmlString) => {
    return parse(htmlString, {
      replace: (domNode) => {
        if (
          domNode.name === "p" &&
          domNode.children &&
          domNode.children.length > 0
        ) {
          const textContent = domNode.children[0].data;
          if (textContent && textContent.startsWith("#")) {
            return <p className="tagged">{textContent}</p>;
          }
        }
      },
    });
  };

  useEffect(() => {
    const url = `${BASE_URL}/api/articles/${id}`;
    const fetchArticle = async () => {
      try {
        const response = await axios.get(url);
        const modifiedContent = addClassToTags(response.data);
        setPage(modifiedContent);
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
      <div className="article">{page}</div>
    </div>
  );
}
