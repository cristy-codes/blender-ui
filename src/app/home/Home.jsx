import "./home.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import LinkGroup from "../link-group";
import PublicLinkGroup from "../public-link-group";

const Home = () => {
  return (
    <div className="b-home">
      <div className="b-nav"></div>
      <div className="b-home__main">
        <Routes>
          <Route path="/" element={<LinkGroup />} />
          <Route path="/b/:slug" element={<PublicLinkGroup />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
