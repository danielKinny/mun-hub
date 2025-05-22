"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../context/sessionContext";
import { CustomNav } from "@/components/ui/customnav";
import ProtectedRoute from "@/components/protectedroute";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import ResosComp from "@/components/ui/resos";
import MotionsComp from "@/components/ui/motions";
import PointsComp from "@/components/ui/points";

interface jargons {
    name: string;
    description: string;
}



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

                <PointsComp />
                <MotionsComp />
                <ResosComp />

            </Parallax>
        </ProtectedRoute>
    );
};

export default Page;