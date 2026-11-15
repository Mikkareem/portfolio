import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouterScrollSync } from "./RouterScrollSync";
import Home from "../components/home";
import Skills from "../components/skills";
import About from "../components/about";
import MajorProjects from "../components/major-projects";
import MinorProjects from "../components/minor-projects";

export function Routing() {
  return (
    <BrowserRouter>
      <RouterScrollSync />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<MajorProjects />} />
        <Route path="/minor-projects" element={<MinorProjects />} />
      </Routes>
    </BrowserRouter>
  );
}
