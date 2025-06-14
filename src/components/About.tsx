
'use client'

import { Users, Award, Clock, Headphones } from 'lucide-react'

export default function About() {
  const stats = [
    { icon: Users, label: 'Events Completed', value: '500+' },
    { icon: Award, label: 'Years Experience', value: '15+' },
    { icon: Clock, label: 'Hours of Coverage', value: '10,000+' },
    { icon: Headphones, label: 'Happy Clients', value: '300+' }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Trinity Sound
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over 15 years, Trinity Sound has been the trusted choice for professional 
              audio services, delivering crystal-clear sound and exceptional service for 
              events of all sizes.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Trinity Sound was founded with a simple mission: to provide exceptional 
                  audio experiences that enhance every special moment. What started as a 
                  passion project has grown into a full-service audio company serving 
                  clients throughout the region.
                </p>
                <p>
                  Our team of experienced professionals brings together decades of expertise 
                  in sound engineering, event production, and customer service. We understand 
                  that every event is unique, and we work closely with our clients to deliver 
                  customized solutions that exceed expectations.
                </p>
                <p>
                  From intimate gatherings to large-scale productions, we have the equipment, 
                  knowledge, and dedication to make your event sound perfect.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=450&fit=crop&crop=center"
                  alt="Professional sound equipment setup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-600 rounded-lg flex items-center justify-center">
                <Headphones className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
