import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

export const deliveryFee = 2;

const Cart = () => {
  const {
    cartItems,
    foodList,
    removeFromCart,
    getTotalQuantity,
    totalAmount,
    placeOrder,
    showPopup,
  } = useContext(StoreContext);

  const totalQuantity = getTotalQuantity();

  const handleOrder = () => {
    placeOrder();
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title cart-heading">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {totalQuantity === 0 ? (
          <p className="NoItems">No Items in cart</p>
        ) : (
          cartItems.map(({ menuId, quantity }) => {
            const item = foodList.find((product) => product._id === menuId);
            if (item) {
              return (
                <React.Fragment key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.image} alt="food img" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{quantity}</p>
                    <p>${item.price * quantity}</p>
                    <p
                      className="Remove"
                      onClick={() => removeFromCart(menuId)}
                    >
                      <img
                        src={assets.remove_icon_cross}
                        alt="remove_icon_cross"
                      />
                    </p>
                  </div>
                  <hr />
                </React.Fragment>
              );
            }
            return null; // Avoid returning undefined
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
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
          <button disabled={totalAmount === 0} onClick={handleOrder}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <p>Order Placed Successful!</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
