import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useMessage } from "../../../utils/hooks/useMessage";

import { getUserById, updateUserPrivileges } from "../../../api/admin";

export default function UserPrivileges() {
  const { id } = useParams();

  const { addMessage } = useMessage();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data);
        setRole(response.data.role);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // call api to update user role
      const response = await updateUserPrivileges(id, role);

      if (response.status === 200) {
        addMessage({
          text: "User role updated",
          type: "success",
          timeout: 3000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="privileges">
      <h1>privileges for {user.username}</h1>
      <h2>Current Role: {user.role}</h2>

      <form className="form" onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="role">Role </label>
          <select
            name="role"
            id="user-role"
            className="form-input"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="admin">Admin</option>
            <option value="writer">Writer</option>
            <option value="user">User</option>
          </select>
        </div>
        <button type="submit" className="btn btn-blue">
          Save
        </button>
      </form>
    </div>
  );
}
