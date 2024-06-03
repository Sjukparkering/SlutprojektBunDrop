import React, { useState, useEffect } from "react";
import FilterBox from "../components/FilterBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

function Menu() {
  const [menu, setMenu] = useState(null);
  const [filteredMenu, setFilteredMenu] = useState(null);
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
        setFilteredMenu(data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const category = params.get("category");
      if (menu) {
        const filteredItems = menu.filter((item) =>
          item.category.toLowerCase().includes(category.toLowerCase())
        );
        setFilteredMenu(filteredItems);
      }
    } else {
      setFilteredMenu(menu);
    }
  }, [location, menu]);

  if (!menu) {
    return <div>Loading...</div>;
  }

  function handleOnSelect(items) {
    setFilteredMenu(items);
  }

  const addToCart = (item) => {
    let itemsArray = localStorage.getItem("CartItems")
      ? JSON.parse(localStorage.getItem("CartItems"))
      : [];

    const existingItemIndex = itemsArray.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      itemsArray[existingItemIndex].quantity += 1;
    } else {
      item.quantity = 1;
      itemsArray.push(item);
    }

    localStorage.setItem("CartItems", JSON.stringify(itemsArray));

    window.dispatchEvent(new Event("storage"));

    // Set message content and show the message box
    setMessage(`${item.title} Added To Your Cart`);
    setShowMessage(true);

    // Hide the message box after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div>
      <FilterBox menu={menu} onSelect={handleOnSelect} />
      <div className="menu-id">
        {filteredMenu ? (
          filteredMenu.map((item) => (
            <div className="menu-item-container" key={item.id}>
              <h2 className="item-title">{item.title}</h2>
              <img className="menu-img" src={item.image} alt={item.title} />
              <p className="item-des">{item.description}</p>
              <p className="item-price">{item.price} kr </p>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(item)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          ))
        ) : (
          <div>No items match the selected filters.</div>
        )}
      </div>
      {showMessage && <div className="message-box">{message}</div>}
    </div>
  );
}

export default Menu;
