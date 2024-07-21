import "../style/index.css";

import axios from "axios";

import { BASE_URL } from "../../data/api";

import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const url = `${BASE_URL}/api/auth/register`;

    const registerUser = async () => {
      try {
        const response = await axios.post(url, { email, password });
        console.log(response);
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }

    registerUser();
  };

  return (
    <>
      <h1>Register</h1>
      <form className="form" onSubmit={onSubmit}>
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
