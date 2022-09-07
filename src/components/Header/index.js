import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="banner-container">
        <h1>
          <NavLink to="/">Marvel Quiz</NavLink>
        </h1>
      </div>
    </header>
  );
};

export default Header;
