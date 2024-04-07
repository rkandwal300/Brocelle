"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { Separator } from "../../ui/separator";

import { navLinks } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Logo from "@/public/logo.png";

export default function LeftSideBar() {
  const pathname = usePathname();
  const buttonRef = useRef(null);
  return (
    <div className="h-screen overflow-auto left-0 top-0 sticky flex-col flex gap-16 bg-muted shadow-xl items-center max-lg:hidden py-10 ">
      <Image src={Logo} alt="logo" width={150} height={70} />
      <div className="flex flex-col ">
        {navLinks.map((nav, index) => (
          <Link
            key={index}
            href={nav.url}
            className={cn(
              "px-10 cursor-pointer py-6 hover:text-primary flex font-medium items-center gap-4",
              pathname == nav.url ? "text-primary" : ""
            )}
          >
            <nav.icon size={24} />
            <span>{nav.label}</span>
          </Link>
        ))}
      </div>
      <Separator orientation="horizontal" />
      <div className="flex gap-4 items-center font-medium">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
}
