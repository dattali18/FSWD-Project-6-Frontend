import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { PropTypes } from "prop-types";

import { isAdmin } from "../../api/admin.js";

import { useMessage } from "../hooks/useMessage.jsx";

const AdminRoute = ({ children }) => {
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { addMessage } = useMessage();

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
    addMessage({
      text: "You are not authorized to view this page",
      type: "info",
      timeout: 3000,
    });
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
