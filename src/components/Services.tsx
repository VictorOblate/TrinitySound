"use client";

import {
  Music,
  Mic,
  Radio,
  Settings,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Volume2,
  Headphones,
  Speaker,
  Triangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Services() {
  const services = [
    {
      icon: Music,
      title: "Wedding Functions",
      description:
        "Complete sound solutions for ceremonies and receptions with wireless microphones and elegant speaker setups.",
      features: [
        "Wireless microphones",
        "Ceremony sound systems",
        "Reception music setup",
        "Professional DJ equipment",
      ],
    },
    {
      icon: Users,
      title: "Corporate Events",
      description:
        "Professional audio for conferences, meetings, and corporate gatherings with crystal-clear sound quality.",
      features: [
        "Conference systems",
        "Presentation audio",
        "Office meeting setups",
        "Live streaming support",
      ],
    },
    {
      icon: Mic,
      title: "Graduations & Ceremonies",
      description:
        "Professional sound systems for graduation ceremonies and formal events with clear speech amplification.",
      features: [
        "Stage monitoring",
        "Multi-channel mixing",
        "Professional microphones",
        "Amplification systems",
      ],
    },
    {
      icon: Radio,
      title: "Event Production",
      description:
        "Full-service event audio production with experienced technicians and premium equipment rental.",
      features: [
        "Technical crew support",
        "Equipment delivery & setup",
        "On-site installation",
        "Event coordination",
      ],
    },
  ];

  const additionalServices = [
    "Baby shower sound systems",
    "House warming party audio",
    "Birthday function equipment",
    "Church service sound solutions",
    "Outdoor event amplification",
    "Indoor venue audio setup",
  ];

  return (
    <section
      id="services"
      className="pt-40 py-20 bg-gray-100 relative overflow-hidden"
    >
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 border-4 border-cyan-400/20 transform rotate-45"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-black/5 transform rotate-12"></div>
        <div className="absolute top-1/2 left-5 opacity-10">
          <Triangle className="w-20 h-20 text-black transform rotate-30" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-black transform rotate-45 flex items-center justify-center">
                  <Volume2 className="w-8 h-8 text-cyan-400 transform -rotate-45" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full"></div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">
              OUR SERVICES
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-black mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Professional audio solutions for every occasion - from intimate
              gatherings to large-scale events, we deliver exceptional sound
              experiences.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border-l-4 border-cyan-400 p-8 shadow-lg hover:shadow-xl 
                           transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className="w-16 h-16 bg-black flex items-center justify-center flex-shrink-0 
                                  group-hover:bg-cyan-400 transition-colors duration-300"
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-black mb-3 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-gray-700"
                        >
                          <div className="w-2 h-2 bg-cyan-400 mr-3 flex-shrink-0 transform rotate-45"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Information */}
          <div className="bg-black text-white p-8 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 transform rotate-45 translate-x-16 -translate-y-16"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-6 tracking-tight">
                PAYMENT OPTIONS
              </h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-400 flex items-center justify-center">
                      <span className="text-black font-black text-sm">EC</span>
                    </div>
                    <div>
                      <div className="text-cyan-400 font-bold">
                        ECOCASH MERCHANT
                      </div>
                      <div className="text-white">0000102135</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-cyan-400 flex items-center justify-center">
                      <span className="text-black font-black text-sm">MP</span>
                    </div>
                    <div>
                      <div className="text-cyan-400 font-bold">
                        MPESA MERCHANT
                      </div>
                      <div className="text-white">45974</div>
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-cyan-400 mb-6">
                    <Settings className="h-12 w-12 text-black" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">
                    FREE SOUND FOR ANNIVERSARIES*
                  </h4>
                  <p className="text-gray-300 mb-6 text-sm">
                    *When you book wedding functions with us
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-white border-2 border-black p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-black text-black mb-6 tracking-tight">
                  ADDITIONAL SERVICES
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {additionalServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center text-gray-700 group"
                    >
                      <div
                        className="w-3 h-3 bg-cyan-400 mr-3 flex-shrink-0 transform rotate-45 
                                      group-hover:rotate-90 transition-transform duration-300"
                      ></div>
                      <span className="group-hover:text-black transition-colors duration-300">
                        {service}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center md:text-right">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-black mb-6 transform rotate-45">
                  <Speaker className="h-16 w-16 text-cyan-400 transform -rotate-45" />
                </div>
                <h4 className="text-xl font-black text-black mb-4 tracking-tight">
                  CUSTOM SOLUTIONS
                </h4>
                <p className="text-gray-600 mb-6">
                  Need something specific? We work with you to create custom
                  audio solutions for your unique event requirements.
                </p>
                <Button
                  className="bg-black hover:bg-cyan-400 text-white hover:text-black 
                                   font-black tracking-tight px-8 py-3 transform hover:scale-105 
                                   transition-all duration-300"
                >
                  DISCUSS YOUR NEEDS
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
