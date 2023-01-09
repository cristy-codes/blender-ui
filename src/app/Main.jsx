import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./home";

const Main = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

export default Main;
