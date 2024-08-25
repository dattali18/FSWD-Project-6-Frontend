import parse from "html-react-parser";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Prism from "prismjs";
import "prismjs/components/prism-javascript"; // Import the JavaScript language
import "prismjs/components/prism-python"; // Import the JSX language
import "prismjs/components/prism-shell-session"; // Import the JSX language

import { marked } from "marked";

import { faEdit, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from "../../utils/AuthContext";
import { convertToDateTime } from "../../utils/DateUtils";

import "../style/article.css";
import "../style/prism-onedark.css"; // Import Atom Dark theme

import { deleteArticle, getArticleById } from "../../api/articles";
import { getCurrentUser } from "../../api/auth";
import {
  getArticleLikes,
  isLiked,
  likeArticle,
  unlikeArticle,
} from "../../api/likes";
import { getUserById } from "../../api/users";

import Comments from "../comments/comments";

export default function Article() {
  const { id } = useParams();

  const { token } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState("");
  const [article, setArticle] = useState({});
  const [writer, setWriter] = useState({});
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  // fetch all the necessary data
  useEffect(() => {
    const fetchData = async () => {
      const article_response = await fetchArticle(id);
      // check if the response is successful
      if (!article_response.article) {
        return;
      }
      const article_data = article_response.article;
      // console.log(article_data);
      setArticle(article_data);
      setPage(addClassToTags(marked.parse(article_data.content)));

      const writer_response = await fetchWriter(article_data.author);
      if (!writer_response.user) {
        return;
      }
      const writer_data = writer_response.user;
      setWriter(writer_data);

      const likes_response = await fetchArticleLikes(id);
      // console.log(likes_response);
      setLikes(likes_response);

      setIsLoading(false);
    };

    const fetchUserData = async () => {
      const user_response = await fetchUser();
      if (!user_response.user) {
        return;
      }
      const user_data = user_response.user;
      setUser(user_data);

      const liked_response = await fetchLiked(user_data.id);
      // console.log(liked_response);
      setLike(liked_response);
    };

    fetchData();
    fetchUserData();
  }, [id]);

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
    Prism.highlightAll();
  }, [page]);

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
      {isLoading ? (
        <>
          <h1>Loading..</h1>
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
          <div className="likes">
            <p>This article has been liked by {likes.length} readers.</p>
          </div>
          <div className="like">
            <button
              className={
                "btn btn-icon " +
                (!token ? "btn-inactive btn-gray" : "btn-blue")
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

const fetchArticleLikes = async (article_id) => {
  try {
    const response = await getArticleLikes(article_id);
    // check if the response is successful
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching article likes", error.message);
  }
};

const fetchLiked = async (article_id) => {
  try {
    const response = await isLiked(article_id);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching user likes", error.message);
  }
};

const fetchArticle = async (article_id) => {
  try {
    const response = await getArticleById(article_id);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching article", error.message);
  }
};

const fetchWriter = async (writer_id) => {
  try {
    const response = await getUserById(writer_id);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching writer", error.message);
  }
};

const fetchUser = async () => {
  try {
    const response = await getCurrentUser();
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};
