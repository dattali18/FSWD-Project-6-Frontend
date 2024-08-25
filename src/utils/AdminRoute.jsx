import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { PropTypes } from "prop-types";

import { isAdmin } from "../api/admin.js";

const AdminRoute = ({ children }) => {
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await isAdmin();
      if (response) {
        setAdmin(response.data.isAdmin);
      }
      setIsLoading(false);
    };

    checkAdmin();
  }, []);

  if (isLoading) {
    return <h1>Checking Credential...</h1>;
  }

  if (!admin) {
    window.alert("You are not authorized to view this page");
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
