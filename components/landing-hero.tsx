"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-black font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>A System that</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-600">
          <TypewriterComponent
            options={{
              strings: [
                "Identifies",
                "Tracks",
                "Verifies",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl">your medication.</h1>
      </div>

      <div>
        <div className="text-sm md:text-xl font-light text-zinc-400">
            The Most Advanced Pill
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-400">
        Management System Ever.
        </div>
      </div>

      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
            Take control of your health, today. 
          </Button>
        </Link>
      </div>
    </div>
  );
};