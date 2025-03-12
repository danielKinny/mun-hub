"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/usercontext";
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
    const { currentUser } = useUser();
    const router = useRouter();

    return (
        <div className="min-h-screen items-center justify-center bg-black text-white">
            <header className="text-center border-b border-gray-800">
                <h1 className="p-4 text-4xl font-extrabold">
                    Committee Overview
                </h1>
                <h4 className="p-2 text-xl font-light">
                    UNSC - United Nations Security Council
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
                            The United Nations Security Council (UNSC) is one of the principal
                            organs of the United Nations and is charged with the maintenance of
                            international peace and security.
                        </p>
                        <p>
                            The Security Council consists of fifteen members, including five
                            permanent members—China, France, Russia, the United Kingdom, and the
                            United States—and ten non-permanent members elected for two-year terms.
                        </p>
                        <p>
                            The Council's powers include the establishment of peacekeeping
                            operations, the authorization of military action, and the imposition of
                            sanctions.
                        </p>
                        <p>
                            It is the only UN body with the authority to issue binding resolutions
                            on member states.
                        </p>
                        <p>
                            The UNSC was established in 1945 following the conclusion of World War II,
                            with the aim of preventing future conflicts. The five permanent members
                            were granted veto power, allowing them to block any substantive resolution.
                        </p>
                        <p>
                            The UNSC meets as needed to address threats to international peace and
                            security. It can convene at any time, and its decisions are binding on all
                            UN member states.
                        </p>
                        <p>
                            The Council also works to promote human rights, disarmament, and the
                            peaceful resolution of disputes. It collaborates with various UN agencies
                            and international organizations to achieve its objectives.
                        </p>
                        <p>
                            Over the years, the UNSC has played a crucial role in addressing conflicts
                            and crises around the world, including in regions such as the Middle East,
                            Africa, and the Balkans.
                        </p>
                    </div>
                    <div className="w-1/3 p-4 flex items-center justify-center h-full border-r border-l border-gray-800 text-center">
                        <CountryNav />
                    </div>
                    <div className= "w-1/3 text-3xl p-5 border-l border-gray-800 h-full">
                        <div className="space-y-6">
                                <h1 className="font-extrabold">Agenda 1: Russo-Ukraine War
                            </h1>
                            <p>
                                Analysis of the current situation in Ukraine concerning the conflict,
                                including its impact on regional stability and humanitarian concerns.
                            </p>
                            <p>
                                Deliberate on potential resolutions and actions to address the crisis and
                                ensure the safety and security of the Ukrainian people.
                            </p>
                        </div>
                        <div className="mt-4 space-y-4">
                            <h1 className="font-bold mt-10">Agenda 2: Israel and Palestine</h1>
                            <p>
                                The Question of Palestine, including recent escalations, humanitarian
                                impact, and long-term implications for regional stability and international
                                law.
                            </p><p>
                                Examination of the challenges and recent escalations in Israel and Palestine
                                and its implications for global security.
                            </p>
                            <p>
                                Discuss strategies for de-escalation, peaceful resolution, and the
                                implementation of existing resolutions.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Page;