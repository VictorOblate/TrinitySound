
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
'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { 
  Code, 
  Palette, 
  Smartphone, 
  Database, 
  Cloud, 
  Shield,
  ArrowRight
} from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks and best practices",
      features: ["React/Next.js", "Node.js", "Full-Stack Solutions"]
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that enhance user experience and engagement",
      features: ["User Research", "Wireframing", "Prototyping"]
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["React Native", "Flutter", "Native iOS/Android"]
    },
    {
      icon: Database,
      title: "Backend Development",
      description: "Scalable server-side solutions and API development",
      features: ["RESTful APIs", "Database Design", "Microservices"]
    },
    {
      icon: Cloud,
      title: "Cloud Solutions",
      description: "Cloud infrastructure setup and deployment strategies",
      features: ["AWS/Azure", "DevOps", "Serverless"]
    },
    {
      icon: Shield,
      title: "Security & Performance",
      description: "Optimization and security best practices for your applications",
      features: ["Performance Audit", "Security Testing", "Code Review"]
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Services I Offer
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions to bring your digital ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-600 hover:border-blue-200 dark:hover:border-blue-400"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
