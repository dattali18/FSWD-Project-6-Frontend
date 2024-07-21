import { useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {

    const { user } = useContext(AuthContext);

    console.log(user);

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
