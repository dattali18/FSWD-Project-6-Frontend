import "../style/form.css";
import "../style/index.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/context/AuthContext";

export default function Login() {
  // get login from AuthContext
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const success = await login(username, password);

    e.target.reset();

    // go to the home page after login
    if (success) {
      navigate("/home");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-input"
            type="text"
            id="username"
            name="username"
            placeholder="username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
        </div>
        <button className="btn btn-blue" type="submit">
          Login
        </button>
      </form>
    </>
  );
}
