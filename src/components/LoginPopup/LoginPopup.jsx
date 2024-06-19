import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin, setUser }) => {
  const { handleLogin, handleRegister } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentState === "Sign up") {
      handleRegister(
        username,
        email,
        password,
        address,
        avatar,
        setUser,
        setShowLogin
      );
    } else {
      handleLogin(email, password, setUser, setShowLogin);
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
              <textarea
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
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
        {error && <p className="error">{error}</p>}
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
