"use client";
import React from "react";
import Link from "next/link";
import { committees, countries } from "@/app/db/index";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu";

import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

export function CustomNav() {
    return (
        <NavigationMenu className="w-full" viewport={false}>
                <NavigationMenuList className="w-full flex justify-center gap-4">
                    
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-xl"><Link href="/home">Home</Link></NavigationMenuTrigger>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-xl">Speech Repo</NavigationMenuTrigger>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-xl">Committee Overview</NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[200px]">
                            {committees.map((committee) => (
                                <NavigationMenuLink key={committee.name} href={committee.href}>
                                    {committee.name}
                                </NavigationMenuLink>
                            ))}
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-xl">MUN Glossary</NavigationMenuTrigger>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-xl">Global Affairs</NavigationMenuTrigger>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
    );
}

export function CountryNav() {
    return (

        <div>
           <Card className="bg-black w-full text-white">
            <CardHeader className="text-3xl text-center border-b border-gray-800 pb-4">
                Delegations in this committee:
            </CardHeader>
            <CardContent>
                <ul>
                    {countries.map((country) => (
                        <li key={country.name} className="text-center p-2 text-2xl">
                            <Link href={country.href}>{country.name} {country.flag}</Link>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card> 
        </div>
        
    );
}
    