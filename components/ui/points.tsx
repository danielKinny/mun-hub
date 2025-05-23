"use client";
import React, {useRef } from "react";
import { ParallaxLayer } from "@react-spring/parallax";
import { jargons } from "@/db/types";

const points: jargons[] = [
  {
    name: "Point of Information",
    description:
      "A point of information is a request for information from the speaker. It is used to ask a question or seek clarification on a specific point made during the speech.",
  },
  {
    name: "Point of Inquiry",
    description:
      "A point of inquiry is a request for clarification or further explanation on a specific topic or issue. It is used to seek more information about the subject matter being discussed.",
  },
  {
    name: "Point of Personal Privilege",
    description:
      "A point of personal privilege is a request made by a delegate to address a personal matter that affects their ability to participate in the debate. It is often used to raise concerns about noise, distractions, or other issues.",
  },
  {
    name: "Point of Order",
    description:
      "A point of order is a request made by a delegate to call attention to a violation of the rules or procedures of the committee. It is used to ensure that the debate follows the established guidelines.",
  },
];

const PointsComp = () => {
  const parallaxRef = useRef<any>(null);
  const [point, setPoint] = React.useState<jargons | null>(null);

  return (
    <div>
      <ParallaxLayer
        offset={1}
        speed={0.5}
        style={{
          backgroundImage: "url(/images/UN7.jpg)",
          backgroundSize: "cover",
        }}
      />
      <ParallaxLayer
        offset={1}
        speed={0.9}
        className="flex items-center justify-center w-full h-full"
      >
        <div className="flex flex-row items-center justify-center h-full w-full gap-2">
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            {points.map((point, index) => (
              <button
                key={index}
                className="bg-black text-white cursor-pointer p-2 text-2xl"
                onClick={() => setPoint(point)}
              >
                {point.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center h-full mx-2">
            <div className="bg-black p-2 mb-2">
              <h1 className="text-white text-9xl text-center font-extrabold">
                POINTS
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full ml-2">
            <div className="text-xl text-white bg-black p-3 min-h-[100px] w-[320px] rounded transition-all duration-300 flex items-center justify-center">
              {point ? (
                point.description
              ) : (
                <span className="opacity-50">
                  Select a point to see its description
                </span>
              )}
            </div>
          </div>
        </div>
      </ParallaxLayer>
    </div>
  );
};

export default PointsComp;
