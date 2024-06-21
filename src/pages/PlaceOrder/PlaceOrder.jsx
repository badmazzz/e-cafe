import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { deliveryFee } from "../Cart/Cart";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { totalAmount, user, placeOrder } = useContext(StoreContext);
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressChange = (index) => {
    setSelectedAddress(index);
  };

  return (
    <>
      <button className="GoBack" onClick={() => navigate("/cart")}>
        ⬅ Go Back to Cart Page
      </button>

      <form className="place-order">
        <div className="place-order-left">
          <h2 className="title">Select Delivery Address</h2>
          {user.address.map((addr, index) => (
            <div
              key={index}
              className={`address-item ${
                selectedAddress === index ? "selected" : ""
              }`}
              onClick={() => handleAddressChange(index)}
            >
              <input
                type="checkbox"
                checked={selectedAddress === index}
                readOnly
              />
              <span>
                {addr.street}, {addr.city}, {addr.zipcode}
              </span>
            </div>
          ))}
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2 className="title">Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${totalAmount}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${totalAmount === 0 ? 0 : deliveryFee}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${totalAmount === 0 ? 0 : totalAmount + deliveryFee}</b>
              </div>
            </div>
            <button
              onClick={placeOrder}
              disabled={totalAmount === 0 || selectedAddress === null}
            >
              PROCEED TO Payment
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
