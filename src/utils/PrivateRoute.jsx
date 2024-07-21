import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  // if user is in context, render children, else redirect to login
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
