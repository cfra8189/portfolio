import ReactRotatingText from "react-rotating-text";
import TextRevealByWord from "../magicui/text-reveal";
import { aboutMe } from "@/constants";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="absolute bottom-8 max-sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
    >
      <span className="text-zinc-500 text-xs tracking-[0.3em] uppercase">scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <div className="md:w-[90%] lg:w-[65%] mx-auto">
      <div className="flex flex-col px-4 max-sm:px-3 items-center justify-center w-full">
        <div className="relative h-[100vh] max-sm:h-[100svh] flex flex-col items-center justify-center w-full text-9xl max-xl:text-6xl max-sm:text-5xl">
          <h1 className="inline-block">
            <ReactRotatingText items={["REVERIE", "pleasantly lost..."]} />
          </h1>
          <ScrollIndicator />
        </div>

        <div className="z-10 md:w-[600px] sm:w-[70%] w-full flex items-center justify-center rounded-lg relative">
          <TextRevealByWord text={aboutMe}>
            <div className="flex gap-4 max-sm:flex-col max-sm:gap-3 max-sm:w-full px-5">
              <Button size="lg" variant="mac" className="w-56 max-sm:w-full" asChild>
                <a href="/Resume.pdf" download aria-label="Download Resume">Download Resume</a>
              </Button>
              <Button size="lg" variant="mac" className="w-64 max-sm:w-full" asChild>
                <a href="https://legacymusicbranding.etsy.com/listing/1570153618/trademark-filing-guide-ebook-uspto" target="_blank" rel="noreferrer" aria-label="Open USPTO Handbook on Etsy">Buy USPTO Handbook</a>
              </Button>
            </div>
          </TextRevealByWord>
        </div>
        
      </div>
    </div>
  );
};

export default Hero;
