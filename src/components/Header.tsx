"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Volume2, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "SERVICES", href: "/services" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "EVENTS", href: "/events" },
    { name: "CONTACT", href: "/contact" },
  ];

  const isActivePage = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main header background */}
      <div className="bg-black/95 backdrop-blur-md transition-all duration-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 transition-all duration-300 group-hover:scale-110">
                <Image
                  src="/logo-trinity.png"
                  alt="Trinity Events & Entertainment Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white transition-all duration-300 group-hover:text-cyan-400">
                  TRINITY
                </span>
                <span className="text-xs text-cyan-400 font-bold tracking-wider">
                  EVENTS & ENTERTAINMENT
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-all duration-300 font-bold text-sm tracking-wide px-3 py-2 relative group ${
                    isActivePage(item.href)
                      ? "text-cyan-400"
                      : "text-white hover:text-cyan-400"
                  }`}
                >
                  {item.name}
                  {/* Geometric underline */}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform origin-center transition-all duration-300 ${
                      isActivePage(item.href)
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }`}
                  ></div>
                  {/* Glowing effect for active page */}
                  {isActivePage(item.href) && (
                    <div className="absolute inset-0 bg-cyan-400/10 blur-sm rounded-sm animate-pulse"></div>
                  )}
                </Link>
              ))}
              <Button
                asChild
                className="bg-cyan-400 hover:bg-white text-black hover:text-black 
                           font-black tracking-tight transform hover:scale-105 transition-all duration-300 
                           border-2 border-cyan-400 hover:border-black shadow-lg hover:shadow-cyan-400/25
                           relative overflow-hidden group"
              >
                <Link href="/contact">
                  <span className="relative z-10">GET QUOTE</span>
                  {/* Animated background effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-white to-cyan-400 
                                  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  ></div>
                </Link>
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white hover:text-cyan-400 transition-all duration-300 
                         transform hover:scale-110 relative group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X className="h-6 w-6 transition-all duration-300 rotate-90" />
                ) : (
                  <Menu className="h-6 w-6 transition-all duration-300" />
                )}
                {/* Glowing background for mobile button */}
                <div
                  className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full scale-0 
                                group-hover:scale-150 transition-all duration-300"
                ></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Beautiful pulsing line that fades at ends */}
      <div className="relative h-0.5 bg-black">
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent 
                        animate-pulse opacity-80"
        ></div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent 
                        animate-pulse opacity-30"
          style={{ animationDelay: "0.5s" }}
        ></div>
        {/* Moving light effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute h-full w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent 
                          animate-pulse transform -translate-x-full"
            style={{
              animation: "slideAcross 4s ease-in-out infinite",
              animationDelay: "1s",
            }}
          ></div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden relative z-40">
          <div className="bg-black/95 backdrop-blur-md border-t border-cyan-400/30 shadow-2xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 transition-all duration-300 font-bold text-sm tracking-wide 
                             rounded-none border-l-4 relative group transform hover:translate-x-2 ${
                               isActivePage(item.href)
                                 ? "text-cyan-400 bg-cyan-400/10 border-cyan-400"
                                 : "text-white hover:text-cyan-400 hover:bg-white/5 border-transparent hover:border-cyan-400"
                             }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Animated background for mobile items */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent 
                                  scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  ></div>
                </Link>
              ))}
              <div className="px-4 pt-4">
                <Button
                  asChild
                  className="w-full bg-cyan-400 hover:bg-white text-black hover:text-black 
                             font-black tracking-tight transform hover:scale-105 transition-all duration-300
                             border-2 border-cyan-400 hover:border-black relative overflow-hidden group"
                >
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                    <span className="relative z-10">GET QUOTE</span>
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-white via-cyan-400 to-white 
                                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                    ></div>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideAcross {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100%));
            opacity: 0;
          }
        }
      `}</style>
    </header>
  );
}