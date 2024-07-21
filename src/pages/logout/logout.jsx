import "../style/index.css";

import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import { Link } from "react-router-dom";

export default function Logout() {
  // perform logout
  const { logout } = useContext(AuthContext);

  logout();

  return (
    <div>
      <h1>Logout</h1>
      <p>You have been logged out</p>
      <p>
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
