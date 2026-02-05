import ReactRotatingText from "react-rotating-text";
import TextRevealByWord from "../magicui/text-reveal";
import { aboutMe } from "@/constants";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="md:w-[90%] lg:w-[65%] mx-auto  ">
      <div className="flex flex-col p-5 items-center justify-center w-full">
        <div className="relative h-[100vh]  flex flex-col items-center justify-center w-full text-9xl max-xl:text-6xl max-sm:text-5xl">
          <h1 className="inline-block">
            <ReactRotatingText items={["REVERIE", "pleasantly lost..."]} />
          </h1>
          <span className="absolute bottom-2 right-2"> </span>
        </div>

        <div className="z-10 md:w-[600px] sm:w-[70%] flex items-center justify-center rounded-lg relative ">
          <TextRevealByWord text={aboutMe}/> 
        </div>
        <div className="z-10 mt-6 flex gap-4">
          <Button size="lg" variant="mac" className="w-56" asChild>
            <a href="/Resume.pdf" download aria-label="Download Resume">Download Resume</a>
          </Button>

          <Button size="lg" variant="mac" className="w-64" asChild>
            <a href="https://legacymusicbranding.etsy.com/listing/1570153618/trademark-filing-guide-ebook-uspto" target="_blank" rel="noreferrer" aria-label="Open USPTO Handbook on Etsy">Buy USPTO Handbook</a>
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default Hero;
