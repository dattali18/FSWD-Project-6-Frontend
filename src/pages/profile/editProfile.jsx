import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../utils/AuthContext";
import {getUserById, updateUser} from "../../api/users";

export default function EditProfile() {
  const { user } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserById(user.id);
        const u = response.data.user || null;

        setUserInfo(u);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [user.id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const putUser = async () => {
      try {
        const response = updateUser(userInfo.email, userInfo.username);
        // TODO: handle response
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            className="form-input"
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
            value={userInfo.username}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="jhondoe@example.com"
            className="form-input"
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
            value={userInfo.email}
          />
        </div>
        <button className="btn btn-blue">Submit</button>
      </form>
    </>
  );
}
