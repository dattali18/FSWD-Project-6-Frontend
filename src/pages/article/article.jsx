import parse from "html-react-parser";
import { marked } from "marked";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Prism from "prismjs";
import "prismjs/components/prism-javascript"; // Import the JavaScript language
import "prismjs/components/prism-python"; // Import the JSX language
import "prismjs/components/prism-shell-session"; // Import the JSX language

import { faEnvelope, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from "../../utils/AuthContext";
import { convertToDateTime } from "../../utils/DateUtils";

import "../style/article.css";
import "../style/prism-onedark.css"; // Import Atom Dark theme

import { getArticleById } from "../../api/articles";
import { isLiked, likeArticle, unlikeArticle } from "../../api/likes";
import { getUserById } from "../../api/users";

export default function Article() {
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const [page, setPage] = useState("");
  const [article, setArticle] = useState({});
  const [writer, setWriter] = useState({});
  const [like, setLike] = useState(false);

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
    const fetchData = async () => {
      try {
        // Fetch article content
        const article_response = await getArticleById(id);
        const articleObject = article_response.data.article;
        setArticle(articleObject);

        // convert md to html using marked
        const html = marked.parse(articleObject.content);
        const modifiedContent = addClassToTags(html);
        setPage(modifiedContent);

        // Fetch writer data
        const writer_data = await getUserById(articleObject.author);
        setWriter(writer_data);

        const response = await isLiked(id);

        if (response.data) {
          setLike(true);
        }
      } catch (error) {
        console.error("Error fetching article", error);
      }
    };
    fetchData();
  }, [id, user]);

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
          <div className="page-header">
            <h1>{article.title}</h1>
            {like && <FontAwesomeIcon icon={faHeart} className="like-icon" />}
          </div>
          <h2>
            By <Link>{writer.username}</Link> On{" "}
            {convertToDateTime(article.createdDate)}
          </h2>
          <div className="article">{page}</div>
          <div className="like">
            <button
              className={
                !user
                  ? "btn-inactive btn-gray btn btn-icon"
                  : "btn btn-blue btn-icon"
              }
              onClick={() => {
                if (!user) {
                  alert("You must be logged in to like an article");
                }
                setLike(!like);

                // Send like request to the server
                if (!like) {
                  onLikeArticle(id);
                } else {
                  onUnlikeArticle(id);
                }
              }}
            >
              {like ? (
                <>
                  <FontAwesomeIcon icon={faHeart} />
                  <p>Unlike</p>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faHeart} />
                  <p>Like</p>
                </>
              )}
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
              <button type="submit" className="btn-icon btn btn-blue btn-sm">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>Post</p>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const onLikeArticle = async (article_id) => {
  try {
    // pass the user id and article id to the server in the body
    const response = await likeArticle(article_id);
    console.log(response);
  } catch (error) {
    console.error("Error liking article", error.message);
  }
};

const onUnlikeArticle = async (article_id) => {
  try {
    const response = await unlikeArticle(article_id);
    console.log(response);
  } catch (error) {
    console.error("Error unliking article", error.message);
  }
};
