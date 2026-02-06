import { useParams, useNavigate } from "react-router-dom";
import { projects } from "@/constants";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const [expanded, setExpanded] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl text-zinc-300">Project not found</h1>
        <Button variant="mac" onClick={() => navigate("/projects")}>
          Back to Projects
        </Button>
      </div>
    );
  }

  if (expanded) {
    return (
      <div className="fixed inset-0 z-50 bg-dark-2 flex flex-col iframe-wrapper" style={{ cursor: "auto" }}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-dark-2">
          <button
            onClick={() => setExpanded(false)}
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300"
            style={{ cursor: "pointer" }}
          >
            <Minimize2 className="w-4 h-4" />
            <span className="text-sm tracking-[0.2em] uppercase">Minimize</span>
          </button>
          <span className="text-zinc-500 text-sm">{project.name}</span>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors duration-300 text-sm"
            style={{ cursor: "pointer" }}
          >
            <span className="max-sm:hidden">Open External</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <iframe
          src={project.liveUrl}
          title={project.name}
          className="flex-1 w-full border-none bg-white"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-dark-2 text-zinc-300"
    >
      <div className="max-w-5xl mx-auto px-6 max-sm:px-4 py-12 max-sm:py-8">
        <button
          onClick={() => navigate("/projects")}
          className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 mb-12 max-sm:mb-8 cursor-none"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-sm tracking-[0.2em] uppercase">Projects</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-6xl max-sm:text-4xl text-white mb-4">
            {project.name}
          </h1>
          <p className="text-zinc-500 text-lg max-sm:text-base mb-10 max-sm:mb-6">
            {project.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full rounded-lg overflow-hidden mb-12 max-sm:mb-8 border border-zinc-800"
        >
          <div className="relative iframe-wrapper" style={{ cursor: "auto" }}>
            <iframe
              src={project.liveUrl}
              title={project.name}
              className="w-full h-[500px] max-sm:h-[350px] border-none bg-white"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
            <button
              onClick={() => setExpanded(true)}
              className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black rounded-md text-zinc-400 hover:text-white transition-all duration-300"
              style={{ cursor: "pointer" }}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <h2 className="text-xs tracking-[0.3em] uppercase text-zinc-600 mb-4">
              About
            </h2>
            <p className="text-zinc-300 text-lg max-sm:text-base leading-relaxed">
              {project.longDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-xs tracking-[0.3em] uppercase text-zinc-600 mb-4">
                Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm text-zinc-400 border border-zinc-800 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs tracking-[0.3em] uppercase text-zinc-600 mb-4">
                Link
              </h2>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300 cursor-none"
              >
                <span className="text-sm">Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
