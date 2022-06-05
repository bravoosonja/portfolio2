import React, { useState } from "react";
import "./header-styles.scss";
import cn from "classnames";
import { Hash } from "react-feather";

export default function Header() {
  const [opened, setOpen] = useState(false);

  return (
    <>
      <div className="overlay-nav">
        <div className="header-container">
          <h1>Home</h1>
          <h1>About</h1>
          <h1>Skills</h1>
          <h1>Contact</h1>
        </div>
      </div>

      <div
        className={cn("overlay-burger-icon", { "as-opened": opened })}
        onClick={() => setOpen(!opened)}
      />

      <div className={cn("overlay-burger-menu", { "as-opened": opened })}>
        <div className="burger-menu-header">
          <Hash size={20} />
          Menu
        </div>
        <h1>Home</h1>
        <h1>About</h1>
        <h1>Skills</h1>
        <h1>Contact</h1>
      </div>
    </>
  );
}
