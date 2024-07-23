// import icon from fortawesome
import {
  faHome,
  faNewspaper,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const pages = [
  {
    name: "Home",
    url: "/",
    icon: faHome,
  },
  {
    name: "Articles",
    url: "/articles",
    icon: faNewspaper,
  },
  {
    name: "Profile",
    url: "/profile",
    icon: faUser,
  },
  {
    name: "Register",
    url: "/register",
    icon: faUserPlus,
  },
  {
    name: "Login",
    url: "/login",
    icon: faSignInAlt,
  },
  {
    name: "Logout",
    url: "/logout",
    icon: faSignOutAlt,
  },
];

export { pages };
