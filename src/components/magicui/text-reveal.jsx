"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Modal, ModalTrigger } from "../ui/animated-modal";
import ModalForm from "../shared/ModalForm";
import AnimatedShinyText from "./animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { name, theme } from "@/constants";

const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

export const TextRevealByWord = ({ text, className, children }) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: isMobile ? ["start 0.6", "end 0.5"] : ["start 0.5", "end 0.5"],
  });
  const words = text.split(" ");

  const wordOpacity = scrollYProgress;
  const buttonOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  return (
    <div
      ref={targetRef}
      className={cn("relative z-50 min-h-[150vh] max-sm:min-h-[85vh] overflow-x-clip", className)}
      style={
        {
          "--color": theme,
        }
      }
    >
      <div
        className={
          "mx-auto flex flex-col justify-center max-w-5xl bg-transparent md:px-[1rem] py-[2rem]"
        }
      >
        <div className="w-full flex flex-col items-center justify-center mb-16 text-center">
          <h1 className="inline-block text-6xl max-md:text-3xl">I&apos;m</h1>

          <h1 className={`text-9xl max-xl:text-8xl max-sm:text-4xl text-zinc-500 max-sm:text-center max-sm:leading-tight`}>
            {name}
          </h1>
        </div>
        <p
          className={
            "flex flex-wrap p-5 max-sm:p-3 lg:w-[750px] mx-auto text-2xl max-sm:text-xl text-transparent md:p-8 sm:text-3xl md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl text-left"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length * 0.7;
            const end = start + (1 / words.length) * 0.7;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
        <motion.div
          style={{ opacity: buttonOpacity }}
          className="flex items-center px-5 justify-start overflow-hidden"
        >
          <Modal>
            <ModalTrigger className="group/modal-btn cursor-none p-0">
              <div className="z-10 flex items-center justify-center">
                <div
                  className={cn(
                    "group rounded-full text-base text-white transition-all ease-in border border-zinc-600/70 hover:cursor-pointer bg-neutral-950 hover:bg-neutral-800"
                  )}
                >
                  <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-4 transition ease-out hover:[color:var(--color)] hover:duration-300 lg:text-3xl md:text-2xl">
                    <span>👋🏾 Say hi!</span>
                    <ArrowRightIcon className="ml-1 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                  </AnimatedShinyText>
                </div>
              </div>
            </ModalTrigger>
            <ModalForm />
          </Modal>
        </motion.div>
        {children && (
          <motion.div
            style={{ opacity: buttonOpacity }}
            className="mt-6 max-sm:mt-4"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span style={{ opacity: opacity }} className={"text-white"}>
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
