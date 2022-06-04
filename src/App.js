import "./styles/app-styles.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { pageData } from "./utils/data";
import ProjectItem from "./components/ProjectItem/ProjectItem";

function App() {
  return (
    <div>
      <Header />
      <div className="main-container" id="main-container">
        <ul>
          {pageData.map((project, index) => (
            <ProjectItem key={index} project={project} itemIndex={index} />
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default App;
