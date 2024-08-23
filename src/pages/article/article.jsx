import parse from "html-react-parser";
import { marked } from "marked";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Prism from "prismjs";
import "prismjs/components/prism-javascript"; // Import the JavaScript language
import "prismjs/components/prism-python"; // Import the JSX language
import "prismjs/components/prism-shell-session"; // Import the JSX language

import { faEdit, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from "../../utils/AuthContext";
import { convertToDateTime } from "../../utils/DateUtils";

import "../style/article.css";
import "../style/prism-onedark.css"; // Import Atom Dark theme

import { deleteArticle, getArticleById } from "../../api/articles";
import { getCurrentUser } from "../../api/auth";
import { isLiked, likeArticle, unlikeArticle } from "../../api/likes";
import { getUserById } from "../../api/users";

import Comments from "../comments/comments";

export default function Article() {
  const { id } = useParams();

  const { token } = useContext(AuthContext);

  const [page, setPage] = useState("");
  const [article, setArticle] = useState({});
  const [writer, setWriter] = useState({});
  const [like, setLike] = useState(false);

  const [user, setUser] = useState({});

  const navigate = useNavigate();

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
        setWriter(writer_data.data.user);

        const response = await isLiked(id);

        if (response.data) {
          setLike(true);
        }
      } catch (error) {
        console.error("Error fetching article", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    Prism.highlightAll();
  }, [page]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCurrentUser();
      setUser(response.data.user);
    };

    fetchData();
  }, []);

  const deleteOnClick = async () => {
    // check with the user if they are sure they want to delete the article
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await deleteArticle(id);
      if (response.status === 200) {
        navigate("/articles");
      }
    } catch (error) {
      console.error("Error deleting article", error);
      window.alert("Error deleting article");
    }
  };

  return (
    <>
      {!article || !writer || !page ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <div>
          {writer.id === user.id && (
            <div className="options">
              <Link
                // added the new path in the router + the page
                to={`/editor/${id}`}
                className="btn btn-blue btn-icon btn-sm"
              >
                <FontAwesomeIcon icon={faEdit} />
                <p>Edit</p>
              </Link>
              <button
                onClick={deleteOnClick}
                className="btn btn-icon btn-red btn-sm"
              >
                <FontAwesomeIcon icon={faTrash} />
                <p>Delete</p>
              </button>
            </div>
          )}
          <div className="page-header">
            <h1>{article.title}</h1>
            {like && <FontAwesomeIcon icon={faHeart} className="like-icon" />}
          </div>
          <h2>
            By <Link to={"/writer/" + writer.id}>{writer.username}</Link> On{" "}
            {convertToDateTime(article.createdDate)}
          </h2>
          <div className="article">{page}</div>
          <div className="like">
            <button
              className={
                !token
                  ? "btn-inactive btn-gray btn btn-icon"
                  : "btn btn-blue btn-icon"
              }
              onClick={() => {
                if (!token) {
                  alert("You must be logged in to like an article");
                  return;
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

          <Comments articleId={id} user={user} />
        </div>
      )}
    </>
  );
}

const onLikeArticle = async (article_id) => {
  try {
    // pass the user id and article id to the server in the body
    await likeArticle(article_id);
  } catch (error) {
    console.error("Error liking article", error.message);
  }
};

const onUnlikeArticle = async (article_id) => {
  try {
    await unlikeArticle(article_id);
  } catch (error) {
    console.error("Error unliking article", error.message);
  }
};
