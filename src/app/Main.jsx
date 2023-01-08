import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./home";

const Main = () => {
  console.log(process.env);
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

export default Main;
