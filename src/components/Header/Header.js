import React from "react";
import "./header-styles.scss";

export default function Header() {
  return (
    <div className="overlay-nav">
      <div className="header-container">
        <h1>Home</h1>
        <h1>About</h1>
        <h1>Skills</h1>
        <h1>Contact</h1>
      </div>
    </div>
  );
}
