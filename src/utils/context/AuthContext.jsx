import { createContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  login as loginUser,
  logout as logoutUser,
} from "../../api/auth";
import { getToken, setToken as storeToken } from "../general/tokenUtil";

const AuthContext = createContext();

import { useMessage } from "../hooks/useMessage";

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const { addMessage } = useMessage();

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
      addMessage({
        text: response.data.message,
        type: "alert",
        timeout: 3000,
      });
      return false;
    } else {
      // save the token in the local storage
      setToken(token);
      storeToken(token, 3600 * 24); // store the token for 24 hours
      addMessage({
        text: "Login successful",
        type: "success",
        timeout: 3000,
      });

      return true;
    }
  };

  const logout = () => {
    logoutUser();
    setToken("");

    addMessage({
      text: "Logout successful",
      type: "success",
      timeout: 3000,
    });
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
