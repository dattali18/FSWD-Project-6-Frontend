import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../../api/admin";

import "./privileges.css";

// arrow left and right icons
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PRIVILEGES_PER_PAGE = 5;

export default function Privileges() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / PRIVILEGES_PER_PAGE);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * PRIVILEGES_PER_PAGE;
  const endIndex = startIndex + PRIVILEGES_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Privileges</h1>
      <div className="users-privileges">
        <ul className="users">
          {currentUsers.map((user) => (
            <li className="user" key={user.id}>
              <p className="user-username"> {user.username}</p>
              <Link to={"/admin/users/" + user.id}>{user.role}</Link>
            </li>
          ))}
        </ul>
        <div className="pagination-controls">
          <button
            className={
              currentPage === 1 ? "btn btn-gray btn-inactive" : "btn btn-blue"
            }
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={
              currentPage === totalPages
                ? "btn btn-gray btn-inactive"
                : "btn btn-blue"
            }
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
