"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        {/* <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-600"></div> */}
        <h1 className={cn("text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-600", font.className)}>
          myPillBox
        </h1>
      </Link>
      <div className="flex items-center gap-x-2 bg-white rounded-full">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium2" className="rounded-full bg-white">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  )
}