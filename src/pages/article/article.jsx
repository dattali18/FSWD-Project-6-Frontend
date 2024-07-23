import axios from "axios";
import parse from "html-react-parser";
import Prism from "prismjs";

import "prismjs/components/prism-javascript"; // Import the JavaScript language
import "prismjs/components/prism-python"; // Import the JSX language
import "prismjs/components/prism-shell-session"; // Import the JSX language

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../data/api";

import "../style/article.css";
import "../style/prism-onedark.css"; // Import Atom Dark theme

export default function Article() {
  const { id } = useParams();
  const [page, setPage] = useState("");
  const [article, setArticle] = useState({});
  const [writer, setWriter] = useState({});

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
    const user_url = `${BASE_URL}/api/users`;
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${url}/article`);
        const article_data = await axios.get(url).data;

        const modifiedContent = addClassToTags(response.data).data;
        setPage(modifiedContent);

        setArticle(article_data);

        // get the writer's name
        const [writer] = (
          await axios.get(`${user_url}/${article_data.data.writer_id}`)
        ).data.data;
        setWriter(writer);
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
    <>
      {!article || !writer || !page ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{article.title}</h1>
          <h2>
            By <Link>{writer.user_name}</Link>
          </h2>
          <div className="article">{page}</div>
        </div>
      )}
    </>
  );
}
