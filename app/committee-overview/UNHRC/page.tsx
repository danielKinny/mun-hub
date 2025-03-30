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

const Page = () => {
    const { user: currentUser } = useSession();
    const router = useRouter();

    return (
        <ProtectedRoute>
            <div className="min-h-screen items-center justify-center bg-black text-white">
                <header className="text-center border-b border-gray-800">
                    <h1 className="p-4 text-4xl font-extrabold">
                        Committee Overview
                    </h1>
                    <h4 className="p-2 text-xl font-light">
                        UNHRC - United Nations Human Rights Council
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
                                The United Nations Human Rights Council (UNHRC) is an inter-governmental body within the United Nations system responsible for strengthening the promotion and protection of human rights around the globe.
                            </p>
                            <p>
                                The UNHRC was established in 2006, replacing the former United Nations Commission on Human Rights.
                            </p>
                            <p>
                                The Council is made up of 47 Member States, which are elected by the UN General Assembly.
                            </p>
                            <p>
                                The UNHRC addresses human rights violations and makes recommendations on them.
                            </p>
                            <p>
                                The Council also works to promote the full implementation of human rights obligations undertaken by states.
                            </p>
                            <p>
                                The UNHRC's work is guided by the principles of universality, impartiality, objectivity, and non-selectivity.
                            </p>
                            <p>
                                The Council collaborates with various UN agencies, international organizations, and civil society to achieve its objectives.
                            </p>
                            <p>
                                The UNHRC's efforts contribute to the achievement of the Sustainable Development Goals, particularly Goal 16 on peace, justice, and strong institutions.
                            </p>
                        </div>
                        <div className="w-1/3 p-4 flex items-center justify-center h-full border-r border-l border-gray-800 text-center">
                            <CountryNav />
                        </div>
                        <div className= "w-1/3 text-3xl p-5 border-l border-gray-800 h-full">
                            <div className="space-y-6">
                                <h1 className="font-extrabold">Agenda Item 1: Freedom of Expression</h1>
                                <p>
                                    Promoting and protecting the right to freedom of expression.
                                </p>
                                <p>
                                    Analysis of the current challenges to freedom of expression and its impact on society.
                                </p>
                                <p>
                                    Deliberate on potential resolutions and actions to safeguard freedom of expression globally.
                                </p>
                            </div>
                            <div className="mt-4 space-y-4">
                                <h1 className="font-bold mt-10">Agenda Item 2: Human Rights Violations</h1>
                                <p>
                                    Addressing human rights violations in conflict zones.
                                </p>
                                <p>
                                    Examination of the human rights violations occurring in conflict zones and their impact on civilians.
                                </p>
                                <p>
                                    Discuss strategies for prevention, protection, and accountability related to human rights violations.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default Page;