import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { PropTypes } from "prop-types";

import { isAdmin } from "../api/admin.js";

const WriterRoute = ({ children }) => {
  const [admin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const response = await isAdmin();
      if(response) {
        setAdmin(response.isAdmin);
      }
      setIsLoading(false);
    };

    checkAdmin();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!admin) {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

WriterRoute.propTypes = {
  children: PropTypes.node,
};

export default WriterRoute;
