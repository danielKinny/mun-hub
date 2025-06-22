"use client";
import React from "react";
import { ParallaxLayer } from "@react-spring/parallax";
import { jargons } from "@/db/types";
import { useMobile } from "@/hooks/use-mobile";

const resos: jargons[] = [
  {
    name: "Resolution",
    description:
      "A resolution is a formal document that outlines the committee's stance on a specific issue. It includes the committee's recommendations and proposed actions.",
  },
  {
    name: "Co-Sponsor",
    description:
      "A co-sponsor is a delegate who supports a resolution or working paper and is willing to sign it. Co-sponsors are often involved in the drafting process and help to gather support for the document.",
  },
  {
    name: "Signatory",
    description:
      "A signatory is a delegate who supports a resolution or working paper but is not necessarily involved in the drafting process. Signatories are often used to demonstrate support for a document before it is formally introduced.",
  },
  {
    name: "Preamble",
    description:
      "A preamble is the introductory section of a resolution or working paper. It provides background information and context for the issue being addressed.",
  },
  {
    name: "Operative Clause",
    description:
      "An operative clause is a specific action or recommendation included in a resolution. It outlines the committee's proposed actions and recommendations for addressing the issue.",
  },
  {
    name: "Friendly Amendment",
    description:
      "A friendly amendment is a proposed change to a resolution or working paper that is accepted by the original sponsors. It is used to modify the document without requiring a formal vote.",
  },
  {
    name: "Unfriendly Amendment",
    description:
      "An unfriendly amendment is a proposed change to a resolution or working paper that is not accepted by the original sponsors. It requires a formal vote to be adopted.",
  },
];

const ResosComp = () => {
  const [reso, setReso] = React.useState<jargons | null>(null);
  const isMobile = useMobile();

  return (
    <div>
      <ParallaxLayer
        offset={3}
        speed={0.5}
        style={{
          backgroundImage: "url(/images/UN5.jpg)",
          backgroundSize: "cover",
        }}
      />
      <ParallaxLayer
        offset={3}
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
            className={`flex flex-col items-center justify-center relative ${
              isMobile ? "order-2 w-full mt-4" : "w-auto"
            }`}
          >
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
            
            <div 
              className={`flex flex-col items-center justify-start space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-100 ${
                isMobile ? "max-h-[250px] w-full" : "max-h-[300px] w-auto"
              } px-2 py-1 pb-6`}
            >
              {resos.map((reso, index) => (
                <button
                  key={index}
                  className={`bg-white text-blue-900 outline outline-gray-800 rounded-lg cursor-pointer ${
                    isMobile 
                      ? "w-full text-sm sm:text-base py-3 px-3 flex justify-center items-center min-h-[44px]" 
                      : "text-lg p-2 w-full"
                  } transition-colors hover:bg-blue-50 font-bold`}
                  onClick={() => setReso(reso)}
                >
                  <span className="text-center">{reso.name}</span>
                </button>
              ))}
            </div>
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
                } text-center font-extrabold text-blue-900 drop-shadow-lg`}
              >
                RESOLUTIONS
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
              } text-blue-900 bg-white p-3 ${
                isMobile ? "min-h-[80px] w-full" : "min-h-[100px] w-[320px]"
              } rounded outline outline-gray-800 transition-all duration-300 flex items-center justify-center shadow-sm font-bold`}
            >
              {reso ? (
                reso.description
              ) : (
                <span className="opacity-50 text-center px-1 sm:px-2">
                  Select a resolution term to see its description
                </span>
              )}
            </div>
          </div>
        </div>
      </ParallaxLayer>
    </div>
  );
};

export default ResosComp;
