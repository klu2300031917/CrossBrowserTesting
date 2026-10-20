import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const cart =
    JSON.parse(localStorage.getItem("testflowCart")) || [];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    const order = {
      orderId: "TF" + Date.now(),
      customer: {
        name,
        email,
        phone,
        address,
        city,
        pincode,
      },
      payment,
      items: cart,
      total,
      orderDate: new Date().toISOString(),
    };

    localStorage.setItem(
      "testflowOrder",
      JSON.stringify(order)
    );

    localStorage.removeItem("testflowCart");

    navigate("/order-success");
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">

        <nav className="navbar">
          <div className="logo">TestFlow</div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
          </div>
        </nav>

        <div className="empty-checkout">
          <h2>Your cart is empty</h2>

          <p>
            Add products before proceeding to checkout.
          </p>

          <Link to="/products">
            <button data-testid="shop-products">
              Shop Products
            </button>
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="checkout-page">

      {/* Navigation */}
      <nav className="navbar">

        <div className="logo">
          TestFlow
        </div>

        <div className="nav-links">

          <Link to="/">Home</Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/cart">
            Cart
          </Link>

        </div>

      </nav>

      {/* Header */}
      <section className="checkout-header">

        <h1>Checkout</h1>

        <p>
          Enter your details to complete your order.
        </p>

      </section>

      {/* Checkout Content */}
      <section className="checkout-container">

        {/* Customer Form */}
        <div className="checkout-form-card">

          <h2>Customer Details</h2>

          <form onSubmit={handlePlaceOrder}>

            <div className="form-group">

              <label htmlFor="checkout-name">
                Full Name
              </label>

              <input
                id="checkout-name"
                data-testid="checkout-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="checkout-email">
                Email
              </label>

              <input
                id="checkout-email"
                data-testid="checkout-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="checkout-phone">
                Phone Number
              </label>

              <input
                id="checkout-phone"
                data-testid="checkout-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="checkout-address">
                Address
              </label>

              <textarea
                id="checkout-address"
                data-testid="checkout-address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

            </div>

            <div className="checkout-row">

              <div className="form-group">

                <label htmlFor="checkout-city">
                  City
                </label>

                <input
                  id="checkout-city"
                  data-testid="checkout-city"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="checkout-pincode">
                  Pincode
                </label>

                <input
                  id="checkout-pincode"
                  data-testid="checkout-pincode"
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />

              </div>

            </div>

            {/* Payment */}
            <h2 className="payment-title">
              Payment Method
            </h2>

            <div className="payment-options">

              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={payment === "Cash on Delivery"}
                  onChange={(e) => setPayment(e.target.value)}
                />

                Cash on Delivery

              </label>

              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="Credit/Debit Card"
                  checked={payment === "Credit/Debit Card"}
                  onChange={(e) => setPayment(e.target.value)}
                />

                Credit / Debit Card

              </label>

              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={payment === "UPI"}
                  onChange={(e) => setPayment(e.target.value)}
                />

                UPI

              </label>

            </div>

            <button
              type="submit"
              data-testid="place-order"
              className="place-order-button"
            >
              Place Order
            </button>

          </form>

        </div>

        {/* Order Summary */}
        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cart.map((item) => (

            <div
              className="checkout-item"
              key={item.id}
            >

              <div>
                <strong>
                  {item.name}
                </strong>

                <p>
                  Quantity: {item.quantity}
                </p>
              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>

          ))}

          <div className="summary-divider"></div>

          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total}
            </strong>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Checkout;