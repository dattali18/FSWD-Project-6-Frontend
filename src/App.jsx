import "./App.css";

// MARK: react import

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// MARK: pages import

import Article from "./pages/article/article.jsx";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Logout from "./pages/logout/logout.jsx";
import Profile from "./pages/profile/profile.jsx";
import Register from "./pages/register/register.jsx";

import Layout from "./components/general/layout.jsx";

// MARK: internal imports

import { AuthProvider } from "./utils/AuthContext.jsx";
import PrivateRoute from "./utils/PrivateRoute";

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/articles/:id",
        element: <Article />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/logout",
        element: (
          <PrivateRoute>
            <Logout />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
