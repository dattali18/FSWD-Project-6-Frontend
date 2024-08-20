import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  // if user is in context, render children, else redirect to login
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
