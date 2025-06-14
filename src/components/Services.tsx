
'use client'

import { 
  Music, 
  Mic, 
  Radio, 
  Settings, 
  Users, 
  Calendar,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Services() {
  const services = [
    {
      icon: Music,
      title: 'Wedding Audio',
      description: 'Complete sound solutions for ceremonies and receptions with wireless microphones and elegant speaker setups.',
      features: ['Wireless microphones', 'Ceremony sound', 'Reception music', 'DJ equipment']
    },
    {
      icon: Users,
      title: 'Corporate Events',
      description: 'Professional audio for conferences, meetings, and corporate gatherings with crystal-clear sound quality.',
      features: ['Conference systems', 'Presentation audio', 'Microphone setups', 'Live streaming support']
    },
    {
      icon: Mic,
      title: 'Live Performances',
      description: 'Concert-grade sound systems for live music, performances, and entertainment events.',
      features: ['Stage monitoring', 'Multi-channel mixing', 'Professional microphones', 'Amplification systems']
    },
    {
      icon: Radio,
      title: 'Event Production',
      description: 'Full-service event audio production with experienced technicians and premium equipment.',
      features: ['Technical crew', 'Equipment delivery', 'On-site setup', 'Event coordination']
    }
  ]

  const additionalServices = [
    'Sound system consultation and design',
    'Equipment rental for DIY events',
    'Audio recording and playback services',
    'Lighting integration and coordination',
    'Emergency backup systems',
    '24/7 technical support during events'
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional audio solutions tailored to your specific event needs, 
              from intimate gatherings to large-scale productions.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <service.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Additional Services
                </h3>
                <ul className="space-y-3">
                  {additionalServices.map((service, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center md:text-right">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-6">
                  <Settings className="h-12 w-12 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Custom Solutions Available
                </h4>
                <p className="text-gray-600 mb-6">
                  Need something specific? We work with you to create custom audio solutions 
                  that perfectly match your event requirements.
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Discuss Your Needs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
