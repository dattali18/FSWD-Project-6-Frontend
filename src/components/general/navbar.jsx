import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { pages as allPages } from "../../data/pages";

import { useAuth } from "../../utils/hooks/useAuth";

import "./style/index.css";

export default function Navbar() {
  const { token } = useAuth();

  // if user is in context display logout link
  // else display login link

  const [pages, setPages] = useState(allPages);

  useEffect(() => {
    if (token) {
      setPages(allPages.filter((page) => page.name !== "Login"));
    } else {
      setPages(allPages.filter((page) => page.name !== "Logout"));
    }
  }, [token]);

  return (
    <>
      <nav className="nav">
        <div className="nav-logo">
          <Link to="/">User Journey</Link>
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
