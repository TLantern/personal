"use client";

import React, { useState, useEffect } from "react";

const StarsBackground = () => {
  const [shadowsSmall, setShadowsSmall] = useState("");
  const [shadowsMedium, setShadowsMedium] = useState("");
  const [shadowsBig, setShadowsBig] = useState("");

  useEffect(() => {
  const generateBoxShadow = (n: number): string => {
    const shadows: string[] = [];
    for (let i = 0; i < n; i++) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px #FFF`);
    }
    return shadows.join(", ");
  };

    setShadowsSmall(generateBoxShadow(700));
    setShadowsMedium(generateBoxShadow(200));
    setShadowsBig(generateBoxShadow(100));
  }, []);

  return (
    <>
      <div id="stars" style={{ boxShadow: shadowsSmall, ["--shadows-small" as any]: shadowsSmall }} />
      <div id="stars2" style={{ boxShadow: shadowsMedium, ["--shadows-medium" as any]: shadowsMedium }} />
      <div id="stars3" style={{ boxShadow: shadowsBig, ["--shadows-big" as any]: shadowsBig }} />
      <style jsx>{`
        #stars,
        #stars2,
        #stars3 {
          position: fixed;
          top: 0;
          left: 0;
          width: 1px;
          height: 1px;
          background: transparent;
          z-index: 0;
        }

        #stars {
          width: 1px;
          height: 1px;
          background: transparent;
          animation: animStar 400s linear infinite;
        }

        #stars:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: var(--shadows-small);
        }

        #stars2 {
          width: 2px;
          height: 2px;
          background: transparent;
          animation: animStar 100s linear infinite;
        }

        #stars2:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 2px;
          height: 2px;
          background: transparent;
          box-shadow: var(--shadows-medium);
        }

        #stars3 {
          width: 3px;
          height: 3px;
          background: transparent;
          animation: animStar 150s linear infinite;
        }

        #stars3:after {
          content: " ";
          position: absolute;
          top: 2000px;
          width: 3px;
          height: 3px;
          background: transparent;
          box-shadow: var(--shadows-big);
        }

        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </>
  );
};

export default StarsBackground;

