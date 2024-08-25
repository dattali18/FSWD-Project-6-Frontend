import "./style/index.css";

import Footer from "./footer.jsx";
import Navbar from "./navbar.jsx";

import { Outlet } from "react-router-dom";

export default function Layout() {
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
