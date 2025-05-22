"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../context/sessionContext";
import { CustomNav, CountryNav } from "@/components/ui/customnav";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import ProtectedRoute from "@/components/protectedroute";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

interface jargons {
    name: string;
    description: string;
}

const resos: jargons[] = [
    {
        name: "Resolution",
        description: "A resolution is a formal document that outlines the committee's stance on a specific issue. It includes the committee's recommendations and proposed actions.",
    },
    {
        name: "Position Paper",
        description: "A position paper is a document that outlines a delegate's stance on a specific issue. It is used to inform other delegates of the delegate's position and to support their arguments during the debate.",
    },
    {
        name: "Amendment",
        description: "An amendment is a proposed change to a resolution or working paper. It is used to modify the content of the document to better reflect the committee's consensus.",
    },
    {
        name: "Co-Sponsor",
        description: "A co-sponsor is a delegate who supports a resolution or working paper and is willing to sign it. Co-sponsors are often involved in the drafting process and help to gather support for the document.",
    },
    {
        name: "Signatory",
        description: "A signatory is a delegate who supports a resolution or working paper but is not necessarily involved in the drafting process. Signatories are often used to demonstrate support for a document before it is formally introduced.",
    },
    {
        name: "Preamble",
        description: "A preamble is the introductory section of a resolution or working paper. It provides background information and context for the issue being addressed.",
    },
    {
        name: "Operative Clause",
        description: "An operative clause is a specific action or recommendation included in a resolution. It outlines the committee's proposed actions and recommendations for addressing the issue.",
    },
    {
        name: "Friendly Amendment",
        description: "A friendly amendment is a proposed change to a resolution or working paper that is accepted by the original sponsors. It is used to modify the document without requiring a formal vote.",
    },
    {
        name: "Unfriendly Amendment",
        description: "An unfriendly amendment is a proposed change to a resolution or working paper that is not accepted by the original sponsors. It requires a formal vote to be adopted.",
    }
];

const motions: jargons[] = [
    {
        name: "Motion to Open Committee Session",
        description: "A motion to open the floor is a request made by a delegate to allow other delegates to speak or ask questions. It is typically used at the beginning of a session or after a speech.",
    },
    {
        name: "Motion to Open the General Speakers List",
        description: "A motion to open the general speakers list is a request made by a delegate to allow other delegates to sign up to speak on a specific topic. It is used to facilitate discussion and debate.",
    },
    {
        name: "Motion to Suspend Committee Session",
        description: "A motion to suspend the debate is a request made by a delegate to temporarily halt the proceedings. It is often used to take a break or allow for informal discussions.",
    },
    {
        name: "Motion to Divide the House",
        description: "A motion to divide the house is a request made by a delegate to call for a vote on a specific issue or resolution. It is used to determine the opinion of the committee on a particular matter.",
    },
    {
        name:"Motion to Introduce a Un/Moderated Caucus",
        description: "A motion to introduce a un/moderated caucus is a request made by a delegate to allow for informal discussions and debates among delegates. It is used to encourage collaboration and brainstorming.",
    }
]
const points: jargons[] = [
    {
        name: "Point of Information",
        description: "A point of information is a request for information from the speaker. It is used to ask a question or seek clarification on a specific point made during the speech.",
    },
    {
        name: "Point of Inquiry",
        description: "A point of inquiry is a request for clarification or further explanation on a specific topic or issue. It is used to seek more information about the subject matter being discussed.",
    },
    {
        name: "Point of Personal Privilege",
        description: "A point of personal privilege is a request made by a delegate to address a personal matter that affects their ability to participate in the debate. It is often used to raise concerns about noise, distractions, or other issues.",
    },
    {
        name: "Point of Order",
        description: "A point of order is a request made by a delegate to call attention to a violation of the rules or procedures of the committee. It is used to ensure that the debate follows the established guidelines.",
    }

];


