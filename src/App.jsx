import { Routes, Route } from "react-router-dom";
import CustomCursor from "./components/shared/CustomCursor";
import Footer from "./components/shared/Footer";
import Hero from "./components/shared/Hero";
import Projects from "./components/shared/Projects";
import Skills from "./components/shared/Skills";
import Timeline from "./components/shared/Timeline";
import ProjectDetail from "./components/shared/ProjectDetail";
import ProjectsPage from "./components/shared/ProjectsPage";
import ScrollToTop from "./components/shared/ScrollToTop";
import { TracingBeam } from "./components/ui/TracingBeam";
import VideoBackground from "./components/shared/VideoBackground";

const HomePage = () => (
  <TracingBeam>
    <Hero />
    <Projects />
    <Timeline />
    <Skills />
    <Footer />
  </TracingBeam>
);

const App = () => {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <VideoBackground />
      <main className="min-h-screen w-full max-w-[100vw] text-zinc-300 max-sm:pt-6 overflow-x-hidden selection:bg-red-600">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
