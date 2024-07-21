import "./style/index.css";

import { AuthContext } from "../../utils/AuthContext.jsx";
import Footer from "./footer.jsx";
import Navbar from "./navbar.jsx";

import { useCallback, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  // in this function we will see if we have a token in the local storage
  useCallback(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setUser(user);
    } else {
      navigate("/login");
    }
  }, [navigate, setUser]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
