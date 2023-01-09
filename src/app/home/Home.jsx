import "./home.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LinkGroup from "../link-group";
import PublicLinkGroup from "../public-link-group";
import BlenderIcon from "./Blender.svg";

const Home = () => {
  return (
    <div className="b-home">
      <div className="b-nav">
        <Link to="/">
          <img src={BlenderIcon} alt="Blender" className="b-home__icon" />
        </Link>
      </div>
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
