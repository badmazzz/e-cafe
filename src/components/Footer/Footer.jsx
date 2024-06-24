import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <Link to="/" style={{ fontSize: "2em" }}>
            E-CAFE
          </Link>
          <p>
            E-CAFE is more than just a culinary destination; it's a reflection
            of a dream nurtured by a passionate soul. Founded by Team, a
            culinary enthusiast with a zest for creativity, E-CAFE Cafe came
            into being in 2022.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com">
              <img src={assets.facebook_icon} alt="facebook" />
            </a>
            <a href="https://www.twitter.com">
              <img src={assets.twitter_icon} alt="twitter" />
            </a>
            <a href="https://www.linkedin.com/in/meshv-patel" target="_blank">
              <img src={assets.linkedin_icon} alt="linkedin" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2 className="header">COMPANY</h2>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2 className="header">GET IN TOUCH</h2>
          <ul>
            <li>+91 92659 27392</li>
            <li>contact@ecafe.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © E-CAFE.com</p>
    </footer>
  );
};

export default Footer;
