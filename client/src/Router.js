import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameApp from "./components/GameApp";
import Home from "./routes/Home";

function Router(props) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gameapp" element={<GameApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
