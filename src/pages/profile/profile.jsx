import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// icons
// pencil icon
import { FaPencilAlt } from "react-icons/fa";

import { getArticleByAuthor } from "../../api/articles";
import { getCurrentUser } from "../../api/auth";
import { getUserComments } from "../../api/comments";
import { getUserLikes } from "../../api/likes";
import { RiInsertColumnRight } from "react-icons/ri";

export default function Profile() {
  const [user, setUser] = useState({});

  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    let u = {};
    const fetchUser = async () => {
      const response = await getCurrentUser();

      u = response.data.user || {};
      setUser(u);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await getArticleByAuthor(user.id);
      setArticles(response.data.articles);
    };

    const fetchComments = async () => {
      const response = await getUserComments(user.id);
      setComments(response.data || []);
    };

    const fetchLikes = async () => {
      const response = await getUserLikes(user.id);
      setLikes(response.data || []);
    };

    fetchArticles();
    fetchComments();
    fetchLikes();
  }, [user]);

  return (
    <>
      <div className="container">
        <h1>Welcome {user.username}</h1>
        {user.role == "writer" && (
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

      {user.role == "writer" && (
        <div className="user-articles">
          <h3>Your Articles</h3>
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                <Link to={"/article/" + article.articleId}>
                  {article.title}
                </Link>
              </li>
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
            <li key={like.id}>
              <Link to={"/article/" + like.article_id}>{like.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
