import "./style/index.css";

import Footer from "./footer.jsx";
import Navbar from "./navbar.jsx";

import { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/tokenUtil.js";

export default function Layout() {
  const navigate = useNavigate();

  // in this function we will see if we have a token in the local storage
  useCallback(() => {
    const token = getToken();

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

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
