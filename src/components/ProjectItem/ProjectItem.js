import React, { useReducer, useRef } from "react";
import "./project-item-styles.scss";
import ProjectImage from "./ProjectImage";
import ProjectTitle from "./ProjectTitle";
import { Hash } from "react-feather";

const initialState = {
  opacity: 0,
  parallaxPosition: { x: 0, y: -20 },
};

function reducer(state, action) {
  switch (action.type) {
    case "change/opacity": {
      return {
        ...state,
        opacity: action.payload,
      };
    }
    case "mouse/coordinates": {
      return {
        ...state,
        parallaxPosition: action.payload,
      };
    }
    default: {
      throw new Error();
    }
  }
}

export default function ProjectItem({ project, itemIndex }) {
  const listItem = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const parallax = (event) => {
    const speed = -5;
    const x = (window.innerWidth - event.pageX * speed) / 100;
    const y = (window.innerHeight - event.pageY * speed) / 100;
    dispatch({ type: "mouse/coordinates", payload: { x, y } });
  };

  const handleMouseEnter = () => {
    dispatch({ type: "change/opacity", payload: 1 });
    listItem.current.addEventListener("mouseenter", parallax);
  };

  const handleMouseLeave = () => {
    listItem.current.removeEventListener("mouseleave", parallax);
    dispatch({ type: "change/opacity", payload: 0 });
    dispatch({
      type: "mouse/coordinates",
      payload: initialState.parallaxPosition,
    });
  };

  return (
    <li className="project-item-container" ref={listItem}>
      <ProjectTitle
        title={project.title}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <ProjectImage
        src={project.path}
        opacity={state.opacity}
        parallaxPosition={state.parallaxPosition}
      />

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
