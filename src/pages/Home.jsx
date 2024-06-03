import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [popularBurgers, setPopularBurgers] = useState([]);
  const [message, setMessage] = useState(null); // State for the message box
  const [showMessage, setShowMessage] = useState(false); // State for showing the message box

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      let scale = 1 + window.scrollY / 1000;
      const chefyImage = document.querySelector(".Chefy");
      const speechBubble = document.querySelector(".speech-bubble");

      if (scale > 1.3) {
        scale = 1.3;
      }

      if (chefyImage) {
        chefyImage.style.transform = `scale(${scale})`;
      }

      if (speechBubble) {
        speechBubble.style.opacity = Math.min(window.scrollY / 300, 1);
        let topValue = `${50 + window.scrollY / 5}`;

        if (topValue > 70) {
          topValue = 70;
        }

        speechBubble.style.top = `${topValue}%`; // Adjust positioning
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => {
        const selectedBurgers = data.filter((burger) =>
          [
            "American Burger",
            "Tokyo Burger",
            "Newton Burger",
            "Singapore Burger",
          ].includes(burger.title)
        );
        setPopularBurgers(selectedBurgers);
      })
      .catch((error) => {
        console.error("Error fetching popular burgers:", error);
      });
  }, []);

  return (
    <>
      <div id="root" className="App">
        <header className="header">
          <img className="Droney" src="images/BunDrop3.png" alt="Droney" />
          {/* <h1 className="BunDrop-title"> Bun Drop</h1>
          <h2 className="DropIt">Drop It Like It's Hot</h2> */}
          {/* <h2 className="LikeHot">Like It's Hot</h2> */}
        </header>
        <div className="chef-section">
          <img className="Chefy" src="images/Chefy.png" alt="Chefy" />
          <div className="speech-bubble">
            Introducing Drop Bun, where delicious meets innovation! Savor our
            mouth-watering, perfectly crafted hamburgers, delivered fast and
            safely right to your doorstep by our state-of-the-art drones.
            Experience the future of food delivery with Drop Bun!
          </div>
        </div>
        <div className="menu-section">
          <div className="Menu">
            <div className="menu-item">
              <Link to="/menu?category=burgers">
                <img
                  className="Burger1"
                  src="images/Burger1.png"
                  alt="Burgers"
                />
              </Link>
              <div className="category-text">Burgers</div>
            </div>
            <div className="menu-item">
              <Link to="/menu?category=sides">
                <img className="Burger1" src="images/Sides.png" alt="Sides" />
              </Link>
              <div className="category-text">Sides</div>
            </div>
            <div className="menu-item">
              <Link to="/menu?category=drinks">
                <img className="Burger1" src="images/Drinks.png" alt="Drinks" />
              </Link>
              <div className="category-text">Drinks</div>
            </div>
            <div className="menu-item">
              <Link to="/menu?category=desserts">
                <img
                  className="Burger1"
                  src="images/Dessert.png"
                  alt="Desserts"
                />
              </Link>
              <div className="category-text">Desserts</div>
            </div>
          </div>
          <div className="MenuBtnDiv">
            <button className="MenuBtn">
              <Link to="/menu" className="menu-btn-text">
                See The Whole Menu
              </Link>
            </button>
          </div>
          <div className="PopularBurgersText">Our Most Popular Burgers</div>
          <div className="PopularBurgersSection">
            <div className="PopularBurgers">
              {popularBurgers.map((burger) => (
                <div key={burger.id} className="burger-item">
                  <h3 className="pop-burger-title">{burger.title}</h3>
                  <img
                    className="burger-image"
                    src={burger.image}
                    alt={burger.title}
                  />
                  <p className="Pop-price">{burger.price} kr</p>
                  <button
                    className="add-to-cart-btn-home"
                    onClick={() => addToCart(burger)}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="reviews">
            <div className="review-text">"The best food place ever"</div>
            <div className="review-text">"I absolutely loved it"</div>
            <img
              className="reviews-img"
              src="images/Omdomen.png"
              alt="Reviews"
            />
            <div className="review-text">"Amazing service!"</div>
            <div className="review-text">"Delicious food every time"</div>
          </div>

          <div className="SuperstarsSection-back">
            <div className="SuperstarsSection">
              <div>
                <img src="images/Jackson.png" className="Superstar-image"></img>
              </div>
              <div>
                <img src="images/Peppa.png" className="Superstar-image"></img>
              </div>
              <div>
                <img src="images/BobRoss.png" className="Superstar-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showMessage && <div className="message-box">{message}</div>}'{" "}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>Drop Bun</h2>
            <p>
              Drop Bun is a culinary hub, founded by Martha Stewart and Snoop
              Dogg. We offer a unique dining experience with fast delivery via
              our drones.
            </p>
          </div>
          <div className="footer-section links">
            <h2>Links</h2>
            <ul>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/findus">Contact</Link>
              </li>
              <li>
                <Link to="/privacy">Policy</Link>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  I Have A Complaint
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section social">
            <h2>Follow Us</h2>
            <div className="social-icons">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="images/Facebook.webp" alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="images/Insta.webp" alt="Instagram" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="images/Twitter.png" alt="Twitter" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2024 Drop Bun. All rights reserved
        </div>
      </footer>
    </>
  );
}

export default Home;
