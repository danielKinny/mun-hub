"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Committee } from "@/db/types";

const committees: Committee[] = [
  {
    committeeID: "0001",
    name: "UNHRC",
    href: "/committee-overview/UNHRC",
  },
  {
    committeeID: "0002",
    name: "UNESCO",
    href: "/committee-overview/UNESCO",
  },
  {
    committeeID: "0003",
    name: "UNSC",
    href: "/committee-overview/UNSC",
  },
  {
    committeeID: "0004",
    name: "UNODC",
    href: "/committee-overview/UNODC",
  },
  {
    committeeID: "0005",
    name: "ECOSOC",
    href: "/committee-overview/ECOSOC",
  },
];
const CustomNavComponent = () => {
  return (
    <NavigationMenu
      className="w-full p-2 text-white border-b-1 border-gray-700"
      viewport={false}
    >
      <NavigationMenuList className="w-full flex justify-center gap-4">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl">Home</NavigationMenuTrigger>
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
              <NavigationMenuLink
                key={committee.committeeID}
                href={committee.href}
              >
                {committee.name}
              </NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl">MUN Glossary</NavigationMenuTrigger>
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
