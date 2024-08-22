import "./App.css";

// MARK: react import

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// MARK: pages import

import Article from "./pages/article/article.jsx";
import Articles from "./pages/articles/articles.jsx";
import MyEditor from "./pages/editor/editor.jsx";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Logout from "./pages/logout/logout.jsx";
import EditProfile from "./pages/profile/editProfile.jsx";
import Profile from "./pages/profile/profile.jsx";
import Register from "./pages/register/register.jsx";

import Layout from "./components/general/layout.jsx";

// admin pages
import Privileges from "./pages/admin/privileges/privileges.jsx";

// MARK: internal imports

import { AuthProvider } from "./utils/AuthContext.jsx";

import AdminRoute from "./utils/AdminRoute.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import WriterRoute from "./utils/WriterRoute.jsx";

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
        path: "/article/:id",
        element: <Article />,
      },
      {
        path: "/articles/",
        element: <Articles />,
        children: [
          {
            path: ":id/",
            element: <Article />,
          },
        ],
      },
      {
        path: "/editor",
        element: (
          <WriterRoute>
            <MyEditor />
          </WriterRoute>
        ),
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
        path: "/profile/",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile/edit",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin",
        children: [
          {
            path: "privileges",
            element: (
              <AdminRoute>
                <Privileges />
              </AdminRoute>
            ),
          },
          {
            path: "articles",
            element: <div>Articles for admin</div>,
          },
        ],
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
