"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "@/public/logo.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { navLinks } from "@/lib/constant";
import { Menu } from "lucide-react";
import { Button } from "../../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 gap-8 shadow-xl bg-muted py-4 lg:hidden">
      <Image src={Logo} alt="logo" width={100} height={50} />
      <div className="flex text-sm gap-4 text-gray-500 max-md:hidden">
        {navLinks.map((nav, index) => (
          <Link
            key={index}
            href={nav.url}
            className={cn(
              "cursor-pointer gap-1.5 flex font-medium ",
              pathname == nav.url ? "text-primary" : ""
            )}
          >
            <span>{nav.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 items-center font-medium">
        <Popover>
          <PopoverTrigger>
            <Menu className="cursor-pointer md:hidden" />
          </PopoverTrigger>
          <PopoverContent side="bottom" className="p-0 w-52 md:hidden">
            <div className="flex gap-2 flex-col ">
              {navLinks.map((nav, index) => (
                <Button
                  key={index}
                  variant={"ghost"}
                  onClick={() => router.push(nav.url)}
                  className={cn(
                    "flex justify-start px-4 hover:text-primary gap-2",
                    pathname == nav.url ? "text-primary" : ""
                  )}
                >
                  <nav.icon size={18} />
                  <span>{nav.label}</span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <UserButton />
      </div>
    </div>
  );
}
