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
                    ECOSOC - Economic and Social Council
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
                            The Economic and Social Council (ECOSOC) is one of the six principal organs of the United Nations, responsible for coordinating the economic, social, and related work of 15 UN specialized agencies, their functional commissions, and five regional commissions.
                        </p>
                        <p>
                            ECOSOC was established by the UN Charter in 1945.
                        </p>
                        <p>
                            The Council serves as the central forum for discussing international economic and social issues and formulating policy recommendations addressed to Member States and the United Nations system.
                        </p>
                        <p>
                            ECOSOC's work is guided by the principles of sustainable development, inclusivity, and international cooperation.
                        </p>
                        <p>
                            The Council collaborates with various UN agencies, international organizations, and civil society to achieve its objectives.
                        </p>
                        <p>
                            ECOSOC's efforts contribute to the achievement of the Sustainable Development Goals, particularly Goal 1 on no poverty, Goal 2 on zero hunger, and Goal 8 on decent work and economic growth.
                        </p>
                        <p>
                            The Council also works to promote gender equality, education, and health.
                        </p>
                        <p>
                            ECOSOC's work is essential for addressing global challenges such as climate change, inequality, and economic instability.
                        </p>
                    </div>
                    <div className="w-1/3 p-4 flex items-center justify-center h-full border-r border-l border-gray-800 text-center">
                        <CountryNav />
                    </div>
                    <div className= "w-1/3 text-3xl p-5 border-l border-gray-800 h-full">
                        <div className="space-y-6">
                            <h1 className="font-extrabold">Agenda Item 1: Sustainable Development</h1>
                            <p>
                                Promoting sustainable development and addressing climate change.
                            </p>
                            <p>
                                Analysis of the current challenges to sustainable development and the impact of climate change.
                            </p>
                            <p>
                                Deliberate on potential resolutions and actions to promote sustainable development and mitigate climate change.
                            </p>
                        </div>
                        <div className="mt-4 space-y-4">
                            <h1 className="font-bold mt-10">Agenda Item 2: Economic Inequality</h1>
                            <p>
                                Addressing economic inequality and promoting inclusive growth.
                            </p>
                            <p>
                                Examination of the causes and consequences of economic inequality and its impact on society.
                            </p>
                            <p>
                                Discuss strategies for reducing economic inequality and promoting inclusive growth.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Page;