"use client";

import React from "react";

export interface MeteorsProps {
  number?: number;
  isFading?: boolean;
}

export const Meteors: React.FC<MeteorsProps> = ({ number = 20, isFading = false }) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <div className={`meteors-container ${isFading ? "fading" : ""}`}>
      {meteors.map((el, idx) => {
        const left = Math.random() * 100;
        const delay = Math.random() * (0.8 - 0.2) + 0.2;
        const duration = Math.floor(Math.random() * (10 - 2) + 2);
        
        return (
          <span
            key={"meteor" + idx}
            className="meteor"
            style={{
              left: left + "%",
              top: "-10px",
              animationDelay: delay + "s",
              animationDuration: duration + "s",
            }}
          >
            <style jsx>{`
              .meteors-container {
                position: absolute;
                inset: 0;
                pointer-events: none;
                opacity: 1;
                transition: opacity 0.5s ease-out;
              }
              .meteors-container.fading {
                opacity: 0;
              }
              .meteor {
                position: absolute;
                height: 2px;
                width: 2px;
                border-radius: 9999px;
                background: #64748b;
                box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
                animation: meteor linear infinite;
              }
              @keyframes meteor {
                0% {
                  transform: translateY(0);
                  opacity: 1;
                }
                70% {
                  opacity: 1;
                }
                100% {
                  transform: translateY(500px);
                  opacity: 0;
                }
              }
            `}</style>
          </span>
        );
      })}
    </div>
  );
};

