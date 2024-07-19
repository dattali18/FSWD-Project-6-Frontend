import './App.css'

// MARK: react import

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

// MARK: pages import

import Home from "./pages/home/home.jsx";
import Article from "./pages/article/article.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/articles/:id",
        element: <Article />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);

function App() {
  return (
      <>
          <RouterProvider router={router} />
      </>
  )
}

export default App
