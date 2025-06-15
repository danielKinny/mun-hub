"use client";
import React from "react";
import { ParallaxLayer } from "@react-spring/parallax";
import { jargons } from "@/db/types";

const resos: jargons[] = [
  {
    name: "Resolution",
    description:
      "A resolution is a formal document that outlines the committee's stance on a specific issue. It includes the committee's recommendations and proposed actions.",
  },
  {
    name: "Position Paper",
    description:
      "A position paper is a document that outlines a delegate's stance on a specific issue. It is used to inform other delegates of the delegate's position and to support their arguments during the debate.",
  },
  {
    name: "Amendment",
    description:
      "An amendment is a proposed change to a resolution or working paper. It is used to modify the content of the document to better reflect the committee's consensus.",
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
        className="flex items-center justify-center w-full h-full"
      >
        <div className="flex flex-row items-center justify-center bg-white w-full p-2 gap-2">
          <div className="grid grid-cols-2 grid-rows-5 gap-2 mx-4 my-8">
            {resos.map((reso, index) => (
              <button
                key={index}
                className=" text-blue-900 font-bold outline outline-gray-800 p-1 cursor-pointer rounded-lg text-xl"
                onClick={() => setReso(reso)}
              >
                {reso.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center h-full mx-2">
            <div className=" p-2 mb-2">
              <h1 className="text-blue-900 text-9xl text-center font-extrabold drop-shadow-xl">
                RESOLUTIONS
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full ml-2">
            <div className="text-xl font-bold text-blue-900 outline outline-gray-900 p-4 w-[320px] h-[25rem] rounded-lg transition-all duration-300 flex items-center justify-center">
              {reso ? (
                reso.description
              ) : (
                <span className="opacity-50">
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
