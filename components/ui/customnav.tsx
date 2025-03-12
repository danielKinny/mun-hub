"use client";
import React from "react";
import Link from "next/link";
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

export function CustomNav() {
    return (
        <NavigationMenu className="w-full" viewport={false}>
                <NavigationMenuList className="w-full flex justify-center gap-4">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger><Link href="/home">Home</Link></NavigationMenuTrigger>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Speech Repo</NavigationMenuTrigger>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Committee Overview</NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[200px]">
                            <NavigationMenuLink href="/committee-overview/UNODC">
                                UNODC
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/committee-overview/UNSC">
                                UNSC
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/committee-overview/UNHRC">
                                UNHRC
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/committee-overview/UNESCO">
                                UNESCO
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/committee-overview/ECOSOC">
                                ECOSOC
                            </NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>MUN Glossary</NavigationMenuTrigger>
                    </NavigationMenuItem>
                    
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Global Affairs</NavigationMenuTrigger>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
    );
}
    