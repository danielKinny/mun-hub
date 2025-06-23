"use client";
import React, { useRef } from "react";

import { CustomNav } from "@/components/ui/customnav";
import {ProtectedRoute} from "@/components/protectedroute";
import { useMobile } from "@/hooks/use-mobile";

import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";

import ResosComp from "@/components/ui/resos";
import MotionsComp from "@/components/ui/motions";
import PointsComp from "@/components/ui/points";

const Page = () => {
  const parallaxRef = useRef<IParallax>(null);
  const isMobile = useMobile();
  
  const handleScrollTo = (offset: number) => {
    if (parallaxRef.current) {
      parallaxRef.current.scrollTo(offset);
    }
  };

  return (
    <ProtectedRoute>
      <CustomNav />
      <Parallax pages={4} ref={parallaxRef}>
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{
            backgroundImage: "url(/images/UN10.jpg)",
            backgroundSize: "cover",
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={1.5}
          className="flex flex-col md:flex-row items-center justify-center w-full h-full"
        >
          <div className={`bg-black p-2 ${isMobile ? 'mb-4' : 'mr-10'}`}>
            <h1 className={`text-white ${isMobile ? 'text-5xl md:text-7xl lg:text-9xl' : 'text-9xl'} text-center font-extrabold`}>
              GLOSSARY
            </h1>
          </div>
          <div className={`space-y-2 p-2 ${isMobile ? 'w-[80%] md:w-auto' : 'w-[200px]'}`}>
            <h1
              className="text-white text-xl md:text-2xl text-center font-extrabold bg-black cursor-pointer p-2"
              onClick={() => handleScrollTo(1)}
            >
              POINTS
            </h1>
            <h1
              className="text-white text-xl md:text-2xl text-center font-extrabold bg-black cursor-pointer p-2"
              onClick={() => handleScrollTo(2)}
            >
              MOTIONS
            </h1>
            <h1
              className="text-white text-xl md:text-2xl text-center font-extrabold bg-black cursor-pointer p-2"
              onClick={() => handleScrollTo(3)}
            >
              RESOLUTIONS
            </h1>
          </div>
        </ParallaxLayer>

        <PointsComp />
        <MotionsComp />
        <ResosComp />
      </Parallax>
    </ProtectedRoute>
  );
};

export default Page;
