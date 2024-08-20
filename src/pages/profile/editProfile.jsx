import { useEffect, useState } from "react";

import { getCurrentUser } from "../../api/auth";
import { updateUser } from "../../api/users";

export default function EditProfile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getCurrentUser();
        const u = response.data.user || null;

        setUser(u);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const putUser = async () => {
      try {
        const response = await updateUser(user.email, user.username);
        // TODO  handle response
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
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
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
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
        </div>
        <button className="btn btn-blue">Submit</button>
      </form>
    </>
  );
}
