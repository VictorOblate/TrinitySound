
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, Volume2 } from 'lucide-react'

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Trinity Sound
            <span className="block text-purple-400 text-4xl md:text-6xl mt-2">
              Professional Audio
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Delivering exceptional sound experiences for weddings, corporate events, 
            concerts, and special occasions throughout the region.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
            >
              Get Quote
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={togglePlay}
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 text-lg"
            >
              {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
              {isPlaying ? 'Pause Demo' : 'Play Demo'}
            </Button>
          </div>
          
          {/* Sound Visualization */}
          <div className="flex justify-center items-center space-x-2 mb-8">
            <Volume2 className="text-purple-400 h-6 w-6" />
            <div className="flex space-x-1">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-purple-400 rounded-full transition-all duration-300 ${
                    isPlaying 
                      ? `h-${Math.floor(Math.random() * 8) + 4} animate-pulse` 
                      : 'h-4'
                  }`}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    height: isPlaying ? `${Math.random() * 32 + 16}px` : '16px'
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center">
                <Volume2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Premium Equipment</h3>
              <p className="text-gray-400">State-of-the-art sound systems and professional grade equipment</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Setup</h3>
              <p className="text-gray-400">Professional installation and sound optimization for any venue</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center">
                <Pause className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-400">Dedicated support throughout your event for peace of mind</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
