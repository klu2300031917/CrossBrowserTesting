import { Link } from "react-router-dom";

function OrderSuccess() {
  const order =
    JSON.parse(localStorage.getItem("testflowOrder"));

  return (
    <div className="success-page">

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

        </div>

      </nav>

      <div className="success-card">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        {order && (
          <>
            <p>
              Thank you, {order.customer.name}.
            </p>

            <p className="order-number">
              Order ID: {order.orderId}
            </p>

            <p>
              Total Amount:
              <strong> ₹{order.total}</strong>
            </p>
          </>
        )}

        <div className="success-buttons">

          <Link to="/products">
            <button data-testid="continue-shopping">
              Continue Shopping
            </button>
          </Link>

          <Link to="/">
            <button className="secondary-success-button">
              Go Home
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;