"use client";
import React from "react";
import { committees } from "@/db/index";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function CustomNav() {
  return (
    <NavigationMenu className="w-full text-white" viewport={false}>
      <NavigationMenuList className="w-full flex justify-center gap-4">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl">
            Home
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[200px]">
            <NavigationMenuLink href="/home">Your Dashboard</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl">
            Speech Repo
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[200px]">
            <NavigationMenuLink href="/speechrepo">
              Access and store speeches
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl">
            Committee Overview
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[200px]">
            {committees.map((committee) => (
              <NavigationMenuLink key={committee.name} href={committee.href}>
                {committee.name}
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl">
            MUN Glossary
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[200px]">
            <NavigationMenuLink href="/glossary">
              Access the glossary
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl">
            Global Affairs
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}