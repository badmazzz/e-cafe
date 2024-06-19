import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin, user }) => {
  const { getTotalQuantity } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();
  const [error, setError] = useState("");
  const [menu, setMenu] = useState("home");

  const handleLogout = async () => {
    let ans = window.confirm("Are you sure you want to logout?");
    console.log(ans)
    if (ans) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/v1/user/logout",
        );
        localStorage.removeItem("user");
        window.location.reload();
        console.log("Logout response:", response.data);
        setUser(null);
      } catch (err) {
        console.error("Logout error:", err);
        if (err.response && err.response.data) {
          setError(
            err.response.data.message || "Failed to logout. Please try again."
          );
        } else {
          setError("Failed to logout. Please try again.");
        }
        setTimeout(() => {
          setError("");
        }, 1000);
      }
    }
  };

  return (
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
          href="#table"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
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
        <img src={assets.search_icon} alt="search_icon" />
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
            onClick={handleLogout}
          />
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
