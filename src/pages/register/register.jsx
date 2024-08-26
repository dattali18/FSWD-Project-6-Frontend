import "../style/form.css";
import "../style/index.css";

import { useNavigate } from "react-router-dom";

import { register } from "./../../api/auth";

import { useMessage } from "../../utils/hooks/useMessage";

export default function Register() {
  const navigate = useNavigate();

  const { addMessage } = useMessage();

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const username = formData.get("username");

    if (password !== confirmPassword) {
      addMessage({
        text: "Passwords do not match",
        type: "warning",
        timeout: 3000,
      });
      return;
    }

    const registerUser = async () => {
      try {
        const response = await register(email, username, password);
        // console.log(response);
        // redirect to the login page
        // if the user is registered successfully
        if (!response) {
          addMessage({
            text: "Error registering the user.",
            type: "alert",
            timeout: 3000,
          });
          return;
        }

        addMessage({
          text: "User registered successfully",
          type: "success",
          timeout: 3000,
        });
        navigate("/login");
      } catch (error) {
        console.error(error);
        addMessage({
          text: "Error registering the user.",
          type: "alert",
          timeout: 3000,
        });
      }
    };

    registerUser();
  };

  return (
    <>
      <h1>Register</h1>
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
          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            placeholder="name@example.com"
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
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="form-input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="password"
          />
        </div>
        <button className="btn btn-blue" type="submit">
          Register
        </button>
      </form>
    </>
  );
}
