import "../style/index.css";

import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";

export default function Logout() {
  // perform logout
  const { logout } = useContext(AuthContext);

  const onClick = () => {
    logout();
  };

  return (
    <div>
      <h1>Logout</h1>
      <div>
        <p className="inline">Click here to </p>
        <button onClick={onClick} className="btn btn-blue btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
}
