import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

import { PropTypes } from "prop-types";

const WriterRoute = ({ children }) => {
  const { token, user } = useContext(AuthContext);

  // Check if the user is authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if the user has the "writer" role
  if (user.role !== "writer") {
    return <Navigate to="/" />; // Redirect to homepage or some other page if not a writer
  }

  // Render the child components if the user is a writer
  return children ? children : <Outlet />;
};

WriterRoute.propTypes = {
  children: PropTypes.node,
};

export default WriterRoute;
