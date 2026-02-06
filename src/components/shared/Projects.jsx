import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import useIntersection from "./useIntersection";
import { projects } from "@/constants";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  const [ref, ratio] = useIntersection({
    threshold: [0.05, 0.2, 0.4, 0.55, 0.8, 1.0],
  });

  const getBlurClass = () => {
    if (ratio >= 0.45) return "blur-none";
    if (ratio >= 0.4) return "blur-md";
    if (ratio >= 0.05) return "blur-xl";
    return "blur-2xl";
  };

  return (
    <div className="w-full mx-auto">
      <div className="md:w-[90%] lg:w-[65%] mx-auto max-md:px-4 flex items-end justify-between">
        <h1 className="text-7xl max-xl:text-6xl max-sm:text-5xl m-5 max-sm:mx-0 max-sm:mb-4 xl:mt-32">
          Projects
        </h1>
        <Link
          to="/projects"
          className="group flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors duration-300 mb-6 max-sm:mb-4 cursor-none"
        >
          <span className="text-sm tracking-[0.15em] uppercase">View All</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
      <div
        ref={ref}
        className={`transition-all duration-500 ease-in-out ${getBlurClass()}`}
      >
        <BentoGrid className="grid-cols-2 grid-rows-6 h-[800px] md:grid-rows-4 md:grid-cols-4 md:h-[900px] gap-1.5 max-sm:gap-1 max-sm:h-auto max-sm:grid-rows-none max-sm:auto-rows-[140px] max-sm:px-1">
          {projects.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}
