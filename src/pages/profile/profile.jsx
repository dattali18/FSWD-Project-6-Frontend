import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// icons
// pencil icon
import { FaPencilAlt } from "react-icons/fa";

import { BASE_URL } from "../../data/api";
import { AuthContext } from "../../utils/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [articles, setArticles] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  // FIXME: add the needed call to the backend

  // 1. check if user is writer if not don't display articles
  // 2. get articles by user
  // 3. get the comments by user and articles

  return (
    <>
      <h1>Welcome {user.user_name}</h1>
      <h2>Profile</h2>

      <Link to="/profile/edit">
        <button className="btn btn-blue btn-sm btn-icon">
          <FaPencilAlt />
          Edit
        </button>
      </Link>

      <div className="user-articles">
        <h3>Your Articles</h3>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      </div>

      <div className="user-comments">
        <h3>Your Comments</h3>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
