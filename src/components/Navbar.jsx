import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHouse } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [cartQuantity, setCartQuantity] = useState(0);

  window.addEventListener("storage", (e) => {
    updateCartQuantity();
  });

  useEffect(() => {
    updateCartQuantity();
  }, []);

  function updateCartQuantity() {
    let cart = localStorage.getItem("CartItems");
    if (cart) {
      cart = JSON.parse(cart);

      let quantity = 0;

      cart.forEach((i) => (quantity += i.quantity));

      setCartQuantity(quantity);
    }
  }

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} />
          </Link>
        </li>
        <li>
          <Link to="/aboutus">About Us</Link>
        </li>
        <li>
          <Link to="/findus">Find Us</Link>
        </li>
        <li>
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="cart-item-count">{cartQuantity}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
