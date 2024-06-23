import React, { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Menu from "./pages/Menu/Menu";
import TableBook from "./pages/TableBook/TableBook";
import { StoreContext } from "./context/StoreContext";
import UserProfile from "./components/UserProfile/UserProfile";

const App = () => {
  const [category, setCategory] = useState("All");
  const { showLogin } = useContext(StoreContext);

  return (
    <>
      {showLogin && <LoginPopup />}
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route
            path="/menu"
            element={<Menu category={category} setCategory={setCategory} />}
          />
          <Route path="/table" element={<TableBook />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
