import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import Table from "../../components/Table/Table";
import ContactUs from "../../components/ContactUs/ContactUs";

const Home = () => {
  return (
    <div>
      <Header />
      <ExploreMenu />
      <Table />
      <ContactUs />
    </div>
  );
};

export default Home;
