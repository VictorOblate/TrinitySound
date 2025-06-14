"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  ExternalLink,
  MapPin,
  Users,
  Calendar,
  Filter,
  Grid,
  List,
  Volume2,
  Triangle,
  Music,
} from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  location: string;
  guests: string;
  date: string;
  featured: boolean;
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Weddings",
    "Corporate",
    "Graduations",
    "Birthday Functions",
    "Church Services",
  ];

  // Mock data for demonstration
  const mockPortfolioItems: PortfolioItem[] = [
    {
      id: "1",
      title: "Grand Wedding Ceremony",
      description:
        "Professional sound setup for 300-guest wedding with wireless microphones and reception entertainment.",
      category: "Weddings",
      imageUrl:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      location: "Maseru",
      guests: "300",
      date: "March 2025",
      featured: true,
    },
    {
      id: "2",
      title: "University Graduation",
      description:
        "Complete audio system for graduation ceremony with clear speech amplification for 500+ attendees.",
      category: "Graduations",
      imageUrl:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
      location: "National University",
      guests: "500+",
      date: "April 2025",
      featured: true,
    },
    {
      id: "3",
      title: "Corporate Conference",
      description:
        "Multi-day conference setup with presentation audio and live streaming support.",
      category: "Corporate",
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      location: "Maseru Convention Center",
      guests: "200",
      date: "February 2025",
      featured: false,
    },
    {
      id: "4",
      title: "Golden Anniversary",
      description:
        "Intimate celebration with elegant sound setup for 50th wedding anniversary.",
      category: "Birthday Functions",
      imageUrl:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
      location: "Private Venue",
      guests: "80",
      date: "January 2025",
      featured: false,
    },
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPortfolioItems(mockPortfolioItems);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  const featuredItems = portfolioItems.filter((item) => item.featured);

  if (loading) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block w-12 h-12 bg-black transform rotate-45 animate-spin"></div>
            <p className="mt-4 text-gray-600 font-bold">LOADING PORTFOLIO...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-40 py-20 bg-gray-100 relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-cyan-400/20 transform rotate-45"></div>
        <div className="absolute bottom-40 right-20 w-16 h-16 bg-black/5 transform rotate-12"></div>
        <div className="absolute top-1/3 right-10 opacity-10">
          <Triangle className="w-24 h-24 text-black transform rotate-45" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-black transform rotate-45 flex items-center justify-center">
                  <Music className="w-8 h-8 text-cyan-400 transform -rotate-45" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400"></div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">
              OUR PORTFOLIO
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-black mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Explore our recent projects and see how we've helped create
              memorable sound experiences for events across Lesotho.
            </p>
          </div>

          {/* Featured Projects */}
          {featuredItems.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-black text-black mb-8 text-center tracking-tight">
                FEATURED PROJECTS
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredItems.map((item) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div
                        className="group cursor-pointer bg-white border-l-4 border-cyan-400 
                                      shadow-lg hover:shadow-xl transition-all duration-300 
                                      transform hover:-translate-y-2"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                                          transition-opacity duration-300 flex items-center justify-center"
                          >
                            <div className="bg-cyan-400 p-4">
                              <ExternalLink className="h-6 w-6 text-black" />
                            </div>
                          </div>
                          <div className="absolute top-4 left-4 bg-black text-cyan-400 px-3 py-1 font-bold text-sm">
                            FEATURED
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="bg-cyan-400 text-black px-3 py-1 font-bold text-xs">
                              {item.category}
                            </div>
                            <span className="text-sm text-gray-500 font-bold">
                              {item.date}
                            </span>
                          </div>
                          <h4 className="text-xl font-black text-black mb-2 tracking-tight">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 mb-4">
                            {item.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4 text-cyan-400" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4 text-cyan-400" />
                              <span>{item.guests} guests</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative aspect-square">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="bg-cyan-400 text-black px-3 py-1 font-bold text-sm inline-block mb-2">
                              {item.category}
                            </div>
                            <h3 className="text-2xl font-black">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-gray-600">{item.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-5 w-5 text-cyan-400" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-5 w-5 text-cyan-400" />
                              <span>{item.guests} guests</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-5 w-5 text-cyan-400" />
                              <span>{item.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          )}

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex flex-wrap items-center space-x-2">
              <Filter className="h-5 w-5 text-black" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-black hover:bg-cyan-400 text-white hover:text-black font-bold"
                      : "border-black text-black hover:bg-black hover:text-white font-bold"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-black hover:bg-cyan-400 text-white hover:text-black"
                    : "border-black text-black hover:bg-black hover:text-white"
                }
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-black hover:bg-cyan-400 text-white hover:text-black"
                    : "border-black text-black hover:bg-black hover:text-white"
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div
                    className={`group cursor-pointer bg-white border-l-4 border-cyan-400 
                               shadow-md hover:shadow-lg transition-all duration-300 
                               transform hover:-translate-y-1 ${
                                 viewMode === "list" ? "flex" : ""
                               }`}
                  >
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list"
                          ? "w-48 aspect-[4/3]"
                          : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                                      transition-opacity duration-300 flex items-center justify-center"
                      >
                        <div className="bg-cyan-400 p-2">
                          <ExternalLink className="h-5 w-5 text-black" />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="bg-cyan-400 text-black px-2 py-1 font-bold text-xs">
                          {item.category}
                        </div>
                        <span className="text-xs text-gray-500 font-bold">
                          {item.date}
                        </span>
                      </div>
                      <h4 className="font-black text-black mb-2 tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-cyan-400" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 text-cyan-400" />
                          <span>{item.guests}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative aspect-square">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="bg-cyan-400 text-black px-3 py-1 font-bold text-sm inline-block mb-2">
                          {item.category}
                        </div>
                        <h3 className="text-2xl font-black">{item.title}</h3>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5 text-cyan-400" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-cyan-400" />
                          <span>{item.guests} guests</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-cyan-400" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-300 transform rotate-45 mx-auto mb-4"></div>
              <p className="text-gray-500 font-bold">
                NO PROJECTS FOUND IN THIS CATEGORY
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-black text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 transform rotate-45 translate-x-16 -translate-y-16"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4">
                  READY TO CREATE YOUR EVENT?
                </h3>
                <p className="text-gray-300 mb-6">
                  Let's discuss your audio needs and make your event
                  unforgettable
                </p>
                <Button
                  className="bg-cyan-400 hover:bg-white text-black font-black px-8 py-3 
                                   transform hover:scale-105 transition-all duration-300"
                >
                  GET YOUR QUOTE TODAY
                  {/* <ArrowRight className="ml-2 h-4 w-4" /> */}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
