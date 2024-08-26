import { useEffect, useState } from "react";

import { getCurrentUser } from "../../api/auth";
import { updateUser } from "../../api/users";

export default function EditProfile() {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("user");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data.user);
        setRole(response.data.user.role);
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
        await updateUser(user.email);
        // console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    putUser();
  };

  return (
    <>
      <h1>Change Email</h1>
      <form onSubmit={onSubmit} className="form">
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

      <h1>Request privileges</h1>
      <form className="form">
        <div className="input-group">
          <label htmlFor="role">Select Role</label>
          <select
            name="role"
            id="role"
            className="form-input"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="user">User</option>
            <option value="writer">Writer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="btn btn-blue">Submit</button>
      </form>
    </>
  );
}
