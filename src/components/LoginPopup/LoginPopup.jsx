import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = () => {
  const {
    handleLogin,
    handleRegister,
    setShowLogin,
    currentState,
    setCurrentState,
    username,
    setUsername,
    street,
    setStreet,
    setAvatar,
    city,
    setCity,
    zipcode,
    setZipcode,
    phone,
    setPhone,
    password,
    setPassword,
    email,
    setEmail,
  } = useContext(StoreContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentState === "Sign up") {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt="cross_icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign up" && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <div className="multi-fields">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Zip Code"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>
              <input
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files[0])}
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign up" ? "Create Account" : "Login"}
        </button>
        {currentState === "Sign up" && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        )}
        <p>
          {currentState === "Login" ? (
            <>
              Create a new account?
              <span onClick={() => setCurrentState("Sign up")}>Click here</span>
            </>
          ) : (
            <>
              Already have an account?
              <span onClick={() => setCurrentState("Login")}>Login here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
