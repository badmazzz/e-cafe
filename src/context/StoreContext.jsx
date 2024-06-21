import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import ErrorCheck from "../components/Error/Error";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

axios.defaults.withCredentials = true;

export const StoreContext = createContext(null);

const ecafe = "http://localhost:4000/api/v1";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [exploreMenu, setExploreMenu] = useState([]);
  const [table, setTable] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuList();
    fetchTableList();
  }, []);
  const fetchMenuList = async () => {
    try {
      const menuRes = await axios.get(`${ecafe}/menu/`);
      setFoodList(menuRes.data.data);
      const exploreRes = await axios.get(`${ecafe}/menu/explore`);
      setExploreMenu(exploreRes.data);
    } catch (err) {
      console.error("Error fetching menu list:", err);
    }
  };

  const fetchTableList = async () => {
    try {
      const tableRes = await axios.get(`${ecafe}/table/`);
      setTable(tableRes.data.data);
    } catch (err) {
      console.error("Error fetching menu list:", err);
    }
  };

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    if (cartItems[itemId] === 1) {
      const newCartItems = { ...cartItems };
      delete newCartItems[itemId];
      setCartItems(newCartItems);
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    for (const itemId in cartItems) {
      totalQuantity += cartItems[itemId];
    }
    return totalQuantity;
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const handleLogin = async (email, password, setUser, setShowLogin) => {
    try {
      const response = await axios.post(`${ecafe}/user/login`, {
        email,
        password,
      });
      const { user, accessToken, refreshToken } = response.data.data;

      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Save tokens in cookies
      Cookies.set("accessToken", accessToken, { expires: 7 }); // expires in 7 days or any desired expiration
      Cookies.set("refreshToken", refreshToken, { expires: 7 });

      setUser(user);
      setShowLogin(false);
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Failed to login. Please try again."
        );
      } else {
        setError("Failed to login. Please try again.");
      }
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  const handleRegister = async (
    username,
    email,
    password,
    address,
    avatar,
    setUser,
    setShowLogin
  ) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("avatar", avatar);

    try {
      const response = await axios.post(`${ecafe}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);

      handleLogin(email, password, setUser, setShowLogin);
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Failed to register. Please try again."
        );
      } else {
        setError("Failed to register. Please try again.");
      }
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  const handleLogout = async (setUser) => {
    let ans = window.confirm("Are you sure you want to logout?");
    if (ans) {
      try {
        const response = await axios.post(`${ecafe}/user/logout`);
        localStorage.removeItem("user");

        // Remove cookies
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        // Optionally refresh the page
        window.location.reload();

        console.log("Logout response:", response.data);
        setUser(null);
      } catch (err) {
        console.error("Logout error:", err);
        // Handle logout error as needed
      }
    }
  };

  const handleTableRegistration = async (name, date, time, guests, set) => {
    const data = {
      name,
      date,
      time,
      guests,
    };

    console.log(data);

    try {
      const response = await axios.post(`${ecafe}/table/add`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      console.log(response.status);
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const handleDeleteTable = async (id) => {
    try {
      const deleteTable = await axios.delete(`${ecafe}/table/${id}`);
      console.log("Deleted.................");
    } catch (error) {
      console.error("Error in deleteing Table", error);
    }
  };

  const contextValue = {
    foodList,
    exploreMenu,
    table,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalQuantity,
    handleLogin,
    handleRegister,
    handleLogout,
    handleTableRegistration,
    handleDeleteTable,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {error && <ErrorCheck error={error} />}
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
