"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ExternalLink,
  Volume2,
  Triangle,
  Music,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  attendees?: number;
  featured: boolean;
  status: "upcoming" | "completed";
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  // Mock data with Trinity-specific events
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: "1",
        title: "National University Graduation",
        description:
          "Professional sound system setup for the university's annual graduation ceremony with over 500 graduates and families.",
        date: "2025-07-15",
        time: "09:00",
        location: "National University of Lesotho, Roma",
        image:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
        category: "Graduations",
        attendees: 1200,
        featured: true,
        status: "upcoming",
      },
      {
        id: "2",
        title: "Corporate Annual Conference",
        description:
          "Multi-day conference setup with presentation audio, wireless microphones, and live streaming support for Lesotho Chamber of Commerce.",
        date: "2025-06-20",
        time: "08:30",
        location: "Maseru Convention Centre",
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
        category: "Corporate Events",
        attendees: 300,
        featured: false,
        status: "upcoming",
      },
      {
        id: "3",
        title: "Royal Wedding Celebration",
        description:
          "Elegant wedding ceremony and reception with premium sound system, wireless microphones, and DJ services for the entire celebration.",
        date: "2025-06-25",
        time: "14:00",
        location: "Maseru Sun Hotel Gardens",
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
        category: "Wedding Functions",
        attendees: 250,
        featured: true,
        status: "upcoming",
      },
      {
        id: "4",
        title: "Golden Anniversary Celebration",
        description:
          "50th wedding anniversary celebration with elegant sound setup and special lighting for intimate family gathering.",
        date: "2025-05-10",
        time: "18:00",
        location: "Private Residence, Maseru",
        image:
          "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
        category: "Birthday Functions",
        attendees: 80,
        featured: false,
        status: "completed",
      },
      {
        id: "5",
        title: "Baby Shower Celebration",
        description:
          "Intimate baby shower with background music system and microphone setup for games and speeches.",
        date: "2025-04-15",
        time: "15:00",
        location: "Ha Abia Community Center",
        image:
          "https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?w=800&h=600&fit=crop",
        category: "Baby Showers",
        attendees: 40,
        featured: false,
        status: "completed",
      },
      {
        id: "6",
        title: "House Warming Party",
        description:
          "New home celebration with outdoor sound system and party music setup for neighborhood celebration.",
        date: "2025-07-05",
        time: "16:30",
        location: "Teyateyaneng Residential Area",
        image:
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
        category: "House Warming",
        attendees: 60,
        featured: false,
        status: "upcoming",
      },
    ];

    setEvents(mockEvents);
    setLoading(false);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    return event.status === filter;
  });

  const categories = [
    "All",
    "Graduations",
    "Wedding Functions",
    "Corporate Events",
    "Baby Showers",
    "House Warming",
    "Birthday Functions",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block w-12 h-12 bg-black transform rotate-45 animate-spin"></div>
            <p className="mt-4 text-gray-600 font-bold">LOADING EVENTS...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="pt-40 min-h-screen bg-gray-100  relative overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-20 w-32 h-32 border-4 border-cyan-400/10 transform rotate-45"></div>
          <div className="absolute bottom-40 left-10 w-24 h-24 bg-black/5 transform rotate-12"></div>
          <div className="absolute top-1/2 left-20 opacity-5">
            <Triangle className="w-40 h-40 text-black transform rotate-30" />
          </div>
          <div className="absolute bottom-1/4 right-10 opacity-5">
            <Triangle className="w-28 h-28 text-cyan-400 transform rotate-60" />
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-black transform rotate-45 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-cyan-400 transform -rotate-45" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">
              TRINITY EVENTS
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-black mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover our upcoming and completed events where Trinity Events &
              Entertainment provides professional sound solutions across
              Lesotho. Join us for unforgettable audio experiences!
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-4">
              {["all", "upcoming", "completed"].map((filterType) => (
                <Button
                  key={filterType}
                  onClick={() => setFilter(filterType as any)}
                  className={`font-black tracking-tight transform hover:scale-105 transition-all duration-300 ${
                    filter === filterType
                      ? "bg-black text-white hover:bg-cyan-400 hover:text-black"
                      : "bg-white text-black border-2 border-black hover:bg-black hover:text-white"
                  }`}
                >
                  {filterType.toUpperCase()} EVENTS
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Events */}
          <div className="mb-12">
            <h2 className="text-2xl font-black text-black mb-8 tracking-tight">
              FEATURED EVENTS
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {filteredEvents
                .filter((event) => event.featured)
                .map((event) => (
                  <div
                    key={event.id}
                    className="bg-white border-l-4 border-cyan-400 shadow-lg hover:shadow-xl 
                               transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    <div className="relative h-64">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                      <div className="absolute top-4 left-4">
                        <div className="bg-black text-cyan-400 px-3 py-1 font-black text-sm">
                          FEATURED
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div
                          className={`px-3 py-1 font-black text-sm ${
                            event.status === "upcoming"
                              ? "bg-cyan-400 text-black"
                              : "bg-gray-800 text-white"
                          }`}
                        >
                          {event.status.toUpperCase()}
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-black text-xl mb-2 tracking-tight">
                          {event.title}
                        </h3>
                        <div className="bg-cyan-400 text-black px-3 py-1 font-bold text-sm inline-block">
                          {event.category}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
                          <span className="text-sm font-medium">
                            {formatDate(event.date)}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                          <span className="text-sm font-medium">
                            {event.time}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-cyan-400" />
                          <span className="text-sm font-medium">
                            {event.location}
                          </span>
                        </div>

                        {event.attendees && (
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-cyan-400" />
                            <span className="text-sm font-medium">
                              {event.attendees} attendees
                            </span>
                          </div>
                        )}
                      </div>

                      <Button
                        className="w-full bg-black hover:bg-cyan-400 text-white hover:text-black 
                                         font-black tracking-tight transform hover:scale-105 transition-all duration-300"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        VIEW DETAILS
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* All Events */}
          <div>
            <h2 className="text-2xl font-black text-black mb-8 tracking-tight">
              {filter === "all"
                ? "ALL EVENTS"
                : `${filter.toUpperCase()} EVENTS`}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border-2 border-gray-200 hover:border-cyan-400 shadow-md hover:shadow-lg 
                             transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute top-3 right-3">
                      <div
                        className={`px-2 py-1 font-bold text-xs ${
                          event.status === "upcoming"
                            ? "bg-cyan-400 text-black"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        {event.status.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black text-black text-lg tracking-tight flex-1">
                        {event.title}
                      </h3>
                    </div>

                    <div className="bg-cyan-400 text-black px-2 py-1 font-bold text-xs inline-block mb-3">
                      {event.category}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-1 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-3 w-3 mr-2 text-cyan-400" />
                        <span className="text-xs font-medium">
                          {formatDate(event.date)}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-3 w-3 mr-2 text-cyan-400" />
                        <span className="text-xs font-medium">
                          {event.location}
                        </span>
                      </div>

                      {event.attendees && (
                        <div className="flex items-center text-gray-600">
                          <Users className="h-3 w-3 mr-2 text-cyan-400" />
                          <span className="text-xs font-medium">
                            {event.attendees} people
                          </span>
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full bg-black hover:bg-cyan-400 text-white hover:text-black 
                                       font-bold text-sm tracking-tight transition-all duration-300"
                    >
                      VIEW DETAILS
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16">
            <div className="bg-black text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 transform rotate-45 translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-400/10 transform rotate-45 -translate-x-12 translate-y-12"></div>

              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-cyan-400 transform rotate-45 flex items-center justify-center">
                    <Volume2 className="w-8 h-8 text-black transform -rotate-45" />
                  </div>
                </div>

                <h3 className="text-3xl font-black mb-4 tracking-tight">
                  PLANNING YOUR EVENT?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
                  Let Trinity Events & Entertainment provide professional audio
                  solutions for your next celebration. From graduations to
                  weddings, we deliver exceptional sound experiences across
                  Lesotho.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-cyan-400 font-black text-lg mb-2">
                      PHONE
                    </div>
                    <div className="text-white text-sm">+266 63812221</div>
                    <div className="text-white text-sm">+266 62545522</div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-400 font-black text-lg mb-2">
                      EMAIL
                    </div>
                    <div className="text-white text-sm">
                      TrinitySound@gmail.com
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-400 font-black text-lg mb-2">
                      PAYMENT
                    </div>
                    <div className="text-white text-sm">
                      EcoCash: 0000102135
                    </div>
                    <div className="text-white text-sm">M-Pesa: 45974</div>
                  </div>
                </div>

                <Button
                  className="bg-cyan-400 hover:bg-white text-black font-black px-8 py-3 
                                   tracking-tight transform hover:scale-105 transition-all duration-300"
                >
                  GET YOUR QUOTE TODAY
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
