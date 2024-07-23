import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthContext } from "../../utils/AuthContext";
import {pages as allPages} from "../../data/pages";

import "./style/index.css";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  // if user is in context display logout link
  // else display login link

  const [pages, setPages] = useState(allPages);

  useEffect(() => {
    if (user) {
      setPages(allPages.filter((page) => page.name !== "Login"));
    } else {
      setPages(allPages.filter((page) => page.name !== "Logout"));
    }
  }, [user]);

  return (
    <>
      <nav className="nav">
        <div className="nav-logo">
          <Link to="/">Journey User</Link>
        </div>
        <ul className="nav-list">
          {pages.map((page, index) => {
            return (
              <li className="nav-item" key={index}>
                <Link to={page.url}>
                <FontAwesomeIcon icon={page.icon} />
                {page.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
