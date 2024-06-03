import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function FindUs() {
  return (
    <>
      <div className="location-container">
        <img className="Location" src="images/Location1.png" alt="Location" />
        <div className="OpeningHours">
          <h3 className="OurLocation"> Bergsgatan 35 </h3>
          <br></br>
          <h4>
            Monday: <span className="light-text">11:00 - 20:00</span>
          </h4>
          <h4>
            Tuesday: <span className="light-text"> 11:00 - 20:00</span>
          </h4>
          <h4>
            Wednesday: <span className="light-text"> 11:00 - 20:00</span>
          </h4>
          <h4>
            Thursday:<span className="light-text"> 11:00 - 20:00</span>
          </h4>
          <h4>
            Friday: <span className="light-text"> 11:00 - 23:00</span>
          </h4>
          <h4>
            Saturday: <span className="light-text"> 11:00 - 23:00</span>
          </h4>
          <h4>
            Sunday: <span className="light-text"> 11:00 - 20:00</span>
          </h4>
        </div>
      </div>
      <div>
        <h1 className="ContactUs"></h1>
      </div>
      <div className="ContactInfo">
        <h2>
          Please feel free to contact one of our administrators for help and
          support with any questions, whether it's about food, delivery, or
          payment.
        </h2>
      </div>
      <div className="Personal">
        <div className="personal-item">
          <div className="personal-image-container">
            <img className="personal-image" src="images/Sami.jpg" alt="Sami" />
            <span className="hover-text">Samuel</span>
          </div>
          <div className="tel-mail">
            <h5>
              <FontAwesomeIcon icon={faPhone} /> 0701234567
            </h5>
            <h5>
              <FontAwesomeIcon icon={faEnvelope} /> samuel@mail.se
            </h5>
          </div>
        </div>
        <div className="personal-item">
          <div className="personal-image-container">
            <img
              className="personal-image"
              src="images/Husam.jpg"
              alt="Husam"
            />
            <span className="hover-text">Husam</span>
          </div>
          <div className="tel-mail">
            <h5>
              <FontAwesomeIcon icon={faPhone} /> 0701234567
            </h5>
            <h5>
              <FontAwesomeIcon icon={faEnvelope} /> husam@mail.se
            </h5>
          </div>
        </div>
        <div className="personal-item">
          <div className="personal-image-container">
            <img
              className="personal-image"
              src="images/Henrik.jpg"
              alt="Henrik"
            />
            <span className="hover-text">Henrik</span>
          </div>
          <div className="tel-mail">
            <h5>
              {" "}
              <FontAwesomeIcon icon={faPhone} /> 0701234567
            </h5>
            <h5>
              {" "}
              <FontAwesomeIcon icon={faEnvelope} /> henrik@mail.se
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindUs;
