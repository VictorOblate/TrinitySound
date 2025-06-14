
'use client'

import { Volume2, Play, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
            <span className="text-gradient bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
              SOUND
            </span>
            <span className="block text-white text-4xl md:text-6xl mt-2">
              HIRE!
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            🎵 Professional audio equipment rental for all your events 🎵
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-scale-in">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover-lift"
              asChild
            >
              <Link href="/contact">
                ▶ Get Quote
              </Link>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-blue-300 text-white hover:bg-blue-800 px-8 py-4 text-lg font-semibold shadow-lg hover-lift"
              asChild
            >
              <Link href="/services">
                🎧 View Services
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 card-shadow">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <p className="text-blue-200 text-sm">Events</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 card-shadow">
              <div className="text-3xl font-bold text-white mb-2">10+</div>
              <p className="text-blue-200 text-sm">Years</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 card-shadow">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <p className="text-blue-200 text-sm">Support</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 card-shadow">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <p className="text-blue-200 text-sm">Satisfaction</p>
            </div>
          </div>

          {/* Service Types */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 card-shadow hover-lift">
              <div className="text-2xl mb-2">🎓</div>
              <h3 className="text-white font-semibold text-sm">Graduations</h3>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 card-shadow hover-lift">
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="text-white font-semibold text-sm">Office Meetings</h3>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 card-shadow hover-lift">
              <div className="text-2xl mb-2">💍</div>
              <h3 className="text-white font-semibold text-sm">Weddings</h3>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 card-shadow hover-lift">
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="text-white font-semibold text-sm">Corporate Events</h3>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 card-shadow hover-lift">
              <div className="text-2xl mb-2">🎂</div>
              <h3 className="text-white font-semibold text-sm">Birthday Parties</h3>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 card-shadow hover-lift">
              <div className="text-2xl mb-2">🎪</div>
              <h3 className="text-white font-semibold text-sm">Hi Tea Events</h3>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 card-shadow hover-lift">
              <div className="text-2xl mb-2">🌳</div>
              <h3 className="text-white font-semibold text-sm">Outdoor Events</h3>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 card-shadow hover-lift">
              <div className="text-2xl mb-2">🎵</div>
              <h3 className="text-white font-semibold text-sm">Live Music</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
