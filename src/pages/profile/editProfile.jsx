import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { BASE_URL } from "../../data/api";
import { AuthContext } from "../../utils/AuthContext";

export default function EditProfile() {
  const { user } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const url = `${BASE_URL}/api/users/${user.id}`;
    const getUser = async () => {
      try {
        // add the token auth from the localStorage
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["x-auth-token"] = token;
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
      <h1>Edit Profile</h1>
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
        <button className="btn btn-blue">Submit</button>
      </form>
    </>
  );
}
