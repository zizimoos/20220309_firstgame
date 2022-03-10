import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <Link to="/gameapp">
        <h1>GO Multiplayer Game</h1>
      </Link>
    </div>
  );
}

export default Home;
