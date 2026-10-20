import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Get registered user from LocalStorage
    const storedUser = localStorage.getItem("testflowUser");

    if (!storedUser) {
      setSuccess(false);
      setMessage("No account found. Please register first.");
      return;
    }

    const user = JSON.parse(storedUser);

    // Validate login credentials
    if (email === user.email && password === user.password) {
      localStorage.setItem("testflowLoggedIn", "true");

      setSuccess(true);
      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } else {
      setSuccess(false);
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login to continue to TestFlow
        </p>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              data-testid="email-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          {/* Password */}
          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              data-testid="password-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            data-testid="login-submit"
            className="login-submit"
          >
            Login
          </button>

        </form>

        {/* Login Message */}
        {message && (
          <p
            data-testid="login-message"
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: success ? "#16a34a" : "#dc2626",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        {/* Register Link */}
        <p className="register-text">

          Don't have an account?

          <Link to="/register">
            {" "}Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;