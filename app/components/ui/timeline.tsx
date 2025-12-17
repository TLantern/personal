"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans"
      ref={containerRef}
    >
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
            <div
            key={index}
            className="flex justify-start pt-0 md:pt-0 md:gap-10 mb-32"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-0 md:w-0">
              <div className="h-10 absolute left-0 md:left-0 w-10 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-white" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-[50px] md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 uppercase text-[0.85em]">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-4 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500 uppercase">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-0 top-0 overflow-hidden w-[2px]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-purple-500 via-purple-400 to-purple-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
