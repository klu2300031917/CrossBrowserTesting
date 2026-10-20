import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart() {

  // Read cart immediately when component loads
  const [cart, setCart] = useState(() => {
    try {
      const storedCart =
        localStorage.getItem("testflowCart");

      return storedCart
        ? JSON.parse(storedCart)
        : [];
    } catch (error) {
      console.error(
        "Failed to read cart:",
        error
      );

      return [];
    }
  });

  const navigate = useNavigate();


  // =========================================
  // UPDATE CART
  // =========================================

  const saveCart = (updatedCart) => {

    setCart(updatedCart);

    localStorage.setItem(
      "testflowCart",
      JSON.stringify(updatedCart)
    );
  };


  const updateCart = (
    productId,
    quantity
  ) => {

    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map(
      (item) =>
        item.id === productId
          ? {
              ...item,
              quantity
            }
          : item
    );

    saveCart(updatedCart);
  };


  // =========================================
  // REMOVE PRODUCT
  // =========================================

  const removeFromCart = (productId) => {

    const updatedCart = cart.filter(
      (item) =>
        item.id !== productId
    );

    saveCart(updatedCart);
  };


  // =========================================
  // CLEAR CART
  // =========================================

  const clearCart = () => {

    setCart([]);

    localStorage.removeItem(
      "testflowCart"
    );
  };


  // =========================================
  // TOTAL
  // =========================================

  const getTotal = () => {

    return cart.reduce(
      (total, item) =>
        total +
        item.price *
          item.quantity,
      0
    );
  };


  // =========================================
  // CHECKOUT
  // =========================================

  const handleCheckout = () => {

    if (cart.length === 0) {
      return;
    }

    navigate("/checkout");
  };


  // =========================================
  // UI
  // =========================================

  return (

    <div className="cart-page">

      {/* NAVIGATION */}

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

        </div>

      </nav>


      {/* HEADER */}

      <section className="cart-header">

        <h1>
          Your Shopping Cart
        </h1>

        <p>
          Review your selected products
          before checkout.
        </p>

      </section>


      {/* EMPTY CART */}

      {cart.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add some products to continue.
          </p>

          <Link to="/products">

            <button
              data-testid="continue-shopping"
            >
              Continue Shopping
            </button>

          </Link>

        </div>

      ) : (

        /* CART CONTENT */

        <section className="cart-container">

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
                data-testid={`cart-item-${item.id}`}
              >

                <div className="cart-item-icon">
                  🛍️
                </div>


                <div className="cart-item-details">

                  <h2>
                    {item.name}
                  </h2>

                  <p>
                    ₹{item.price}
                  </p>

                </div>


                {/* QUANTITY */}

                <div className="quantity-control">

                  <button
                    data-testid={`decrease-${item.id}`}
                    onClick={() =>
                      updateCart(
                        item.id,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>


                  <span
                    data-testid={`quantity-${item.id}`}
                  >
                    {item.quantity}
                  </span>


                  <button
                    data-testid={`increase-${item.id}`}
                    onClick={() =>
                      updateCart(
                        item.id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>


                {/* ITEM TOTAL */}

                <strong className="item-total">

                  ₹
                  {item.price *
                    item.quantity}

                </strong>


                {/* REMOVE */}

                <button
                  className="remove-button"
                  data-testid={`remove-${item.id}`}
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>


          {/* CART SUMMARY */}

          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>


            <div className="summary-row">

              <span>
                Items
              </span>

              <span>
                {cart.reduce(
                  (total, item) =>
                    total +
                    item.quantity,
                  0
                )}
              </span>

            </div>


            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{getTotal()}
              </strong>

            </div>


            <div className="summary-divider"></div>


            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{getTotal()}
              </strong>

            </div>


            {/* CHECKOUT */}

            <button
              className="checkout-button"
              data-testid="checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>


            {/* CLEAR CART */}

            <button
              className="clear-cart-button"
              data-testid="clear-cart"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          </div>

        </section>

      )}

    </div>
  );
}

export default Cart;