import React from 'react';
import { Badge } from './badge';

interface CardProps {
  title: string;
  description: string;
  frameworks?: string[];
  image?: string;
  imageAlt?: string;
  link?: string;
  className?: string;
}

export const Card = ({ title, description, frameworks = [], image, imageAlt, link, className = "" }: CardProps) => {
  const cardContent = (
    <>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-semibold text-sm">{title}</h3>
          <div className="flex flex-wrap gap-1.5 ml-2">
            {frameworks.map((framework, index) => (
              <Badge key={index} variant="secondary" className="text-[10px] px-2 py-0.5">
                {framework}
              </Badge>
            ))}
          </div>
        </div>
        <p className="text-white/70 text-xs leading-relaxed">{description}</p>
      </div>
      {image ? (
        <div className="flex-shrink-0 w-16 h-16 rounded border border-white/10 overflow-hidden bg-white/5">
          <img src={image} alt={imageAlt || title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded border-l border-white/10 flex items-center justify-center">
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
        </div>
      )}
    </>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer ${className}`}
    >
      {cardContent}
    </a>
  ) : (
    <div className={`bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm flex items-center gap-3 ${className}`}>
      {cardContent}
    </div>
  );
};

