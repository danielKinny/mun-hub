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
                        UNESCO - United Nations Educational, Scientific and Cultural Organization
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
                                The United Nations Educational, Scientific and Cultural Organization (UNESCO) seeks to build peace through international cooperation in education, the sciences, and culture.
                            </p>
                            <p>
                                UNESCO was founded in 1945 in the aftermath of World War II, with the aim of fostering peace and security by promoting collaboration among nations.
                            </p>
                            <p>
                                The organization works to create the conditions for dialogue among civilizations, cultures, and peoples, based on respect for commonly shared values.
                            </p>
                            <p>
                                UNESCO's programs contribute to the achievement of the Sustainable Development Goals defined in Agenda 2030, adopted by the UN General Assembly in 2015.
                            </p>
                            <p>
                                The organization focuses on education, natural sciences, social and human sciences, culture, and communication and information.
                            </p>
                            <p>
                                UNESCO's work is guided by the principles of human dignity, equality, and mutual respect.
                            </p>
                            <p>
                                The organization collaborates with various UN agencies, international organizations, and civil society to achieve its objectives.
                            </p>
                            <p>
                                UNESCO's efforts contribute to the promotion of peace, sustainable development, and intercultural dialogue.
                            </p>
                        </div>
                        <div className="w-1/3 p-4 flex items-center justify-center h-full border-r border-l border-gray-800 text-center">
                            <CountryNav />
                        </div>
                        <div className= "w-1/3 text-3xl p-5 border-l border-gray-800 h-full">
                            <div className="space-y-6">
                                <h1 className="font-extrabold">Agenda Item 1: Education for All</h1>
                                <p>
                                    Promoting inclusive and equitable quality education for all.
                                </p>
                                <p>
                                    Analysis of the current challenges in achieving universal access to quality education.
                                </p>
                                <p>
                                    Deliberate on potential resolutions and actions to promote inclusive and equitable education.
                                </p>
                            </div>
                            <div className="mt-4 space-y-4">
                                <h1 className="font-bold mt-10">Agenda Item 2: Cultural Heritage</h1>
                                <p>
                                    Protecting and preserving cultural heritage.
                                </p>
                                <p>
                                    Examination of the threats to cultural heritage and the importance of its preservation.
                                </p>
                                <p>
                                    Discuss strategies for protecting and preserving cultural heritage globally.
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