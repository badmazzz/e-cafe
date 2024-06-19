import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import ExploreMenu from "../ExploreMenu/ExploreMenu";

const FoodDisplay = ({ category, setCategory }) => {
  const { foodList } = useContext(StoreContext);

  // Check if foodList.data exists and is an array
  const menuItems = Array.isArray(foodList.data) ? foodList.data : [];

  return (
    <div className="food-display" id="food-display">
      <ExploreMenu category={category} setCategory={setCategory}></ExploreMenu>

      <div className="food-display-list">
        {menuItems.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
