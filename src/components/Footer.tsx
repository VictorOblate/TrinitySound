"use client";

import Image from "next/image";
import {
  Volume2,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Triangle,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Wedding Functions",
    "Corporate Events",
    "Graduations",
    "Birthday Functions",
    "Baby Showers",
    "Church Services",
  ];

  const contactDetails = [
    { type: "Phone", value: "+266 63812221" },
    { type: "Phone", value: "+266 62545522" },
    { type: "Phone", value: "28920432" },
    { type: "Email", value: "TrinitySound@gmail.com" },
  ];

  const paymentMethods = [
    { name: "ECOCASH MERCHANT", code: "0000102135" },
    { name: "MPESA MERCHANT", code: "45974" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden ">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-32 h-32 border-2 border-cyan-400/10 transform rotate-45"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/5 transform rotate-12"></div>
        <div className="absolute top-1/3 left-1/4 opacity-5">
          <Triangle className="w-40 h-40 text-white transform rotate-30" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 opacity-5">
          <Triangle className="w-28 h-28 text-cyan-400 transform rotate-60" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10 border-t-2 border-gray-800">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20">
                {" "}
                {/* 80px */}
                <Image
                  src="/logo-trinity.jpg"
                  alt="Trinity Events & Entertainment Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-black text-2xl text-white tracking-tight">
                  {" "}
                  {/* Slightly larger text too */}
                  TRINITY
                </div>
                <div className="text-sm text-cyan-400 font-bold tracking-wider">
                  {" "}
                  {/* Larger subtitle */}
                  EVENTS & ENTERTAINMENT
                </div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Professional sound equipment rental for graduations, weddings,
              corporate functions, birthday parties, and special occasions.
              Delivering exceptional audio experiences across Lesotho.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 flex items-center justify-center 
                                    hover:bg-cyan-400 hover:text-black transition-all duration-300 
                                    transform hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 flex items-center justify-center 
                                    hover:bg-cyan-400 hover:text-black transition-all duration-300 
                                    transform hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 flex items-center justify-center 
                                    hover:bg-cyan-400 hover:text-black transition-all duration-300 
                                    transform hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-lg mb-6 tracking-tight text-cyan-400">
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 
                               font-medium flex items-center group"
                  >
                    <div
                      className="w-2 h-2 bg-gray-600 mr-3 transform rotate-45 
                                    group-hover:bg-cyan-400 transition-colors duration-300"
                    ></div>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-black text-lg mb-6 tracking-tight text-cyan-400">
              OUR SERVICES
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-gray-400 font-medium flex items-center group"
                >
                  <div
                    className="w-2 h-2 bg-gray-600 mr-3 transform rotate-45 
                                  group-hover:bg-cyan-400 transition-colors duration-300"
                  ></div>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-black text-lg mb-6 tracking-tight text-cyan-400">
              CONTACT INFO
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-white font-bold text-sm">
                    PHONE LINES
                  </span>
                </div>
                <div className="space-y-1 ml-6">
                  <div className="text-gray-400 text-sm">+266 63812221</div>
                  <div className="text-gray-400 text-sm">+266 62545522</div>
                  <div className="text-gray-400 text-sm">28920432</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <a
                  href="mailto:TrinitySound@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  TrinitySound@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Maseru, Lesotho</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mt-6 p-4 bg-gray-900 border border-gray-800">
              <h4 className="font-black text-sm mb-3 text-cyan-400">
                PAYMENT OPTIONS
              </h4>
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-cyan-400 flex items-center justify-center">
                    <span className="text-black font-black text-xs">
                      {method.name.split(" ")[0].substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs">
                      {method.name}
                    </div>
                    <div className="text-gray-400 text-xs">{method.code}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-medium">
            © {currentYear} Trinity Events & Entertainment. All rights
            reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors font-medium"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors font-medium"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
