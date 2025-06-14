"use client";

import { Volume2, Play, Users, Star, Award, Zap, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-40 relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
                 radial-gradient(circle at 25% 25%, #1e293b 2px, transparent 2px),
                 radial-gradient(circle at 75% 75%, #1e293b 2px, transparent 2px)
               `,
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 opacity-20 
                        transform rotate-45 animate-pulse"
        ></div>
        <div
          className="absolute top-40 right-32 w-24 h-24 bg-white opacity-10 
                        transform rotate-12 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-32 w-40 h-8 bg-gradient-to-r from-cyan-400 to-transparent opacity-15 
                        transform -rotate-12 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 right-20 w-20 h-20 border-2 border-cyan-400 opacity-25 
                        transform rotate-45 animate-spin"
          style={{ animationDelay: "1s", animationDuration: "8s" }}
        ></div>

        {/* Trinity-inspired triangular elements */}
        <div className="absolute top-1/4 left-1/4 opacity-10">
          <div className="relative">
            <Triangle className="w-16 h-16 text-white transform rotate-0" />
            <Triangle className="w-16 h-16 text-cyan-400 absolute top-0 left-0 transform rotate-120" />
            <Triangle className="w-16 h-16 text-white absolute top-0 left-0 transform rotate-240" />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 opacity-10">
          <div className="relative">
            <Triangle className="w-12 h-12 text-cyan-400 transform rotate-60" />
            <Triangle className="w-12 h-12 text-white absolute top-0 left-0 transform rotate-180" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        {/* Trinity Logo-inspired Element */}
        <div className="animate-fade-in-up mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
              {/* Recreating Trinity's geometric logo concept */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-white transform rotate-45 opacity-40"></div>
                <div className="absolute w-12 h-12 border-4 border-cyan-400 transform -rotate-45"></div>
                <div className="absolute w-8 h-8 bg-white rounded-full"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-cyan-400 rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 bg-cyan-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent block">
              TRINITY
            </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent block mt-2">
              SOUND HIRE
            </span>
          </h1>

          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-cyan-400 rounded-full mr-4"></div>
            <Volume2 className="w-8 h-8 text-cyan-400 animate-pulse" />
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-cyan-400 rounded-full ml-4"></div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="animate-slide-in-left">
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            EVENTS & ENTERTAINMENT
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Professional sound equipment rental for graduations, weddings,
            corporate functions & more
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-in-right">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 
                       text-black font-bold px-12 py-6 text-lg rounded-none transform hover:scale-105 
                       transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
            asChild
          >
            <Link href="/contact">
              <Play className="w-5 h-5 mr-2" />
              GET QUOTE
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-black hover:bg-white hover:text-black 
                       px-12 py-6 text-lg font-bold rounded-none transform hover:scale-105 
                       transition-all duration-300"
            asChild
          >
            <Link href="/services">
              <Zap className="w-5 h-5 mr-2" />
              OUR SERVICES
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
