"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../../context/sessionContext";
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

const Page = () => {
    const { user: currentUser } = useSession();
    const router = useRouter();

    return (
        <ProtectedRoute>
            <CustomNav />
            <div>

            <Parallax pages={2}>
                <ParallaxLayer
                    offset={0}
                    speed={1.5}
                    factor={1.5}
                    style={{ backgroundImage : 'url(/images/ECOSOC.jpg)',
                        backgroundSize : 'cover',
                     }}
                     className="flex items-center justify-center w-full h-full"
                />
                

                <ParallaxLayer
                    offset={0}
                    factor={1}
                    speed={2}
                    className="flex items-center justify-center w-full h-full"
                >
                    <h2 className="text-white text-9xl text-center font-extrabold">ECOSOC</h2>
                </ParallaxLayer>
                <ParallaxLayer
                    offset={1}  
                    speed={0.5}
                    style = {{ backgroundImage : 'url(/images/ECOSOC2.jpg)', backgroundSize : 'cover' }}
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
                            <p> Agenda 1: <br/> Tackling Global Food Insecurity and Supply Chain Disruptions <br/>
Focus: Post-pandemic recovery, conflict-related shortages, and sustainable agriculture.</p>
                        </div>
                        <div>
                            <h1 className="text-9xl p-6"> Agendas </h1>
                        </div>
                        <div>
                            <p> Agenda 2: <br/> Strategies for Achieving Universal Access to Clean Water and Sanitation by 2030 <br/>
Focus: Sustainable Development Goal 6 (SDG 6) implementation and funding gaps.</p>
                        </div>
                    </div>
                    
                </ParallaxLayer>
            </Parallax>
        </div>
        </ProtectedRoute>
    );
};

export default Page;