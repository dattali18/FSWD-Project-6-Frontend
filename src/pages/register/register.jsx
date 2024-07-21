import "../style/index.css";

export default function Register() {
  const onSubmit = (e) => {
    e.preventDefault();
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
