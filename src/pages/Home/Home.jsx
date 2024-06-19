import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import AppDownload from "../../components/AppDownload.jsx/AppDownload";

const Home = () => {
  return (
    <div>
      <Header />
      <ExploreMenu />
      <AppDownload />
    </div>
  );
};

export default Home;
