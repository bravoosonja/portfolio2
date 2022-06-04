import React, { useState, useRef, useEffect } from "react";
import "./styles/app-styles.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { pageData } from "./utils/data";
import ProjectItem from "./components/ProjectItem/ProjectItem";

function App() {
  const menuItems = useRef(null);
  const [renderItems, setRenderItems] = useState(pageData);

  const cloneItems = () => {
    //calculate how many projects can fit into the page for the infinite scroll effect
    const itemHeight = menuItems.current.childNodes[0].offsetHeight;
    const fitMax = Math.ceil(window.innerHeight / itemHeight);

    //copy projects from pageData
    const clonedItems = [...renderItems]
      .filter((_, index) => index < fitMax)
      .map((target) => target);

    setRenderItems([...renderItems, ...clonedItems]);
    return clonedItems.length * itemHeight;
  };

  //for the infinite scroll
  const getScrollPosition = () => {
    return (
      (menuItems.current.pageYOffset || menuItems.current.scrollTop) -
      (menuItems.current.clientTop || 0)
    );
  };

  const setScrollPosition = (position) => {
    menuItems.current.scrollTop = position;
  };

  const initScroll = () => {
    const scrollPosition = getScrollPosition();
    if (scrollPosition <= 0) {
      setScrollPosition(1);
    }
  };

  useEffect(() => {
    const clonesHeight = cloneItems();
    initScroll();

    menuItems.current.style.scrollBehavior = "unset";

    const scrollUpdate = () => {
      const scrollPosition = getScrollPosition();
      if (clonesHeight + scrollPosition >= menuItems.current.scrollHeight) {
        setScrollPosition(1);
      } else if (scrollPosition <= 0) {
        setScrollPosition(menuItems.current.scrollHeight - clonesHeight);
      }
    };

    menuItems.current.addEventListener("scroll", scrollUpdate);

    return () => {
      menuItems.current.removeEventListener("scroll", scrollUpdate);
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="main-container" id="main-container">
        <ul ref={menuItems}>
          {renderItems.map((project, index) => (
            <ProjectItem key={index} project={project} itemIndex={index} />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default App;
