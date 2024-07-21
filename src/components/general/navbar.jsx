import { Link } from "react-router-dom";
import { pages } from "../../data/pages";

export default function Navbar() {
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
                <Link to={page.url}>{page.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
