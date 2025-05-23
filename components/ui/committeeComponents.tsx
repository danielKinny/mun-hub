"use client";
import React from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

const createCommitteeComponent = (
    name: string,
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
                            backgroundSize: 'cover',
                        }}
                        className="flex items-center justify-center w-full h-full"
                    />

                    <ParallaxLayer
                        offset={0}
                        factor={1}
                        speed={2}
                        className="flex items-center justify-center w-full h-full"
                    >
                        <h2 className="text-white text-9xl text-center font-extrabold">{name}</h2>
                    </ParallaxLayer>
                    
                    <ParallaxLayer
                        offset={1}
                        speed={0.5}
                        style={{
                            backgroundImage: `url(/images/${bgImage2})`,
                            backgroundSize: 'cover',
                        }}
                        className="flex items-center justify-center w-full h-full"
                    >
                    </ParallaxLayer>
                    
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

const committeeData = {
  UNHRC: {
    bgImage1: "UNHRC.jpg",
    bgImage2: "UNHRC2.jpg",
    agenda1: "Human Rights Violations in the Xinjiang Uyghur Autonomous Region\nFocus: Alleged mass internment, surveillance, and cultural repression.",
    agenda2: "Protecting Freedom of Expression and Digital Rights under Authoritarian Regimes\nFocus: Government censorship, internet shutdowns, and suppression of dissent."
  },
  UNSC: {
    bgImage1: "UNSC.jpg",
    bgImage2: "UNSC2.jpg",
    agenda1: "The Situation in the Red Sea and Ensuring Maritime Security in International Waters\nFocus: Ongoing threats to shipping lanes, including piracy and state-sponsored aggression.",
    agenda2: "Addressing the Escalation of the Israel-Palestine Conflict and Ensuring Humanitarian Access\nFocus: Civilian protection, ceasefire enforcement, and access for aid organizations."
  },
  UNODC: {
    bgImage1: "UNODC.jpg",
    bgImage2: "UNODC2.jpg",
    agenda1: "Combating the Illicit Trade of Synthetic Drugs and Precursors",
    agenda2: "Tackling Human Trafficking and Forced Labor in Conflict Zones"
  },
  UNESCO: {
    bgImage1: "UNESCO.jpg",
    bgImage2: "UNESCO2.jpg",
    agenda1: "Safeguarding Cultural Heritage in Conflict Zones\nFocus: Deliberate destruction of historical sites (e.g., in Syria, Mali, Ukraine).",
    agenda2: "Bridging the Global Digital Divide in Education\nFocus: Access to online learning, especially in low-income and rural communities."
  },
  ECOSOC: {
    bgImage1: "ECOSOC.jpg",
    bgImage2: "ECOSOC2.jpg",
    agenda1: "Tackling Global Food Insecurity and Supply Chain Disruptions\nFocus: Post-pandemic recovery, conflict-related shortages, and sustainable agriculture.",
    agenda2: "Strategies for Achieving Universal Access to Clean Water and Sanitation by 2030\nFocus: Sustainable Development Goal 6 (SDG 6) implementation and funding gaps."
  }
};

// Create committee components
const UNHRCComp = createCommitteeComponent(
  "UNHRC",
  committeeData.UNHRC.bgImage1,
  committeeData.UNHRC.bgImage2,
  committeeData.UNHRC.agenda1,
  committeeData.UNHRC.agenda2
);

const UNSCComp = createCommitteeComponent(
  "UNSC",
  committeeData.UNSC.bgImage1,
  committeeData.UNSC.bgImage2,
  committeeData.UNSC.agenda1,
  committeeData.UNSC.agenda2
);

const UNODCComp = createCommitteeComponent(
  "UNODC",
  committeeData.UNODC.bgImage1,
  committeeData.UNODC.bgImage2,
  committeeData.UNODC.agenda1,
  committeeData.UNODC.agenda2
);

const UNESCOComp = createCommitteeComponent(
  "UNESCO",
  committeeData.UNESCO.bgImage1,
  committeeData.UNESCO.bgImage2,
  committeeData.UNESCO.agenda1,
  committeeData.UNESCO.agenda2
);

const ECOSOCComp = createCommitteeComponent(
  "ECOSOC",
  committeeData.ECOSOC.bgImage1,
  committeeData.ECOSOC.bgImage2,
  committeeData.ECOSOC.agenda1,
  committeeData.ECOSOC.agenda2
);

export { UNHRCComp, UNSCComp, UNODCComp, UNESCOComp, ECOSOCComp };
