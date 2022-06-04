import React from "react";

export default function ProjectImage({ path, opacity, parallaxPosition }) {
  return (
    <img
      src={path}
      alt="screenshot"
      style={{
        opacity,
        transform: `translate3d(${parallaxPosition.x}px, ${parallaxPosition.y}px, 0px)`,
      }}
    />
  );
}
