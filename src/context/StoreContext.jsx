import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import ErrorCheck from "../components/Error/Error";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

export const StoreContext = createContext(null);

const ecafe = "http://localhost:4000/api/v1";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [exploreMenu, setExploreMenu] = useState([]);
  const [table, setTable] = useState([]);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchMenuList();
    fetchTableList();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    getTotalCartAmount();
  }, [cartItems]);

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
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.menuId === itemId
      );

      if (existingItemIndex === -1) {
        // Item doesn't exist in the cart, add it with quantity 1
        return [...prev, { menuId: itemId, quantity: 1 }];
      } else {
        // Item exists, increment the quantity
        return prev.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.menuId === itemId
      );

      if (existingItemIndex !== -1) {
        if (prev[existingItemIndex].quantity === 1) {
          return prev.filter((item, index) => index !== existingItemIndex);
        } else {
          return prev.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
      }

      return prev;
    });
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalCartAmount = () => {
    return cartItems.reduce((total, item) => {
      const itemInfo = foodList.find((product) => product._id === item.menuId);
      setTotalAmount(total + (itemInfo ? itemInfo.price * item.quantity : 0));
      return total + (itemInfo ? itemInfo.price * item.quantity : 0);
    }, 0);
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

  const placeOrder = async () => {
    const data = {
      cartItems,
      totalAmount,
    };
    try {
      const orderRes = await axios.post(`${ecafe}/order/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Order not placed...", error);
    }
  };

  const handleRegister = async (
    username,
    email,
    password,
    street,
    city,
    zipcode,
    avatar,
    phone,
    setUser,
    setShowLogin
  ) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("street", street);
    formData.append("zipcode", zipcode);
    formData.append("city", city);
    formData.append("avatar", avatar);
    formData.append("phone", phone);

    console.log(formData);

    try {
      const response = await axios.post(`${ecafe}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);

      await handleLogin(email, password, setUser, setShowLogin);
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
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const handleDeleteTable = async (id) => {
    try {
      const deleteTable = await axios.delete(`${ecafe}/table/${id}`);
      console.log("Deleted.................");
    } catch (error) {
      console.error("Error in deleting Table", error);
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
    totalAmount,
    placeOrder,
    user,
    setUser,
    showPopup,
    setShowPopup,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {error && <ErrorCheck error={error} />}
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
