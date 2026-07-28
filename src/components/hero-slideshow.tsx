"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface HeroSlideshowProps {
  images: { src: string; alt: string }[];
  interval?: number;
}

export default function HeroSlideshow({
  images,
  interval = 5000,
}: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [current, isTransitioning]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [current, images.length, interval, goTo]);

  return (
    <div className="relative w-full">
      {images.map((image, i) => (
        <div
          key={image.src}
          className="w-full transition-opacity duration-500 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, position: i === current ? "relative" : "absolute", top: 0, left: 0 }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={2400}
            height={1350}
            className="w-full h-auto"
            unoptimized
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-text-1 scale-110"
                : "bg-text-4/40 hover:bg-text-4/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
