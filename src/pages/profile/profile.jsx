import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// icons
// pencil icon
import { FaPencilAlt } from "react-icons/fa";

import { AuthContext } from "../../utils/AuthContext";

import { getArticleByAuthor } from "../../api/articles";
import { getUserComments } from "../../api/comments";
import { getUserLikes } from "../../api/likes";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [articles, setArticles] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  // 1. check if user is writer if not don't display articles
  // 2. get articles by user
  // 3. get the comments by user and articles

  // useEffect(() => {
  //   // check if the user is a writer
  //   if (user.is_writer) {
  //     const getArticles = async () => {
  //       try {
  //         const response = await getArticleByAuthor(user.id);
  //         setArticles(response.data.articles);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     getArticles();
  //   }

  //   const getLikes = async () => {
  //     try {
  //       const response = await getUserLikes(user.id);
  //       setLikes(response.data.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const getComments = async () => {
  //     try {
  //       const response = await getUserComments(user.id);
  //       setComments(response.data.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getLikes();
  //   getComments();
  // }, [user]);

  // if the user is a writer add a + button to add articles
  // will link to /editor

  return (
    <>
      <div className="container">
        <h1>Welcome {user.username}</h1>
        {user.is_writer == 1 && (
          <>
            <Link to="/editor">
              <button className="btn btn-blue btn-sm btn-icon">
                <FaPencilAlt />
                Add Article
              </button>
            </Link>
          </>
        )}
      </div>
      <h2>Profile</h2>

      <Link to="/profile/edit">
        <button className="btn btn-blue btn-sm btn-icon">
          <FaPencilAlt />
          Edit
        </button>
      </Link>

      {user.is_writer == 1 && (
        <div className="user-articles">
          <h3>Your Articles</h3>
          <ul>
            {articles.map((article) => (
              <li key={article.id}>{article.title}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="user-comments">
        <h3>Your Comments</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </div>

      <div className="user-likes">
        <h3>Your Likes</h3>
        <ul>
          {likes.map((like) => (
            <li key={like.id}>{like.article.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
