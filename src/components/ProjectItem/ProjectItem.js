import React from "react";
import "./project-item-styles.scss";
import Image from "./ProjectImage";
import Title from "./ProjectTitle";
import { Hash } from "react-feather";

export default function ProjectItem({ project, itemIndex }) {
  return (
    <li className="project-item-container">
      <Title title={project.title} />
      <Image src={project.path} />

      <div className="info-block">
        <p className="info-block-header">
          <span>
            <Hash />0{itemIndex}
          </span>
        </p>

        {project.info.map((element) => (
          <p key={element}>
            <span>{element}</span>
          </p>
        ))}
      </div>
    </li>
  );
}
