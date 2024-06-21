import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ setShowLogin, user, setUser }) => {
  const { getTotalQuantity, handleLogout, handleTableBookingClick } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();
  const location = useLocation();

  // This effect sets the active menu based on the current path
  useEffect(() => {
    if (location.pathname === "/") {
      setMenu("home");
    } else if (location.pathname.startsWith("/menu")) {
      setMenu("menu");
    } else if (location.pathname.startsWith("/table")) {
      setMenu("table");
    } else if (location.hash === "#footer") {
      setMenu("contact-us");
    } else {
      setMenu("");
    }
  }, [location]);

  const [menu, setMenu] = useState("");

  return (
    <>
      <div className="navbar">
        <Link to="/" style={{ fontSize: "2em" }}>
          E-CAFE
        </Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <Link
            to="/menu"
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </Link>
          <a
            href="/table"
            onClick={handleTableBookingClick}
            className={menu === "table" ? "active" : ""}
          >
            Table booking
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact-us")}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact Us
          </a>
        </ul>
        <div className="navbar-right">
          <div className="navbar-basket-icon">
            <Link to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-basket2-fill"
                viewBox="0 0 16 16"
                style={{ height: "30px", width: "30px" }}
              >
                <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1" />
              </svg>
            </Link>
            <div className={totalQuantity === 0 ? "dotHidden" : "dot"}>
              <p>{totalQuantity}</p>
            </div>
          </div>
          {user ? (
            <img
              src={user.avatar || assets.default_avatar}
              alt="avatar"
              className="avatar"
              onClick={() => handleLogout(setUser)}
            />
          ) : (
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
