import CustomCursor from "./components/shared/CustomCursor";
import Footer from "./components/shared/Footer";
import Hero from "./components/shared/Hero";
import Projects from "./components/shared/Projects";
import Skills from "./components/shared/Skills";
import Timeline from "./components/shared/Timeline";
import { TracingBeam } from "./components/ui/TracingBeam";

const App = () => {

  return (
    <>
      <CustomCursor />
      <main className="min-h-screen w-full max-w-[100vw] bg-dark-2 text-zinc-300 max-sm:pt-6 overflow-x-hidden selection:bg-red-600">
        <TracingBeam>
          <Hero />
          <Projects />
          <Timeline />
          <Skills />
          <Footer />
        </TracingBeam>
        
      </main>
    </>
  );
};

export default App;
  
