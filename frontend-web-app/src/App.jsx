import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

function Home() {
  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          TestFlow
        </div>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/cart">
            Cart
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>

      </nav>


      {/* ================= HERO SECTION ================= */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            Automated Cross-Browser Testing
          </h1>

          <p>
            A reliable and repeatable web application designed
            for end-to-end testing across multiple browsers.
          </p>

          <div className="hero-buttons">

            <Link to="/products">

              <button
                data-testid="explore-button"
              >
                Explore Application
              </button>

            </Link>

            <Link to="/login">

              <button
                className="secondary-button"
                data-testid="home-login-button"
              >
                Login
              </button>

            </Link>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features">

        <div className="feature-card">

          <div className="feature-icon">
            🌐
          </div>

          <h3>
            Cross-Browser
          </h3>

          <p>
            Test web application workflows across
            different browsers.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            ✓
          </div>

          <h3>
            Reliable Testing
          </h3>

          <p>
            Stable synchronization helps reduce
            flaky test failures.
          </p>

        </div>


        <div className="feature-card">

          <div className="feature-icon">
            🔄
          </div>

          <h3>
            Repeatable Execution
          </h3>

          <p>
            Execute the same workflows consistently
            under identical conditions.
          </p>

        </div>

      </section>


      {/* ================= TESTING WORKFLOW ================= */}

      <section className="workflow-section">

        <div className="section-heading">

          <h2>
            End-to-End Testing Workflow
          </h2>

          <p>
            Test complete user journeys from authentication
            to successful order completion.
          </p>

        </div>

        <div className="workflow">

          <div className="workflow-step">
            <span>1</span>
            <h3>Register</h3>
            <p>Create a user account.</p>
          </div>

          <div className="workflow-arrow">
            →
          </div>

          <div className="workflow-step">
            <span>2</span>
            <h3>Login</h3>
            <p>Authenticate the user.</p>
          </div>

          <div className="workflow-arrow">
            →
          </div>

          <div className="workflow-step">
            <span>3</span>
            <h3>Products</h3>
            <p>Browse and select products.</p>
          </div>

          <div className="workflow-arrow">
            →
          </div>

          <div className="workflow-step">
            <span>4</span>
            <h3>Cart</h3>
            <p>Manage selected products.</p>
          </div>

          <div className="workflow-arrow">
            →
          </div>

          <div className="workflow-step">
            <span>5</span>
            <h3>Checkout</h3>
            <p>Complete the transaction.</p>
          </div>

          <div className="workflow-arrow">
            →
          </div>

          <div className="workflow-step">
            <span>6</span>
            <h3>Success</h3>
            <p>Verify order completion.</p>
          </div>

        </div>

      </section>

    </div>
  );
}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* CART */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* ORDER SUCCESS */}
        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;