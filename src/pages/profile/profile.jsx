import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/AuthContext";

import axios from "axios";

import { BASE_URL } from "../../data/api";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // use axios to get user info
    const url = `${BASE_URL}/api/users/${user.id}`;
    const getUser = async () => {
      try {
        const response = await axios.get(url);
        const [user_] = response.data.data;

        setUserInfo(user_);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [user.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/api/users/${user.id}`;
    const putUser = async () => {
      try {
        const response = await axios.put(url, userInfo);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    putUser();
  };

  return (
    <>
      <h1>Welcome {user.user_name}</h1>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <button
        className="btn btn-orange btn-sm"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide" : "Show"} Form
      </button>
      {showForm && (
        <form onSubmit={onSubmit} className="form">
          <div className="input-group">
            <label htmlFor="user_name">Username</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              placeholder="username"
              className="form-input"
              onChange={(e) =>
                setUserInfo({ ...userInfo, user_name: e.target.value })
              }
              value={userInfo.user_name}
            />
          </div>
          <div className="input-group">
            <label htmlFor="first_name">First name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="John"
              className="form-input"
              onChange={(e) =>
                setUserInfo({ ...userInfo, first_name: e.target.value })
              }
              value={userInfo.first_name}
            />
          </div>
          <div className="input-group">
            <label htmlFor="last_name">Last name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Doe"
              className="form-input"
              onChange={(e) =>
                setUserInfo({ ...userInfo, last_name: e.target.value })
              }
              value={userInfo.last_name}
            />
          </div>
          <button className="btn btn-blue">Add Info</button>
        </form>
      )}
    </>
  );
}