const Page = () => {
    const { user: currentUser } = useSession();
    const router = useRouter();
    const parallaxRef = useRef<any>(null);
    const [point, setPoint] = React.useState<jargons|null>(null);
    const [motion, setMotion] = React.useState<jargons|null>(null);
    const [reso, setReso] = React.useState<jargons|null>(null);

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
                    style={{ backgroundImage: 'url(/images/UN.jpg)',
                        backgroundSize: 'cover',
                    }}/>
                <ParallaxLayer
                    offset={0}
                    speed={1.5}
                    className="flex items-center justify-center w-full h-full">
                    <div className="bg-black p-2 mr-10">
                        <h1 className="text-white text-9xl text-center font-extrabold">
                            GLOSSARY
                        </h1>
                    </div>
                    <div className="space-y-2 p-2 w-[200px] ">
                        <h1
                            className="text-white text-3xl text-center font-extrabold bg-black cursor-pointer"
                            onClick={() => handleScrollTo(1)}
                        > POINTS </h1>
                        <h1
                            className="text-white text-3xl text-center font-extrabold bg-black cursor-pointer"
                            onClick={() => handleScrollTo(2)}
                        > MOTIONS </h1>
                        <h1
                            className="text-white text-3xl text-center font-extrabold bg-black cursor-pointer"
                            onClick={() => handleScrollTo(3)}
                        > RESOLUTIONS </h1>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer
                    offset={1}
                    speed={0.5}
                    style={{ backgroundImage: 'url(/images/UN7.jpg)',
                        backgroundSize: 'cover',
                    }}/>
                <ParallaxLayer
                    offset={1}
                    speed={0.9}
                    className="flex items-center justify-center w-full h-full">
                    <div className="flex flex-row items-center justify-center h-full w-full gap-2">
                        <div className="flex flex-col items-center justify-center h-full space-y-2">
                            {points.map((point, index) => (
                                <button key={index} className="bg-black text-white cursor-pointer p-2 text-2xl" onClick={() => setPoint(point)}>
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
                                {point ? point.description : <span className="opacity-50">Select a point to see its description</span>}
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer
                    offset={2}
                    speed={1.2}
                    style={{ backgroundImage: 'url(/images/UN6.jpg)',
                        backgroundSize: 'cover',
                    }}/>
                <ParallaxLayer
                    offset={2}
                    speed={0.9}
                    className="flex items-center justify-center w-full h-full">
                    <div className="flex flex-row items-center justify-center h-full w-full gap-2">
                        <div className="flex flex-col items-center justify-center h-full space-y-2">
                            {motions.map((motion, index) => (
                                <button key={index} className="bg-black text-white cursor-pointer p-2 text-2xl" onClick={() => setMotion(motion)}>
                                    {motion.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col items-center justify-center h-full mx-2">
                            <div className="bg-black p-2 mb-2">
                                <h1 className="text-white text-9xl text-center font-extrabold">
                                    MOTIONS
                                </h1>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center h-full ml-2">
                            <div className="text-xl text-white bg-black p-3 min-h-[100px] w-[320px] rounded transition-all duration-300 flex items-center justify-center">
                                {motion ? motion.description : <span className="opacity-50">Select a motion to see its description</span>}
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>
                <ParallaxLayer
                    offset={3}
                    speed={0.5}
                    style={{ backgroundImage: 'url(/images/UN5.jpg)',
                        backgroundSize: 'cover',
                    }}/>
                <ParallaxLayer
                    offset={3}
                    speed={0.9}
                    className="flex items-center justify-center w-full h-full">
                    <div className="flex flex-row items-center justify-center h-full w-full gap-2">
                        <div className="flex flex-col items-center justify-center h-full space-y-2">
                            {resos.map((reso, index) => (
                                <button key={index} className="bg-black text-white cursor-pointer p-2 text-2xl" onClick={() => setReso(reso)}>
                                    {reso.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col items-center justify-center h-full mx-2">
                            <div className="bg-black p-2 mb-2">
                                <h1 className="text-white text-9xl text-center font-extrabold">
                                    RESOLUTIONS
                                </h1>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center h-full ml-2">
                            <div className="text-xl text-white bg-black p-3 min-h-[100px] w-[320px] rounded transition-all duration-300 flex items-center justify-center">
                                {reso ? reso.description : <span className="opacity-50">Select a resolution term to see its description</span>}
                            </div>
                        </div>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </ProtectedRoute>
    );
};

export default Page;