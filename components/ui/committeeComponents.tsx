"use client";
import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const createCommitteeComponent = (
  name: string,
  logo: string,
  bgImage1: string,
  bgImage2: string,
  agenda1: string,
  agenda2: string
) => {
  const CommitteeComponent = () => {
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
            }}
            className="flex items-center justify-center w-full h-full"
          />

          <ParallaxLayer
            offset={0}
            factor={1}
            speed={2}
            className="flex items-center justify-center w-full h-full"
          >
            <h2 className="text-white text-9xl text-center font-extrabold">
              {name}
            </h2>
          </ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={0.5}
            style={{
              backgroundImage: `url(/images/${bgImage2})`,
              backgroundSize: "cover",
            }}
            className="flex items-center justify-center w-full h-full"
          ></ParallaxLayer>

          <ParallaxLayer
            offset={1}
            speed={1.4}
            className="flex items-center justify-center w-full h-full"
          >
            <div className="text-center flex flex-row items-center justify-center w-full h-full space-x-4 text-white text-3xl font-extrabold">
              <div>
                <p>
                  Agenda 1: <br /> {agenda1}
                </p>
              </div>
              <div>
                <h1 className="text-9xl p-6"> Agendas </h1>
              </div>
              <div>
                <p>
                  Agenda 2: <br /> {agenda2}
                </p>
              </div>
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
    );
  };

  return CommitteeComponent;
};

export const committeeData = [
  {
    name: "UNHRC",
    logo: "UNEMBLEM.png",
    bgImage1: "UNHRC1.jpg",
    bgImage2: "UNHRC2.jpg",
    agenda1: "placeholder text for agenda 1 of UNHRC",
    agenda2: "placeholder text for agenda 2 of UNHRC",
  },
  {
    name: "IACA",
    logo: "UNEMBLEM.png",
    bgImage1: "IACA1.jpg",
    bgImage2: "IACA2.jpg",
    agenda1: "placeholder text for agenda 1 of IACA",
    agenda2: "placeholder text for agenda 2 of IACA",
  },
  {
    name: "HSC",
    logo: "UNEMBLEM.png",
    bgImage1: "HSC1.jpg",
    bgImage2: "HSC2.jpg",
    agenda1: "placeholder text for agenda 1 of HSC",
    agenda2: "placeholder text for agenda 2 of HSC",
  },
  {
    name: "IPACRC",
    logo: "UNEMBLEM.png",
    bgImage1: "IPACRC1.jpg",
    bgImage2: "IPACRC2.jpg",
    agenda1: "placeholder text for agenda 1 of IPACRC",
    agenda2: "placeholder text for agenda 2 of IPACRC",
  },
  {
    name: "UNBOCC",
    logo: "UNEMBLEM.png",
    bgImage1: "UNBOCC1.jpg",
    bgImage2: "UNBOCC2.jpg",
    agenda1: "placeholder text for agenda 1 of UNBOCC",
    agenda2: "placeholder text for agenda 2 of UNBOCC",
  },
  {
    name: "IPC",
    logo: "UNEMBLEM.png",
    bgImage1: "IPC1.jpg",
    bgImage2: "IPC2.jpg",
    agenda1: "placeholder text for agenda 1 of IPC",
    agenda2: "placeholder text for agenda 2 of IPC",
  },
  {
    name: "CSW",
    logo: "UNEMBLEM.png",
    bgImage1: "CSW1.jpg",
    bgImage2: "CSW2.jpg",
    agenda1: "placeholder text for agenda 1 of CSW",
    agenda2: "placeholder text for agenda 2 of CSW",
  },
  {
    name: "COE",
    logo: "UNEMBLEM.png",
    bgImage1: "COE1.jpg",
    bgImage2: "COE2.jpg",
    agenda1: "placeholder text for agenda 1 of COE",
    agenda2: "placeholder text for agenda 2 of COE",
  },
];

// Helper function to find committee data by name
const getCommitteeByName = (name: string) => {
  return committeeData.find(committee => committee.name === name) || {
    name: "",
    logo: "",
    bgImage1: "",
    bgImage2: "",
    agenda1: "",
    agenda2: ""
  };
};

const UNHRC = createCommitteeComponent(
  "UNHRC",
  getCommitteeByName("UNHRC").logo,
  getCommitteeByName("UNHRC").bgImage1,
  getCommitteeByName("UNHRC").bgImage2,
  getCommitteeByName("UNHRC").agenda1,
  getCommitteeByName("UNHRC").agenda2
);

const HSC = createCommitteeComponent(
  "HSC",
  getCommitteeByName("HSC").logo,
  getCommitteeByName("HSC").bgImage1,
  getCommitteeByName("HSC").bgImage2,
  getCommitteeByName("HSC").agenda1,
  getCommitteeByName("HSC").agenda2
);

const IACA = createCommitteeComponent(
  "IACA",
  getCommitteeByName("IACA").logo,
  getCommitteeByName("IACA").bgImage1,
  getCommitteeByName("IACA").bgImage2,
  getCommitteeByName("IACA").agenda1,
  getCommitteeByName("IACA").agenda2
);

const IPACRC = createCommitteeComponent(
  "IPACRC",
  getCommitteeByName("IPACRC").logo,
  getCommitteeByName("IPACRC").bgImage1,
  getCommitteeByName("IPACRC").bgImage2,
  getCommitteeByName("IPACRC").agenda1,
  getCommitteeByName("IPACRC").agenda2
);

const UNBOCC = createCommitteeComponent(
  "UNBOCC",
  getCommitteeByName("UNBOCC").logo,
  getCommitteeByName("UNBOCC").bgImage1,
  getCommitteeByName("UNBOCC").bgImage2,
  getCommitteeByName("UNBOCC").agenda1,
  getCommitteeByName("UNBOCC").agenda2
);

const IPC = createCommitteeComponent(
  "IPC",
  getCommitteeByName("IPC").logo,
  getCommitteeByName("IPC").bgImage1,
  getCommitteeByName("IPC").bgImage2,
  getCommitteeByName("IPC").agenda1,
  getCommitteeByName("IPC").agenda2
);

const CSW = createCommitteeComponent(
  "CSW",
  getCommitteeByName("CSW").logo,
  getCommitteeByName("CSW").bgImage1,
  getCommitteeByName("CSW").bgImage2,
  getCommitteeByName("CSW").agenda1,
  getCommitteeByName("CSW").agenda2
);

const COE = createCommitteeComponent(
  "COE",
  getCommitteeByName("COE").logo,
  getCommitteeByName("COE").bgImage1,
  getCommitteeByName("COE").bgImage2,
  getCommitteeByName("COE").agenda1,
  getCommitteeByName("COE").agenda2
);

export { UNHRC, HSC, IACA, IPACRC, UNBOCC, IPC, CSW, COE };
