import React, { useContext } from "react";
import "./ExploreMenu.css";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const { exploreMenu } = useContext(StoreContext);

  const menuItems = Array.isArray(exploreMenu.data) ? exploreMenu.data : [];

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Welcome to a culinary adventure like no other. Our menu is a celebration
        of flavors, carefully curated to offer you an unforgettable dining
        experience. From the freshest ingredients to the most exquisite recipes,
        each dish is crafted with passion and precision. Whether you're in the
        mood for a hearty meal, a light and healthy option, or a decadent
        dessert, we have something to satisfy every palate. Dive into our
        selection of gourmet appetizers, savor the richness of our main courses,
        and don't miss out on our delightful desserts. Every bite promises to
        take you on a journey of taste and satisfaction. Join us at E-CAFE,
        where we turn meals into memorable experiences and satisfy your cravings
        with a touch of elegance and flair.
      </p>
      <div className="explore-menu-list">
        {menuItems.map((item) => {
          return (
            <div
              key={item._id}
              className="explore-menu-list-item"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              <img
                src={item.menu_image}
                className={category === item.menu_name ? "active" : ""}
                alt="menu_image"
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
