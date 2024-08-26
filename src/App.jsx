import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// MARK: pages import

// Articles page
import Article from "./pages/article/article.jsx";
import Articles from "./pages/articles/articles.jsx";

// Editor Pages
import MyEditor from "./pages/editor/editor.jsx";
import UpdateEditor from "./pages/editor/updateEditor.jsx";

import Home from "./pages/home/home.jsx";

// Auth pages
import Login from "./pages/login/login.jsx";
import Logout from "./pages/logout/logout.jsx";
import EditProfile from "./pages/profile/editProfile.jsx";
import Profile from "./pages/profile/profile.jsx";
import Register from "./pages/register/register.jsx";

// Writer pages
import Writer from "./pages/writer/writer.jsx";

import Layout from "./components/general/layout.jsx";

// admin pages
import Privileges from "./pages/admin/privileges/privileges.jsx";
import UserPrivileges from "./pages/admin/privileges/userPrivileges.jsx";

// MARK: internal imports

import { AuthProvider } from "./utils/context/AuthContext.jsx";
import { MessageProvider } from "./utils/context/MessageContext.jsx";

import AdminRoute from "./utils/routes/AdminRoute.jsx";
import PrivateRoute from "./utils/routes/PrivateRoute.jsx";
import WriterRoute from "./utils/routes/WriterRoute.jsx";

import "/src/index.css";

// MARK: router definition

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
        // this is the update editor
        path: "/editor/:id",
        element: (
          <WriterRoute>
            <UpdateEditor />
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
            path: "users/:id",
            element: (
              <AdminRoute>
                <UserPrivileges />
              </AdminRoute>
            ),
          },
        ],
      },
      {
        path: "/writer/:id",
        element: <Writer />,
      },
    ],
  },
]);

// MARK: App + Providers
function App() {
  return (
    <>
      <MessageProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </MessageProvider>
    </>
  );
}

export default App;
