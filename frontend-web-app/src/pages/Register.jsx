import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("testflowUser", JSON.stringify(user));

    setMessage("Registration successful!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Create Account</h1>

        <p className="login-subtitle">
          Register to use TestFlow
        </p>

        <form onSubmit={handleRegister}>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              data-testid="name-input"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email</label>

            <input
              id="register-email"
              data-testid="register-email-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>

            <input
              id="register-password"
              data-testid="register-password-input"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            data-testid="register-submit"
            className="login-submit"
          >
            Register
          </button>

        </form>

        {message && (
          <p
            data-testid="register-message"
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#2563eb",
            }}
          >
            {message}
          </p>
        )}

        <p className="register-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;