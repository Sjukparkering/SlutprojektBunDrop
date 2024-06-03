import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear, faSpinner } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem("CartItems"));
    if (localStorageItems) {
      setCart(localStorageItems);
    }
  }, []);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [cart]);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleDelete = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem("CartItems", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity <= 0) {
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
      localStorage.setItem("CartItems", JSON.stringify(updatedCart));
    } else {
      const updatedCart = cart.map((item, i) => {
        if (i === index) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCart(updatedCart);
      localStorage.setItem("CartItems", JSON.stringify(updatedCart));
    }

    window.dispatchEvent(new Event("storage"));
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = () => {
    // Validate full name (no numbers)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullName)) {
      alert("Full name cannot contain numbers.");
      return;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (paymentMethod === "Swish" && !phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number for Swish payment.");
      return;
    }

    // Validate card number (16 digits)
    const cardRegex = /^(\d{4}\s){3}\d{4}$/;
    if (paymentMethod === "Card" && !cardRegex.test(cardNumber)) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }

    // Validate CVV (3 digits)
    const cvvRegex = /^\d{3}$/;
    if (paymentMethod === "Card" && !cvvRegex.test(cvv)) {
      alert("Please enter a valid 3-digit CVV.");
      return;
    }

    // Validate expiration date (MM/YY format)
    const expirationRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (paymentMethod === "Card" && !expirationRegex.test(expirationDate)) {
      alert("Please enter a valid expiration date in MM/YY format.");
      return;
    }

    // Check if all required fields are filled
    if (!fullName || !address) {
      alert("Please fill in your full name and delivery address.");
      return;
    }

    if (paymentMethod === "Card" && (!cardNumber || !expirationDate || !cvv)) {
      alert("Please fill in all card details for card payment.");
      return;
    }

    // Generate a random delivery time between 20 and 35 minutes
    const randomDeliveryTime = Math.floor(Math.random() * 16) + 20;

    // Simulate loading for 2-3 seconds
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowConfirmation(true);
      setOrderedItems(cart); // Set ordered items when the order is placed
      localStorage.setItem("CartItems", JSON.stringify([]));
      window.dispatchEvent(new Event("storage"));
      setEstimatedDeliveryTime(randomDeliveryTime * 60); // Set the time in seconds
      setTimeRemaining(randomDeliveryTime * 60); // Initialize time remaining
    }, 2000);
  };

  useEffect(() => {
    if (timeRemaining !== null) {
      const interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleExpirationDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    if (input.length > 4) {
      input = input.slice(0, 4); // Begränsa längden till 4 siffror (MMYY)
    }

    if (input.length >= 2) {
      const month = parseInt(input.slice(0, 2), 10);
      if (month < 1 || month > 12) {
        return; // Om månaden är ogiltig (inte mellan 01 och 12), returnera utan att uppdatera state
      }
    }

    if (input.length > 2) {
      input = input.slice(0, 2) + "/" + input.slice(2);
    }

    setExpirationDate(input);
  };

  const handleCardNumberChange = (e) => {
    let inputValue = e.target.value.replace(/\s/g, ""); // Ta bort befintliga mellanrum
    inputValue = inputValue.replace(/\D/g, ""); // Ta bort icke-numeriska tecken

    if (inputValue.length <= 16) {
      // Max 16 tecken (inklusive mellanrum)
      // Formatera om kortnumret med mellanrum mellan varje grupp om 4 siffror
      inputValue = inputValue.replace(/(\d{4})/g, "$1 ").trim();
      setCardNumber(inputValue);
    }
  };

  return (
    <div className="payment-container">
      {showConfirmation ? (
        <div className="confirmation">
          <h2>Your order has been confirmed!</h2>
          <h3 className="items-ordered">Items Ordered:</h3>
          <ul>
            {orderedItems.map((item, index) => (
              <li key={index}>
                {item.title} - {item.quantity} x {item.price} kr
              </li>
            ))}
          </ul>
          <p>Total Price: {totalPrice} kr</p>
          <p>Estimated Delivery Time: {formatTime(timeRemaining)}</p>
        </div>
      ) : (
        <>
          <div className="cart-summary">
            {cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="quantity-container">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(index, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, parseInt(e.target.value))
                        }
                      />
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(index, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-details">
                      <h3>{item.title}</h3>
                      <p className="cart-item-price">{item.price} kr</p>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <div className="total-price">
                  <h3 className="total-price">Total Price: {totalPrice} kr</h3>
                </div>
                <div className="user-info">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="user-input"
                  />
                  <input
                    type="text"
                    placeholder="Delivery Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="user-input"
                  />
                </div>
                <div className="payment-options">
                  <button
                    className={paymentMethod === "Swish" ? "selected" : ""}
                    onClick={() => handlePaymentMethod("Swish")}
                  >
                    <img
                      className="Swish-img"
                      src="images/Swish.png"
                      alt="Swish"
                    />
                  </button>
                  <button
                    className={paymentMethod === "Card" ? "selected" : ""}
                    onClick={() => handlePaymentMethod("Card")}
                  >
                    <img
                      className="Visa-img"
                      src="images/visacard.png"
                      alt="visacard"
                    />
                  </button>
                </div>
                {paymentMethod === "Swish" && (
                  <div className="swish-payment payment-form">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="user-input"
                    />
                    <button onClick={handlePlaceOrder} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} spin />
                          &nbsp; Placing Order...
                        </>
                      ) : (
                        "Order"
                      )}
                    </button>
                  </div>
                )}
                {paymentMethod === "Card" && (
                  <div className="card-payment payment-form">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="user-input"
                      maxLength="19" // Max längd inklusive mellanrum
                    />
                    <input
                      type="text"
                      placeholder="Expiration Date (MM/YY)"
                      value={expirationDate}
                      onChange={handleExpirationDateChange}
                      className="user-input"
                      maxLength="5"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (
                          /^\d*$/.test(inputValue) &&
                          inputValue.length <= 3
                        ) {
                          setCvv(inputValue);
                        }
                      }}
                      className="user-input"
                      maxLength="3"
                    />
                    <button
                      className="order-btn"
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} spin />
                          &nbsp; Placing Order...
                        </>
                      ) : (
                        "Order"
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="empty-cart">
                Your cart is empty
                <FontAwesomeIcon
                  icon={faFaceSadTear}
                  bounce
                  className="sad-emoji"
                />
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
