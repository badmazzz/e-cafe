import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { getTotalQuantity, handleLogout, user, setUser, setShowLogin } =
    useContext(StoreContext);
  const totalQuantity = getTotalQuantity();
  const location = useLocation();
  const [hamburger, setHamburger] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    if (location.pathname === "/") {
      setMenu("home");
    } else if (location.pathname.startsWith("/menu")) {
      setMenu("menu");
    } else if (location.pathname.startsWith("/table")) {
      setMenu("table");
    } else if (location.hash === "#contact-us") {
      setMenu("contact-us");
    } else {
      setMenu("");
    }
  }, [location]);

  const [menu, setMenu] = useState("");

  const handleMenuClick = () => {
    setHamburger(false);
  };

  return (
    <>
      <div className="navbar">
        <Link to="/" style={{ fontSize: "2em" }}>
          E-CAFE
        </Link>
        <ul className={`navbar-menu ${hamburger ? "active" : ""}`}>
          <Link
            to="/"
            onClick={() => {
              setMenu("home");
              handleMenuClick();
            }}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <Link
            to="/menu"
            onClick={() => {
              setMenu("menu");
              handleMenuClick();
            }}
            className={menu === "menu" ? "active" : ""}
          >
            Menu
          </Link>
          <Link
            to="/table"
            onClick={() => {
              setMenu("table");
              handleMenuClick();
            }}
            className={menu === "table" ? "active" : ""}
          >
            Table booking
          </Link>
          <a
            href="#footer"
            onClick={() => {
              setMenu("contact-us");
              handleMenuClick();
            }}
            className={menu === "contact-us" ? "active" : ""}
          >
            Contact Us
          </a>
          {hamburger && (
            <div className="mobile-only">
              <Link to="/cart" onClick={handleMenuClick}>
                Cart
              </Link>
              {user ? (
                <>
                  <Link to="/profile" onClick={handleMenuClick}>
                    Your Profile
                  </Link>
                  <a
                    onClick={() => {
                      handleLogout(setUser);
                      handleMenuClick();
                    }}
                  >
                    Log Out
                  </a>
                </>
              ) : (
                <a
                  onClick={() => {
                    setShowLogin(true);
                    setHamburger(false);
                  }}
                >
                  Sign in
                </a>
              )}
            </div>
          )}
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
            <div className="avatar-dropdown">
              <img
                src={user.avatar || assets.default_avatar}
                alt="avatar"
                className="avatar"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={toggleDropdown}>
                    Your Profile
                  </Link>
                  <a onClick={() => handleLogout(setUser)}>Log Out</a>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          )}
        </div>
        <div className="hamburger" onClick={() => setHamburger(!hamburger)}>
          {hamburger ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="dark"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="dark"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
