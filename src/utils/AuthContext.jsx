import { createContext, useEffect, useState } from "react";
import { login as loginUser, logout as logoutUser } from "../api/auth";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const login = async (email, password) => {
    const { response, token } = await loginUser(email, password);
    // check if the response is an error
    if (!token) {
      // display the error message
      window.alert(response.data.message);
    } else {
      // save the token in the local storage
      setToken(token);
      localStorage.setItem("token", token);
      window.alert("Login successful");
    }
  };

  const logout = () => {
    logoutUser();
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
