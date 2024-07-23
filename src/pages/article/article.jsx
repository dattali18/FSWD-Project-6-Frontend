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

  const convertToDateTime = (dateString) => {
    // get only the date and not the time
    // format like Tue, 01 Jan 2021
    const date = new Date(dateString);
    return date.toDateString();
  }

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
    const fetchData = async () => {
      try {
        // Fetch article content
        const article_content = await axios.get(`${url}/article`);
        const modifiedContent = addClassToTags(article_content.data);
        setPage(modifiedContent);

        // Fetch article data (title, writer_id)
        const article_data = await axios.get(url);
        setArticle(article_data.data);

        // Fetch writer data
        const writer_data = await axios.get(`${user_url}/${article_data.data.writer_id}`);
        setWriter(writer_data.data.data[0]);
      } catch (error) {
        console.error("Error fetching article", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    Prism.highlightAll();
  }, [page]);

  return (
    <>
      {!article || !writer || !page ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <div>
          <h1>{article.title}</h1>
          <h2>
            By <Link>{writer.user_name}</Link> On {convertToDateTime(article.created_at)}
          </h2>
          <div className="article">{page}</div>
        </div>
      )}
    </>
  );
}
