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

const Page = () => {
    const { user: currentUser } = useSession();
    const router = useRouter();

    return (
        <div className="min-h-screen items-center justify-center bg-black text-white">
            <header className="text-center border-b border-gray-800">
                <h1 className="p-4 text-4xl font-extrabold">
                    Committee Overview
                </h1>
                <h4 className="p-2 text-xl font-light">
                    UNODC - United Nations Office on Drugs and Crime
                </h4>
            </header>

            <main>
                <section className="w-full mb-8 block border-b border-gray-800">
                    <CustomNav />
                </section>
                <section className="flex items-start justify-center">
                    <div className="max-w-1/3 p-5 text-3xl space-y-6 border-r border-gray-800">
                        <h1 className="text-4xl font-extrabold border-b-1 border-gray-800">
                            Committee Overview
                        </h1>
                        <p>
                            The United Nations Office on Drugs and Crime (UNODC) is a global leader in the fight against illicit drugs and international crime.
                        </p>
                        <p>
                            Established in 1997, UNODC operates in all regions of the world through an extensive network of field offices.
                        </p>
                        <p>
                            The office assists Member States in their struggle against illicit drugs, crime, and terrorism.
                        </p>
                        <p>
                            UNODC is mandated to assist Member States in their efforts to counteract human trafficking, corruption, and drug trafficking.
                        </p>
                        <p>
                            The office also works to improve crime prevention and criminal justice reform.
                        </p>
                        <p>
                            UNODC's work is guided by international conventions and protocols, including the United Nations Convention against Transnational Organized Crime and the United Nations Convention against Corruption.
                        </p>
                        <p>
                            The office collaborates with various UN agencies, international organizations, and civil society to achieve its objectives.
                        </p>
                        <p>
                            UNODC's efforts contribute to the achievement of the Sustainable Development Goals, particularly Goal 16 on peace, justice, and strong institutions.
                        </p>
                    </div>
                    <div className="w-1/3 p-4 flex items-center justify-center h-full border-r border-l border-gray-800 text-center">
                        <CountryNav />
                    </div>
                    <div className= "w-1/3 text-3xl p-5 border-l border-gray-800 h-full">
                        <div className="space-y-6">
                            <h1 className="font-extrabold">Agenda Item 1: Drug Trafficking</h1>
                            <p>
                                Addressing the global issue of drug trafficking and its impact on society.
                            </p>
                            <p>
                                Analysis of the current trends in drug trafficking and its effects on public health and safety.
                            </p>
                            <p>
                                Deliberate on potential resolutions and actions to combat drug trafficking and support affected communities.
                            </p>
                        </div>
                        <div className="mt-4 space-y-4">
                            <h1 className="font-bold mt-10">Agenda Item 2: Human Trafficking</h1>
                            <p>
                                Combating human trafficking and protecting victims.
                            </p>
                            <p>
                                Examination of the challenges in addressing human trafficking and providing support to victims.
                            </p>
                            <p>
                                Discuss strategies for prevention, protection, and prosecution related to human trafficking.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Page;