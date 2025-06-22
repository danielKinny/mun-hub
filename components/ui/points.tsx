"use client";
import React from "react";
import { ParallaxLayer} from "@react-spring/parallax";
import { jargons } from "@/db/types";
import { useMobile } from "@/hooks/use-mobile";

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
  const [point, setPoint] = React.useState<jargons | null>(null);
  const isMobile = useMobile();

  return (
    <div>
      <ParallaxLayer
        offset={1}
        speed={0.5}
        style={{
          backgroundImage: "url(/images/UN1.jpg)",
          backgroundSize: "cover",
        }}
      />
      <ParallaxLayer
        offset={1}
        speed={0.9}
        className="flex items-center justify-center w-full h-full px-1 sm:px-4"
        style={{ zIndex: 1 }}
      >
        <div
          className={`flex bg-white ${
            isMobile ? "flex-col" : "flex-row"
          } items-center justify-center w-full ${
            isMobile ? "gap-1 p-3 max-w-full overflow-x-hidden" : "gap-2 p-4"
          }`}
        >
          <div
            className={`flex flex-col items-center justify-center ${
              isMobile ? "order-2 w-full mt-4 space-y-3" : "w-auto space-y-2"
            }`}
          >
            {points.map((point, index) => (
              <button
                key={index}
                className={`bg-white text-green-600 outline outline-gray-500 rounded-lg cursor-pointer ${
                  isMobile 
                    ? "w-full text-sm sm:text-base py-3 px-3 flex justify-center items-center min-h-[44px]" 
                    : "text-lg p-2"
                } transition-colors hover:bg-gray-900`}
                onClick={() => setPoint(point)}
              >
                <span className="text-center">{point.name}</span>
              </button>
            ))}
          </div>
          <div
            className={`flex flex-col items-center justify-center h-full ${
              isMobile ? "mx-0 my-2 order-1 w-full" : "mx-2"
            }`}
          >
            <div className={`bg-white ${isMobile ? "w-full px-2" : "mb-2 p-2"}`}>
              <h1
                className={`${
                  isMobile ? "text-3xl sm:text-4xl py-1" : "text-9xl p-2"
                } text-center font-extrabold text-green-600 drop-shadow-lg`}
              >
                POINTS
              </h1>
            </div>
          </div>
          <div
            className={`flex flex-col items-center justify-center h-full ${
              isMobile ? "order-3 w-full mx-0 mt-3" : "ml-2"
            }`}
          >
            <div
              className={`${
                isMobile ? "text-sm sm:text-base" : "text-xl"
              } text-green-600 bg-white p-3 ${
                isMobile ? "min-h-[80px] w-full" : "min-h-[100px] w-[320px]"
              } rounded transition-all duration-300 flex items-center justify-center shadow-sm`}
            >
              {point ? (
                point.description
              ) : (
                <span className="opacity-50 text-center px-1 sm:px-2">
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
