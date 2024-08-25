import "./style/index.css";

import Footer from "./footer.jsx";
import Navbar from "./navbar.jsx";

import MessageBar from "./messageBar.jsx";

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <MessageBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
