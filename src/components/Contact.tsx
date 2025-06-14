
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle
} from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '(555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@trinitysound.com',
      link: 'mailto:info@trinitysound.com'
    },
    {
      icon: MapPin,
      label: 'Service Area',
      value: 'Tri-State Region',
      link: null
    },
    {
      icon: Clock,
      label: 'Availability',
      value: '24/7 Emergency Support',
      link: null
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to make your event sound amazing? Contact us for a free consultation 
              and personalized quote for your upcoming event.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-1">{info.label}</div>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="text-white hover:text-purple-400 transition-colors text-lg"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-white text-lg">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-white mb-4">Business Hours</h4>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>By Appointment</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Emergency Support</span>
                      <span>24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">Request a Quote</h3>
              
              {isSubmitted ? (
                <div className="bg-green-600 text-white p-6 rounded-lg text-center">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="eventDate" className="block text-white text-sm font-medium mb-2">
                        Event Date
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="eventType" className="block text-white text-sm font-medium mb-2">
                      Event Type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="concert">Concert/Performance</option>
                      <option value="party">Private Party</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Tell us about your event, venue size, expected guests, and any specific requirements..."
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send,
  MessageSquare,
  Clock
} from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@example.com",
      action: "Send Email"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "San Francisco, CA",
      action: "Get Directions"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can work together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <div
                    key={index}
                    className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {info.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {info.details}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6" />
                <h3 className="font-semibold">Response Time</h3>
              </div>
              <p className="text-blue-100">
                I typically respond within 24 hours during business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Send Me a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                    placeholder="Project Discussion"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
