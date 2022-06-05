import React, { useReducer, useRef } from "react";
import "./project-item-styles.scss";
import ProjectImage from "./ProjectImage";
import ProjectTitle from "./ProjectTitle";
import { Hash } from "react-feather";
import animate from "./animate";
import cn from "classnames";

const initialState = {
  opacity: 0,
  parallaxPosition: { x: 0, y: -20 },
  scale: 0.8,
  rotationPosition: 0,
  active: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "mouse/enter": {
      return {
        ...state,
        active: true,
      };
    }
    case "mouse/leave": {
      return {
        ...state,
        active: false,
      };
    }
    case "mouse/coordinates": {
      return {
        ...state,
        parallaxPosition: action.payload,
      };
    }

    case "change/opacity": {
      return {
        ...state,
        opacity: action.payload,
      };
    }

    case "change/rotation": {
      return {
        ...state,
        rotationPosition: action.payload,
      };
    }
    case "change/scale": {
      return {
        ...state,
        scale: action.payload,
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
  const easeMethod = "linear";

  const parallax = (event) => {
    const speed = -5;
    const x = (window.innerWidth - event.pageX * speed) / 100;
    const y = (window.innerHeight - event.pageY * speed) / 100;
    dispatch({ type: "mouse/coordinates", payload: { x, y } });
  };

  const handleRotation = (currentRotation, duration) => {
    //random number between -15 and 15
    const newRotation =
      Math.random() * 15 * (Math.round(Math.random()) ? 1 : -1);

    animate({
      fromValue: currentRotation,
      toValue: newRotation,
      onUpdate: (newRotation, callback) => {
        dispatch({ type: "change/rotation", payload: newRotation });
        callback();
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod,
    });
  };

  const handleOpacity = (initialOpacity, newOpacity, duration) => {
    animate({
      fromValue: initialOpacity,
      toValue: newOpacity,
      onUpdate: (newOpacity, callback) => {
        dispatch({ type: "change/opacity", payload: newOpacity });
        callback();
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod,
    });
  };

  const handleScale = (initialScale, newScale, duration) => {
    animate({
      fromValue: initialScale,
      toValue: newScale,
      onUpdate: (newScale, callback) => {
        dispatch({ type: "change/scale", payload: newScale });
        callback();
      },
      onComplete: () => {},
      duration: duration,
      easeMethod: easeMethod,
    });
  };

  const handleMouseEnter = () => {
    handleScale(0.8, 1, 500);
    handleOpacity(0, 1, 800);
    handleRotation(state.rotationPosition, 500);
    listItem.current.addEventListener("mousemove", parallax);
    dispatch({ type: "mouse/enter" });
  };

  const handleMouseLeave = () => {
    listItem.current.removeEventListener("mousemove", parallax);
    handleOpacity(1, 0, 500);
    handleScale(1, initialState.scale, 500);
    handleRotation(state.rotationPosition, 500);
    dispatch({
      type: "mouse/coordinates",
      payload: initialState.parallaxPosition,
    });
    dispatch({ type: "mouse/leave" });
  };

  return (
    <>
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
          scale={state.scale}
          rotation={state.rotationPosition}
        />

        <div className={cn("info-block", { "as-active": state.active })}>
          <p className="info-block-header">
            <span>
              <Hash />0{`${itemIndex + 1}`}
            </span>
          </p>

          {project.info.map((element) => (
            <p key={element}>
              <span>{element}</span>
            </p>
          ))}
        </div>
      </li>
    </>
  );
}
