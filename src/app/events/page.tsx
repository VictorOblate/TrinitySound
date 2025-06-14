
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image: string
  category: string
  attendees?: number
  featured: boolean
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - replace with Supabase queries
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Summer Music Festival 2024',
        description: 'Join us for an incredible summer music festival featuring local and international artists.',
        date: '2024-07-15',
        time: '18:00',
        location: 'Central Park Amphitheater',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop',
        category: 'Music Festival',
        attendees: 5000,
        featured: true
      },
      {
        id: '2',
        title: 'Corporate Annual Gala',
        description: 'Annual corporate gala event with professional audio and lighting setup.',
        date: '2024-06-20',
        time: '19:30',
        location: 'Grand Ballroom Hotel',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
        category: 'Corporate',
        attendees: 300,
        featured: false
      },
      {
        id: '3',
        title: 'Wedding Celebration',
        description: 'Beautiful outdoor wedding ceremony with premium sound system.',
        date: '2024-06-25',
        time: '16:00',
        location: 'Garden Resort Venue',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        category: 'Wedding',
        attendees: 150,
        featured: true
      }
    ]
    
    setEvents(mockEvents)
    setLoading(false)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading upcoming events...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our upcoming events where Trinity Sound provides professional 
            audio solutions. Join us for unforgettable experiences!
          </p>
        </div>

        {/* Featured Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {events.filter(event => event.featured).map((event) => (
              <Card key={event.id} className="overflow-hidden hover-lift card-shadow-lg">
                <div className="relative h-64">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-gray-900">{event.title}</CardTitle>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {event.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    
                    {event.attendees && (
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-sm">{event.attendees} expected attendees</span>
                      </div>
                    )}
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Events */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover-lift card-shadow">
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-gray-900">{event.title}</CardTitle>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {event.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-3 w-3 mr-2 text-blue-600" />
                      <span className="text-xs">{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-3 w-3 mr-2 text-blue-600" />
                      <span className="text-xs">{event.location}</span>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-blue-600 text-white card-shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Have an upcoming event?</h3>
              <p className="text-blue-100 mb-6">
                Let Trinity Sound provide professional audio solutions for your next event. 
                Contact us for a free consultation and quote.
              </p>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Get Your Quote Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
