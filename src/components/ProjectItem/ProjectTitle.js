import React from "react";

export default function ProjectTitle({
  title,
  handleMouseEnter,
  handleMouseLeave,
}) {
  return (
    <div
      className="title-item"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h1 className="menu-title">{title}</h1>
    </div>
  );
}
