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
        className="flex items-center justify-center w-full h-full"
      >
        <div
          className={`flex bg-white ${
            isMobile ? "flex-col" : "flex-row"
          } items-center justify-center w-full gap-2 p-4`}
        >
          <div
            className={`flex flex-col items-center justify-center space-y-2 ${
              isMobile ? "order-2 w-full" : ""
            }`}
          >
            {motions.map((motion, index) => (
              <button
                key={index}
                className={`bg-white text-red-600 outline outline-gray-900 rounded-lg cursor-pointer p-2 text-lg ${
                  isMobile ? "w-full" : ""
                }`}
                onClick={() => setMotion(motion)}
              >
                {motion.name}
              </button>
            ))}
          </div>
          <div
            className={`flex flex-col items-center justify-center h-full ${
              isMobile ? "mx-0 my-4 order-1" : "mx-2"
            }`}
          >
            <div className="bg-white p-2 mb-2">
              <h1
                className={` ${
                  isMobile ? "text-5xl md:text-7xl" : "text-9xl"
                } text-center font-extrabold text-red-600 drop-shadow-lg p-2`}
              >
                MOTIONS
              </h1>
            </div>
          </div>
          <div
            className={`flex flex-col items-center justify-center h-full ${
              isMobile ? "order-3 w-full mx-0" : "ml-2"
            }`}
          >
            <div
              className={`text-xl text-red-600 bg-white p-3 min-h-[100px] ${
                isMobile ? "w-full" : "w-[320px]"
              } rounded transition-all duration-300 flex items-center justify-center`}
            >
              {motion ? (
                motion.description
              ) : (
                <span className="opacity-50">
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
