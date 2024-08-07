import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../data/api";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [articles, setArticles] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (showForm) {
      navigate("/profile/edit");
    } else {
      navigate("/profile");
    }
  }, [showForm, navigate]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/articles?user_id=${user.id}`);
        setArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getArticles();
  }, [user.id]);

  useEffect(() => {
    const getLikes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/likes/${user.id}/count`);
        setLikes(response.data[0]['COUNT(*)']);
      } catch (error) {
        console.error(error);
      }
    };
    getLikes();
  }, [user.id]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/comments?user_id=${user.id}`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getComments();
  }, [user.id]);

  return (
    <>
      <h1>Welcome {user.user_name}</h1>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>

      <>
        <button
          className="btn btn-orange btn-sm"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide" : "Show"} Edit Profile
        </button>
        <Outlet />
      </>

      <h3>Your Articles</h3>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>

      <h3>Your Likes</h3>
      <p>Total Likes: {likes}</p>

      <h3>Your Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </>
  );
}
