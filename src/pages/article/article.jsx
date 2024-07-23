import axios from "axios";
import parse from "html-react-parser";
import { useContext, useEffect, useState } from "react";

import Prism from "prismjs";
import "prismjs/components/prism-javascript"; // Import the JavaScript language
import "prismjs/components/prism-python"; // Import the JSX language
import "prismjs/components/prism-shell-session"; // Import the JSX language

import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../data/api";
import { AuthContext } from "../../utils/AuthContext";
import { convertToDateTime } from "../../utils/DateUtils";

import "../style/article.css";
import "../style/prism-onedark.css"; // Import Atom Dark theme

export default function Article() {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

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
        const writer_data = await axios.get(
          `${user_url}/${article_data.data.writer_id}`
        );
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
            By <Link>{writer.user_name}</Link> On{" "}
            {convertToDateTime(article.created_at)}
          </h2>
          <div className="article">{page}</div>
          {/* TODO: adding a like button + comment section */}
          <div className="like">
            <button
              className={!user ? "btn-inactive btn-gray btn" : "btn btn-blue"}
              onClick={() => {
                if (!user) {
                  alert("You must be logged in to like an article");
                }
              }}
            >
              Like
            </button>
          </div>
          <div className="comments-sec">
            <form className="form">
              <div className="input-group">
                <label htmlFor="comment">Comment</label>
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  className="form-input"
                  placeholder="Your comment..."
                />
              </div>
              <button type="submit" className="btn btn-blue btn-sm">
                Post
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
