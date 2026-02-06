import { Link, useNavigate } from "react-router-dom";
import { projects } from "@/constants";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const ProjectsPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-dark-2 text-zinc-300"
    >
      <div className="max-w-5xl mx-auto px-6 max-sm:px-4 py-12 max-sm:py-8">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300 mb-12 max-sm:mb-8 cursor-none"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-sm tracking-[0.2em] uppercase">Home</span>
        </button>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-7xl max-sm:text-5xl text-white mb-4"
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-zinc-500 text-lg max-sm:text-base mb-12 max-sm:mb-8"
        >
          A collection of things I've built
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="group block relative overflow-hidden rounded-lg border border-zinc-800 hover:border-zinc-600 transition-all duration-300 cursor-none"
              >
                <div className="relative h-52 max-sm:h-40 overflow-hidden">
                  <img
                    src={project.background}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 max-sm:p-4">
                  <h2 className="text-2xl max-sm:text-xl text-white mb-1">
                    {project.name}
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
