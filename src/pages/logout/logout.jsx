import "../style/index.css";

import { useAuth } from "../../utils/hooks/useAuth";

import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Logout() {
  // perform logout
  const { logout } = useAuth();

  const onClick = () => {
    logout();
  };

  return (
    <div>
      <h1>Logout</h1>
      <div className="inline">
        <p>Click here to </p>
        <button onClick={onClick} className="btn btn-blue btn-icon">
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      </div>
    </div>
  );
}
