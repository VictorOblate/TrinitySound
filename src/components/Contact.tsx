"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Triangle,
  Volume2,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "PHONE LINES",
      details: ["+266 63812221", "+266 62545522", "28920432"],
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "EMAIL",
      details: ["TrinitySound@gmail.com"],
      action: "Send Email",
    },
    {
      icon: MapPin,
      title: "LOCATION",
      details: ["Maseru, Lesotho"],
      action: "Get Directions",
    },
  ];

  const eventTypes = [
    "Wedding Functions",
    "Corporate Events",
    "Graduations",
    "Birthday Functions",
    "Baby Showers",
    "House Warming",
    "Church Services",
    "Other",
  ];

  const paymentMethods = [
    { name: "ECOCASH MERCHANT", code: "0000102135", icon: "EC" },
    { name: "MPESA MERCHANT", code: "45974", icon: "MP" },
  ];

  return (
    <section className="pt-40 py-20 bg-gray-100 relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-20 w-24 h-24 border-4 border-cyan-400/20 transform rotate-45"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-black/5 transform rotate-12"></div>
        <div className="absolute top-1/2 left-10 opacity-10">
          <Triangle className="w-28 h-28 text-black transform rotate-30" />
        </div>
        <div className="absolute bottom-1/3 right-10 opacity-10">
          <Triangle className="w-20 h-20 text-cyan-400 transform rotate-60" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-black transform rotate-45 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-cyan-400 transform -rotate-45" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400"></div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">
              GET IN TOUCH
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-black mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Ready to make your event unforgettable? Contact Trinity Events &
              Entertainment for professional sound solutions that deliver
              crystal-clear audio experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border-l-4 border-cyan-400 p-6 shadow-lg 
                               hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-black mb-2 tracking-tight">
                          {info.title}
                        </h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-600 mb-1">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Payment Methods */}
              <div className="bg-black text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-400/10 transform rotate-45 translate-x-8 -translate-y-8"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <Volume2 className="w-6 h-6 text-cyan-400" />
                    <h3 className="font-black tracking-tight">
                      PAYMENT OPTIONS
                    </h3>
                  </div>
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 mb-3"
                    >
                      <div className="w-8 h-8 bg-cyan-400 flex items-center justify-center">
                        <span className="text-black font-black text-xs">
                          {method.icon}
                        </span>
                      </div>
                      <div>
                        <div className="text-cyan-400 font-bold text-sm">
                          {method.name}
                        </div>
                        <div className="text-white text-sm">{method.code}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-cyan-400 text-black p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6" />
                  <h3 className="font-black">RESPONSE TIME</h3>
                </div>
                <p className="font-medium">
                  We typically respond within 2-4 hours during business hours.
                  For urgent bookings, please call directly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border-2 border-black p-8 shadow-lg">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-black transform rotate-45 flex items-center justify-center">
                    <Send className="w-4 h-4 text-cyan-400 transform -rotate-45" />
                  </div>
                  <h3 className="text-2xl font-black text-black tracking-tight">
                    REQUEST A QUOTE
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-black mb-2 tracking-tight">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-cyan-400 
                                   focus:outline-none bg-white text-black font-medium"
                        placeholder="Your Full Name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-black mb-2 tracking-tight">
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-cyan-400 
                                   focus:outline-none bg-white text-black font-medium"
                        placeholder="+266 ..."
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-black mb-2 tracking-tight">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-cyan-400 
                                   focus:outline-none bg-white text-black font-medium"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-black mb-2 tracking-tight">
                        EVENT TYPE *
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-cyan-400 
                                   focus:outline-none bg-white text-black font-medium"
                        required
                      >
                        <option value="">Select Event Type</option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-black mb-2 tracking-tight">
                        EVENT DATE
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-cyan-400 
                                   focus:outline-none bg-white text-black font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-black mb-2 tracking-tight">
                        EXPECTED GUESTS
                      </label>
                      <input
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 focus:border-cyan-400 
                                   focus:outline-none bg-white text-black font-medium"
                        placeholder="Number of guests"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-black mb-2 tracking-tight">
                      EVENT DETAILS & REQUIREMENTS
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 focus:border-cyan-400 
                                 focus:outline-none bg-white text-black font-medium resize-none"
                      placeholder="Tell us about your event, venue details, specific audio requirements, and any special requests..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-black hover:bg-cyan-400 text-white hover:text-black 
                               font-black tracking-tight py-4 text-lg transform hover:scale-105 
                               transition-all duration-300"
                  >
                    SEND REQUEST
                    <Send className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    * Required fields. We'll get back to you within 2-4 hours
                    with a detailed quote.
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Special Offer */}
          <div className="mt-16">
            <div className="bg-black text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 transform rotate-45 translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-400/10 transform rotate-45 -translate-x-12 translate-y-12"></div>
              <div className="relative z-10 text-center">
                <h3 className="text-3xl font-black mb-4 tracking-tight">
                  SPECIAL OFFER!
                </h3>
                <p className="text-xl text-cyan-400 mb-2 font-bold">
                  FREE SOUND FOR YOUR ANNIVERSARY
                </p>
                <p className="text-gray-300 mb-6">
                  When you book wedding functions with Trinity Events &
                  Entertainment
                </p>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-left">
                    <h4 className="font-black mb-3">
                      FOLLOW US ON SOCIAL MEDIA:
                    </h4>
                    <p className="text-cyan-400">📘 Trinity Sounds</p>
                    <p className="text-cyan-400">
                      📘 Trinity Events and Entertainment
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <Button
                      className="bg-cyan-400 hover:bg-white text-black font-black px-8 py-3 
                                       transform hover:scale-105 transition-all duration-300"
                    >
                      CLAIM THIS OFFER
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
