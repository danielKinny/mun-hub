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

import {
  HomeModernIcon,
  DocumentIcon,
  GlobeAltIcon,
  NewspaperIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
const committees: Committee[] = [
  {
    committeeID: "0001",
    name: "UNSC",
    href: "/committee-overview/UNSC",
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
          <NavigationMenuTrigger className="text-xl">
            {" "}
            <HomeModernIcon className="w-6 h-6 mr-2" />
            Home
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[200px]">
            <NavigationMenuLink href="/home">Your Dashboard</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl">
            <DocumentIcon className="w-6 h-6 mr-2" />
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
            <GlobeAltIcon className="w-6 h-6 mr-2" />
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
          <NavigationMenuTrigger className="text-xl">
            {" "}
            <BookOpenIcon className="w-6 h-6 mr-2" />
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
            {" "}
            <NewspaperIcon className="w-6 h-6 mr-2" /> Global Affairs
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[200px]">
            <NavigationMenuLink href="/global-affairs">
              Latest News
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const CustomNav = React.memo(CustomNavComponent);
