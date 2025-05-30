"use client";
import React, { useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Committee } from "@/db/types";

const CustomNavComponent = () => {
  const [committees, setCommittees] = React.useState<Committee[]>([]);

  useEffect(() => {
    const fetchCommittees = async () => {
      const res = await fetch("/api/committees");
      if (res.ok) {
        const data = await res.json();
        setCommittees(
          data.map((committee: Committee) => ({
            committeeID: committee.committeeID,
            name: committee.name,
            href: committee.href,
          }))
        );
      }
    };
    fetchCommittees();
  }, []);

  return (
    <NavigationMenu className="w-full p-2 text-white border-b-1 border-gray-700" viewport={false}>
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
              <NavigationMenuLink key={committee.committeeID} href={committee.href}>
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
};

export const CustomNav = React.memo(CustomNavComponent);
