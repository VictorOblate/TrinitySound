"use client";

import {
  Users,
  Award,
  Clock,
  Headphones,
  Volume2,
  Triangle,
  Music,
  GraduationCap,
  Building2,
  Baby,
  Home,
  Disc3,
  Heart,
  Briefcase,
  PartyPopper,
  TreePine,
  Church,
  Phone,
  Mail,
} from "lucide-react";

export default function About() {
  const stats = [
    { icon: Users, label: "Events Completed", value: "500+" },
    { icon: Award, label: "Years Experience", value: "10+" },
    { icon: Clock, label: "Hours of Coverage", value: "5,000+" },
    { icon: Headphones, label: "Happy Clients", value: "300+" },
  ];

  const specialties = [
    {
      title: "GRADUATIONS",
      description:
        "Professional ceremony sound systems with wireless microphones for clear speech amplification",
      icon: GraduationCap,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverColor: "hover:bg-blue-200",
    },
    {
      title: "OFFICE MEETINGS",
      description:
        "Corporate audio solutions for presentations, conferences and business meetings",
      icon: Building2,
      bgColor: "bg-slate-100",
      iconColor: "text-slate-600",
      hoverColor: "hover:bg-slate-200",
    },
    {
      title: "BABY SHOWERS",
      description:
        "Intimate celebration sound setups with background music and announcement systems",
      icon: Baby,
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      hoverColor: "hover:bg-pink-200",
    },
    {
      title: "HOUSE WARMING",
      description:
        "New home celebration audio equipment with party music and entertainment setup",
      icon: Home,
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      hoverColor: "hover:bg-orange-200",
    },
    {
      title: "DJ SERVICE HIRE",
      description:
        "Professional DJ equipment rental with mixing boards, turntables and party lighting",
      icon: Disc3,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverColor: "hover:bg-purple-200",
    },
    {
      title: "WEDDING FUNCTIONS",
      description:
        "Complete wedding audio from ceremony to reception with wireless microphones",
      icon: Heart,
      bgColor: "bg-rose-100",
      iconColor: "text-rose-600",
      hoverColor: "hover:bg-rose-200",
    },
    {
      title: "CORPORATE FUNCTIONS",
      description:
        "Business event sound systems for seminars, product launches and company events",
      icon: Briefcase,
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
      hoverColor: "hover:bg-emerald-200",
    },
    {
      title: "BIRTHDAY FUNCTIONS",
      description:
        "Party sound systems with music entertainment for memorable birthday celebrations",
      icon: PartyPopper,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      hoverColor: "hover:bg-yellow-200",
    },
    {
      title: "OUTDOOR/INDOOR EVENTS",
      description:
        "Versatile sound solutions for both outdoor festivals and indoor venue events",
      icon: TreePine,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      hoverColor: "hover:bg-green-200",
    },
    {
      title: "CHURCH SERVICES",
      description:
        "Worship audio systems with clear congregation hearing and microphone setups",
      icon: Church,
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
      hoverColor: "hover:bg-indigo-200",
    },
  ];

  return (
    <section
      id="about"
      className="pt-40 py-20 bg-white relative overflow-hidden"
    >
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 border-4 border-cyan-400/10 transform rotate-45"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-black/5 transform rotate-12"></div>
        <div className="absolute top-1/2 right-20 opacity-5">
          <Triangle className="w-40 h-40 text-black transform rotate-30" />
        </div>
        <div className="absolute bottom-1/4 left-10 opacity-5">
          <Triangle className="w-28 h-28 text-cyan-400 transform rotate-60" />
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
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400"></div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">
              ABOUT TRINITY
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-black mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              For over 10 years, Trinity Events & Entertainment has been
              Lesotho's trusted choice for professional audio services,
              delivering crystal-clear sound and exceptional service for events
              of all sizes.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className="w-20 h-20 mx-auto mb-4 bg-black flex items-center justify-center 
                                group-hover:bg-cyan-400 transition-colors duration-300 transform 
                                group-hover:scale-110"
                >
                  <stat.icon className="h-10 w-10 text-white group-hover:text-black transition-colors duration-300" />
                </div>
                <div className="text-4xl font-black text-black mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-bold text-sm tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-black text-black mb-6 tracking-tight">
                OUR STORY
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Trinity Events & Entertainment was founded with a simple
                  mission: to provide exceptional audio experiences that enhance
                  every special moment in Lesotho. What started as a passion
                  project has grown into a full-service sound rental company
                  serving clients throughout the country.
                </p>
                <p>
                  Our team of experienced professionals brings together years of
                  expertise in sound engineering, event production, and customer
                  service. We understand that every event is unique, and we work
                  closely with our clients to deliver customized solutions that
                  exceed expectations.
                </p>
                <p>
                  From intimate baby showers to large graduation ceremonies,
                  from corporate meetings to wedding celebrations, we have the
                  equipment, knowledge, and dedication to make your event sound
                  perfect.
                </p>
              </div>

              {/* Contact highlight */}
              <div className="mt-6 p-4 bg-gray-100 border-l-4 border-cyan-400">
                <div className="font-black text-black mb-2">GET IN TOUCH</div>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-cyan-400" />
                    <span>+266 63812221 / +266 62545522 / 28920432</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-cyan-400" />
                    <span>TrinitySound@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=450&fit=crop&crop=center"
                  alt="Professional sound equipment setup"
                  className="w-full h-full object-cover"
                />
                {/* Geometric overlay */}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4 w-16 h-16 border-4 border-white transform rotate-45"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-cyan-400"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-black flex items-center justify-center">
                <Headphones className="h-16 w-16 text-cyan-400" />
              </div>
            </div>
          </div>

          {/* Services Specialties */}
          <div className="mb-16">
            <h3 className="text-3xl font-black text-black mb-8 text-center tracking-tight">
              WE SPECIALIZE IN
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className={`bg-white border-2 border-gray-200 p-6 
                            hover:border-cyan-400 hover:shadow-lg transition-all duration-300 
                            transform hover:-translate-y-2 group relative overflow-hidden`}
                >
                  {/* Background gradient accent */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 ${specialty.bgColor} 
                                   transform rotate-45 translate-x-10 -translate-y-10 
                                   group-hover:scale-110 transition-transform duration-300`}
                  ></div>

                  <div className="relative z-10">
                    {/* Icon container */}
                    <div
                      className={`w-16 h-16 ${specialty.bgColor} 
                                     flex items-center justify-center mb-4 
                                     group-hover:bg-cyan-400 transition-all duration-300
                                     transform group-hover:scale-110`}
                    >
                      <specialty.icon
                        className={`h-8 w-8 ${specialty.iconColor} 
                                                   group-hover:text-black transition-colors duration-300`}
                      />
                    </div>

                    <h4
                      className="font-black text-black text-sm mb-3 tracking-tight 
                                   group-hover:text-cyan-400 transition-colors duration-300"
                    >
                      {specialty.title}
                    </h4>

                    <p className="text-gray-600 text-xs leading-relaxed">
                      {specialty.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r 
                                  from-transparent via-cyan-400 to-transparent 
                                  transform scale-x-0 group-hover:scale-x-100 
                                  transition-transform duration-300"
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Special Offer */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/10 transform rotate-45 translate-x-12 -translate-y-12"></div>
              <div className="relative z-10">
                <h3 className="font-black text-lg mb-4 text-cyan-400">
                  PAYMENT OPTIONS
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-400 flex items-center justify-center">
                      <span className="text-black font-black text-xs">EC</span>
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">
                        ECOCASH MERCHANT
                      </div>
                      <div className="text-gray-300 text-sm">0000102135</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-400 flex items-center justify-center">
                      <span className="text-black font-black text-xs">MP</span>
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">
                        MPESA MERCHANT
                      </div>
                      <div className="text-gray-300 text-sm">45974</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-cyan-400 text-black p-8 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/10 transform rotate-45 -translate-x-10 translate-y-10"></div>
              <div className="relative z-10">
                <h3 className="font-black text-lg mb-4">SPECIAL OFFER!</h3>
                <p className="font-bold mb-2">
                  FREE SOUND FOR YOUR ANNIVERSARY
                </p>
                <p className="text-sm">
                  When you book wedding functions with Trinity Events &
                  Entertainment, get complimentary sound services for your
                  anniversary celebration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
