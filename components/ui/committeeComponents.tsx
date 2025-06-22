"use client";
import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useMobile } from "../../hooks/use-mobile";

const createCommitteeComponent = (
  name: string,
  bgImage1: string,
  bgImage2: string,
  agenda1: string
) => {
  const CommitteeComponent = () => {
    const isMobile = useMobile();
    
    return (
      <div>
        <Parallax pages={2}>
          <ParallaxLayer
            offset={0}
            speed={1.5}
            factor={1.5}
            style={{
              backgroundImage: `url(/images/${bgImage1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex items-center justify-center w-full h-full"
          />

          <ParallaxLayer
            offset={0}
            factor={1}
            speed={2}
            className="flex items-center justify-center w-full h-full"
          >
            <h2 className={`text-white ${isMobile ? 'text-4xl px-4' : 'text-9xl'} text-center font-extrabold`}>
              {name}
            </h2>
          </ParallaxLayer>

          <ParallaxLayer
            offset={isMobile ? 1 : 1}
            speed={0.5}
            style={{
              backgroundImage: `url(/images/${bgImage2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="flex items-center justify-center w-full h-full"
          ></ParallaxLayer>

          <ParallaxLayer
            offset={isMobile ? 1 : 1}
            speed={1.4}
            className="flex items-center justify-center w-full h-full"
          >
            {isMobile ? (
              <div className="text-center px-4 py-6 w-full flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl font-extrabold mb-6">Agenda</h1>
                <div className="w-full">
                  <p className="text-lg font-medium">
                    {agenda1}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center flex flex-row items-center justify-center w-full h-full space-x-4 text-white text-3xl font-extrabold">
                <div>
                  <h1 className="text-9xl p-6">Agenda</h1>
                </div>
                <div className="max-w-2xl">
                  <p>
                    Agenda: <br /> {agenda1}
                  </p>
                </div>
              </div>
            )}
          </ParallaxLayer>
        </Parallax>
      </div>
    );
  };

  return CommitteeComponent;
};

export const committeeData = [
  {
    name: "UNHCR",
    fullname: "United Nations High Commissioner for Refugees",
    logo: "UNHCRLOGO.png",
    bgImage1: "UNHCR1.jpg",
    bgImage2: "UNHCR2.jpg",
    agenda1: "Defending Refugee Rights in the Age of Rising Xenophobic Nationalism",
  },
  {
    name: "IACA",
    fullname: "International Aviation and something",
    logo: "IACALOGO.png",
    bgImage1: "IACA1.jpg",
    bgImage2: "IACA2.jpg",
    agenda1: "CRISIS COMMITTEE - Developing Sustainable Aviation and Management of rapidly increasing worldwide Carbon Emissions",
  },
  {
    name: "HSC",
    fullname: "Historic Security Council",
    logo: "HSCLOGO.png",
    bgImage1: "HSC1.jpg",
    bgImage2: "HSC2.jpg",
    agenda1: "World War II, 1943: Reclaiming Occupied Europe – Strategic Decisions on Axis-Held Territories",
  },
  {
    name: "IPACRC",
    fullname: "International Psychological Association Case Review Commisssion",
    logo: "IPACRCLOGO.png",
    bgImage1: "IPACRC1.jpg",
    bgImage2: "IPACRC2.jpg",
    agenda1: "Discussing the use of social learning as a method to combat increasing crime rates",
  },
  {
    name: "UNBOCC",
    fullname: "United Nations Black Ops Crisis Committee",
    logo: "UNBOCCLOGO.png",
    bgImage1: "UNBOCC1.jpg",
    bgImage2: "UNBOCC2.jpg",
    agenda1: "CRISIS COMMITTEE - The Breach\nClassified briefing: A global cyberattack has begun. Systems are failing. Attribution unknown. Coordination essential. Trust, compromised.",
  },
  {
    name: "IPC",
    fullname: "International Press Corps",
    logo: "IPCLOGO.png",
    bgImage1: "IPC1.jpg",
    bgImage2: "IPC2.jpg",
    agenda1: "Combating the use of Mass Media in the escalation and sensationalization of global crises and phenomena.",
  },
  {
    name: "COE",
    fullname: "Council of Europe",
    logo: "COELOGO.png",
    bgImage1: "COE1.jpg",
    bgImage2: "COE2.jpg",
    agenda1: "Re-examining Article 8 of the ECHR: Balancing Privacy Rights with National Security and Public Interest",
  },
];

const committeeComponentMap: Record<string, React.FC> = {};
committeeData.forEach((committee) => {
  committeeComponentMap[committee.name] = createCommitteeComponent(
    committee.name,
    committee.bgImage1,
    committee.bgImage2,
    committee.agenda1
  );
});

export const UNHCR = committeeComponentMap["UNHCR"];
export const HSC = committeeComponentMap["HSC"];
export const IACA = committeeComponentMap["IACA"];
export const IPACRC = committeeComponentMap["IPACRC"];
export const UNBOCC = committeeComponentMap["UNBOCC"];
export const IPC = committeeComponentMap["IPC"];
export const COE = committeeComponentMap["COE"];

export const committeeComponentMapExport = committeeComponentMap;
