import { createContext, useEffect, useState } from "react";
import { login as loginUser, logout as logoutUser } from "../api/auth";
import { getCurrentUser } from "../api/auth";
import { getToken, setToken as StoreToken } from "./tokenUtil";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = getToken();
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    // Fetch the current user only if there's a token
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await getCurrentUser();
          setUser(response.data.user); // Update user state with fetched data
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null); // In case of error, reset user state
        }
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const { response, token } = await loginUser(email, password);
    // check if the response is an error
    if (!token) {
      // display the error message
      window.alert(response.data.message);
    } else {
      // save the token in the local storage
      setToken(token);
      StoreToken(token, 3600 * 24); // 1 hour token expiration
      window.alert("Login successful");
    }
  };

  const logout = () => {
    logoutUser();
    setToken("");

    window.alert("Logout successful");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
