"use client";
import React from "react";
import { ParallaxLayer } from "@react-spring/parallax";
import { jargons } from "@/db/types";
import { useMobile } from "@/hooks/use-mobile";

const motions: jargons[] = [
  {
    name: "Motion to Open Committee Session",
    description:
      "A motion to open the floor is a request made by a delegate to allow other delegates to speak or ask questions. It is typically used at the beginning of a session or after a speech.",
  },
  {
    name: "Motion to Open the General Speakers List",
    description:
      "A motion to open the general speakers list is a request made by a delegate to allow other delegates to sign up to speak on a specific topic. It is used to facilitate discussion and debate.",
  },
  {
    name: "Motion to Suspend Committee Session",
    description:
      "A motion to suspend the debate is a request made by a delegate to temporarily halt the proceedings. It is often used to take a break or allow for informal discussions.",
  },
  {
    name: "Motion to Divide the House",
    description:
      "A motion to divide the house is a request made by a delegate to call for a vote on a specific issue or resolution. It is used to determine the opinion of the committee on a particular matter.",
  },
  {
    name: "Motion to Introduce a Un/Moderated Caucus",
    description:
      "A motion to introduce a un/moderated caucus is a request made by a delegate to allow for informal discussions and debates among delegates. It is used to encourage collaboration and brainstorming.",
  },
];

const MotionsComp = () => {
  const [motion, setMotion] = React.useState<jargons | null>(null);
  const isMobile = useMobile();

  return (
    <div>
      <ParallaxLayer
        offset={2}
        speed={1.2}
        style={{
          backgroundImage: "url(/images/UN6.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle, transparent 0%, rgba(255,0,0,0.5) 100%)",
            pointerEvents: "none",
          }}
        />
      </ParallaxLayer>
      <ParallaxLayer
        offset={2}
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
            {motions.map((motion, index) => (
              <button
                key={index}
                className={`bg-white text-red-600 outline outline-gray-900 rounded-lg cursor-pointer ${
                  isMobile 
                    ? "w-full text-sm sm:text-base py-3 px-3 flex justify-center items-center min-h-[44px]" 
                    : "text-lg p-2"
                } transition-colors hover:bg-red-50`}
                onClick={() => setMotion(motion)}
              >
                <span className="text-center">{motion.name}</span>
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
                } text-center font-extrabold text-red-600 drop-shadow-lg`}
              >
                MOTIONS
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
              } text-red-600 bg-white p-3 ${
                isMobile ? "min-h-[80px] w-full" : "min-h-[100px] w-[320px]"
              } rounded transition-all duration-300 flex items-center justify-center shadow-sm`}
            >
              {motion ? (
                motion.description
              ) : (
                <span className="opacity-50 text-center px-1 sm:px-2">
                  Select a motion to see its description
                </span>
              )}
            </div>
          </div>
        </div>
      </ParallaxLayer>
    </div>
  );
};

export default MotionsComp;
