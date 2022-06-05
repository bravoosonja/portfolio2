import React from "react";

export default function ProjectImage({
  path,
  opacity,
  parallaxPosition,
  scale,
  rotationPosition,
}) {
  return (
    <img
      src={path}
      alt="project"
      style={{
        opacity,
        transform: `translate3d(${parallaxPosition.x}px, ${parallaxPosition.y}px, 0px) scale(${scale}deg) rotate(${rotationPosition})`,
      }}
    />
  );
}
