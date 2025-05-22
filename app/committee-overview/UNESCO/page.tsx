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
                    style={{ backgroundImage : 'url(/images/UNESCO.jpg)',
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
                    <h2 className="text-white text-9xl text-center font-extrabold">UNESCO</h2>
                </ParallaxLayer>
                <ParallaxLayer
                    offset={1}  
                    speed={0.5}
                    style = {{ backgroundImage : 'url(/images/UNESCO2.jpg)', backgroundSize : 'cover' }}
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
                            <p> Agenda 1: <br/> Safeguarding Cultural Heritage in Conflict Zones <br/>
Focus: Deliberate destruction of historical sites (e.g., in Syria, Mali, Ukraine).</p>
                        </div>
                        <div>
                            <h1 className="text-9xl p-6"> Agendas </h1>
                        </div>
                        <div>
                            <p> Agenda 2: <br/> Bridging the Global Digital Divide in Education <br/>
Focus: Access to online learning, especially in low-income and rural communities.</p>
                        </div>
                    </div>
                    
                </ParallaxLayer>
            </Parallax>
        </div>
        </ProtectedRoute>
    );
};

export default Page;