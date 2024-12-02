"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css"; 
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  { id: 1, src: "/slides/slide_1.png" },
  { id: 2, src: "/slides/slide_2.png" },
  { id: 3, src: "/slides/slide_3.png" },
  { id: 4, src: "/slides/slide_4.png" },
  { id: 5, src: "/slides/slide_5.png" },
  { id: 6, src: "/slides/slide_6.png" },
  { id: 7, src: "/slides/slide_7.png" },
  { id: 8, src: "/slides/slide_8.png" },
  { id: 9, src: "/slides/slide_9.png" },
  
];

const HeroSlides = () => {
  const [isClient, setIsClient] = useState(false); // Ensure rendering only on client

  // Call hooks at the top level
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: 1 },
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setIsClient(true); // Set client-side rendering flag
  }, []);

  useEffect(() => {
    if (isClient && instanceRef.current) { // Run only on client
      timerRef.current = setInterval(() => {
        instanceRef.current?.next();
      }, 5000); // Slide every 5 seconds
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isClient, instanceRef]);

  // Render only after confirming the client-side
  return isClient ? (
    <div ref={sliderRef} className="
                                    keen-slider 
                                    h-[100vh]
                                    w-full
                                   "
    >
      {slides.map((slide) => (
        <div key={slide.id} className="
                                        keen-slider__slide 
                                        relative
                                      "
        >
          <Image
            src={slide.src}
            alt={`Slide ${slide.id}`}
            layout="fill"
            objectFit="cover"
            quality={90}
            onError={() => console.error(`Failed to load ${slide.src}`)}
          />
        </div>
      ))}
    </div>
  ) : null;
};

export default HeroSlides;

