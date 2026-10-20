import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    category: "Electronics",
    description: "High-quality wireless headphones with clear sound.",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3999,
    category: "Electronics",
    description: "Smart watch with fitness and health tracking features.",
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 1499,
    category: "Accessories",
    description: "Durable backpack suitable for laptops and daily use.",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 2999,
    category: "Electronics",
    description: "Responsive mechanical keyboard for work and gaming.",
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 2199,
    category: "Sports",
    description: "Comfortable running shoes for everyday workouts.",
  },
  {
    id: 6,
    name: "Travel Bottle",
    price: 799,
    category: "Accessories",
    description: "Reusable stainless steel bottle for travel and fitness.",
  },
];

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cartMessage, setCartMessage] = useState("");

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("testflowCart")) || [];

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    // Save cart immediately
    localStorage.setItem(
      "testflowCart",
      JSON.stringify(updatedCart)
    );

    // Verify the storage write in development/test environment
    const savedCart =
      JSON.parse(localStorage.getItem("testflowCart")) || [];

    if (
      !savedCart.some(
        (item) => item.id === product.id
      )
    ) {
      throw new Error(
        "Cart data was not saved to localStorage."
      );
    }

    // Show confirmation
    setCartMessage(
      `${product.name} added to cart.`
    );

    // Do not use an arbitrary wait in Playwright.
    // The UI itself controls the message lifetime.
    setTimeout(() => {
      setCartMessage("");
    }, 2000);
  };

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
    <div className="products-page">

      {/* Navigation */}

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


      {/* Header */}

      <section className="products-header">

        <h1>
          Products
        </h1>

        <p>
          Browse products and add them
          to your shopping cart.
        </p>

      </section>


      {/* Search and Filter */}

      <section className="product-controls">

        <input
          data-testid="product-search"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          data-testid="category-filter"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="All">
            All Categories
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Accessories">
            Accessories
          </option>

          <option value="Sports">
            Sports
          </option>

        </select>

      </section>


      {/* Cart Message */}

      {cartMessage && (

        <p
          data-testid="cart-message"
          className="cart-message"
        >
          {cartMessage}
        </p>

      )}


      {/* Products */}

      <section className="products-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map(
            (product) => (

              <div
                className="product-card"
                key={product.id}
                data-testid={`product-${product.id}`}
              >

                <div className="product-image">
                  🛍️
                </div>

                <div className="product-info">

                  <span className="product-category">
                    {product.category}
                  </span>

                  <h2>
                    {product.name}
                  </h2>

                  <p>
                    {product.description}
                  </p>

                  <div className="product-bottom">

                    <strong>
                      ₹{product.price}
                    </strong>

                    <button
                      data-testid={`add-to-cart-${product.id}`}
                      onClick={() =>
                        addToCart(product)
                      }
                    >
                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>

            )
          )

        ) : (

          <p className="no-products">
            No products found.
          </p>

        )}

      </section>

    </div>
  );
}

export default Products;