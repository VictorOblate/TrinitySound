
'use client'

import { Volume2, Play, Users, Star, Award, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Geometric Background with Gradients */}
      <div className="absolute inset-0 gradient-dark">
        <div className="absolute inset-0 geometric-bg opacity-50"></div>
        <div className="absolute inset-0 hexagon-pattern opacity-30"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 gradient-primary rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 gradient-secondary rounded-lg rotate-45 opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 gradient-primary rounded-full opacity-15 animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 gradient-secondary rounded-lg rotate-45 opacity-25 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900/40 to-indigo-900/20"></div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        {/* Main Heading */}
        <div className="animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="text-gradient-primary block">
              TRINITY
            </span>
            <span className="text-gradient-secondary block mt-2">
              SOUND
            </span>
          </h1>
          
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 gradient-primary rounded-full mr-4"></div>
            <Volume2 className="w-8 h-8 text-blue-400 animate-glow" />
            <div className="h-1 w-20 gradient-primary rounded-full ml-4"></div>
          </div>
        </div>
        
        {/* Subtitle */}
        <div className="animate-slide-in-left">
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Professional audio equipment rental for unforgettable events
          </p>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-in-right">
          <Button 
            size="lg"
            className="gradient-primary hover:shadow-2xl hover:shadow-blue-500/25 text-white px-12 py-6 text-lg font-bold rounded-xl hover-lift border border-blue-400/20"
            asChild
          >
            <Link href="/contact">
              <Play className="w-5 h-5 mr-2" />
              Get Quote
            </Link>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="glass border-blue-400/30 text-blue-100 hover:bg-blue-800/20 px-12 py-6 text-lg font-bold rounded-xl hover-lift"
            asChild
          >
            <Link href="/services">
              <Zap className="w-5 h-5 mr-2" />
              View Services
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16 animate-fade-in-up">
          {[
            { number: "500+", label: "Events", icon: Star },
            { number: "10+", label: "Years", icon: Award },
            { number: "24/7", label: "Support", icon: Users },
            { number: "100%", label: "Satisfaction", icon: Zap }
          ].map((stat, index) => (
            <div key={index} className="glass rounded-2xl p-6 card-glow card-glow-hover hover-lift">
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-black text-gradient-primary mb-2">{stat.number}</div>
              <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Service Types Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[
            { emoji: "🎓", title: "Graduations", color: "from-blue-600 to-blue-800" },
            { emoji: "🏢", title: "Corporate Events", color: "from-indigo-600 to-indigo-800" },
            { emoji: "💍", title: "Weddings", color: "from-purple-600 to-purple-800" },
            { emoji: "🎂", title: "Birthday Parties", color: "from-blue-600 to-purple-600" },
            { emoji: "🎪", title: "Hi Tea Events", color: "from-indigo-600 to-blue-600" },
            { emoji: "🌳", title: "Outdoor Events", color: "from-green-600 to-blue-600" },
            { emoji: "🎵", title: "Live Music", color: "from-purple-600 to-blue-600" },
            { emoji: "📢", title: "Conferences", color: "from-blue-600 to-indigo-600" }
          ].map((service, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-6 card-glow hover-lift group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{service.emoji}</span>
              </div>
              <h3 className="text-blue-100 font-bold text-sm group-hover:text-blue-300 transition-colors">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
