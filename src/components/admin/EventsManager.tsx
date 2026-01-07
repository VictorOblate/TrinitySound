
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Calendar, MapPin, Clock, Users, Edit, Trash2, Plus, Upload } from 'lucide-react'

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
  cta?: string
}

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: "",
    category: "",
    featured: false,
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/events')
    const json = await res.json()
    if (!res.ok) {
      console.error('Failed to load events', json)
      setLoading(false)
      return
    }
    // supabase `events` table uses `name` instead of `title` — map accordingly
    const mapped = (json.data || []).map((e: any) => ({
      id: e.id,
      title: e.name,
      description: e.description,
      date: e.date,
      time: '',
      location: e.location,
      image: e.image_url,
      category: e.category || '',
      attendees: e.attendees,
      featured: e.featured,
    }))
    setEvents(mapped)
    setLoading(false)
  }

  const handleDeleteEvent = async (eventId: string) => {
    const res = await fetch(`/api/admin/events?id=${eventId}`, { method: 'DELETE' })
    if (!res.ok) {
      console.error('Failed to delete')
      return
    }
    await fetchEvents()
  }

  const toggleFeatured = async (eventId: string) => {
    const event = events.find((ev) => ev.id === eventId)
    if (!event) return
    const res = await fetch('/api/admin/events', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: eventId, featured: !event.featured }),
    })
    if (!res.ok) {
      console.error('Failed to toggle featured')
      return
    }
    await fetchEvents()
  }

  const saveNewEvent = async () => {
    const tempId = 'temp-' + Date.now()
    const optimistic: Event = {
      id: tempId,
      title: newEvent.title || 'Untitled',
      description: newEvent.description || '',
      date: newEvent.date || '',
      time: newEvent.time || '',
      location: newEvent.location || '',
      image: newEvent.image || '',
      category: newEvent.category || '',
      attendees: newEvent.attendees || 0,
      featured: !!newEvent.featured,
    }

    setEvents((s) => [optimistic, ...s])

    try {
      const payload = {
        name: newEvent.title,
        description: newEvent.description,
        date: newEvent.date,
        cta: (newEvent as any).cta || undefined,
        image_url: newEvent.image || undefined,
        location: newEvent.location || undefined,
        featured: !!newEvent.featured,
      };

      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to create event')

      // replace optimistic with real
      setEvents((s) => s.map((ev) => (ev.id === tempId ? {
        id: json.data.id,
        title: json.data.name,
        description: json.data.description,
        date: json.data.date,
        time: '',
        location: json.data.location,
        image: json.data.image_url,
        category: json.data.category || '',
        attendees: json.data.attendees,
        featured: json.data.featured,
      } : ev)))

      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Event added', description: 'New event created' }))
    } catch (err: any) {
      console.error(err)
      // revert optimistic
      setEvents((s) => s.filter((ev) => ev.id !== tempId))
      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Error', description: err.message || 'Could not add event', variant: 'destructive' }))
    } finally {
      setIsAddingEvent(false)
      setNewEvent({ title: '', description: '', date: '', time: '', location: '', image: '', category: '', featured: false })
    }
  }

  const saveEditedEvent = async () => {
    if (!editingEvent) return

    // optimistic update
    setEvents((s) => s.map((ev) => (ev.id === editingEvent.id ? editingEvent : ev)))

    try {
      const payload: any = {
        id: editingEvent.id,
        name: editingEvent.title,
        description: editingEvent.description,
        date: editingEvent.date,
        image_url: editingEvent.image,
        location: editingEvent.location,
        featured: editingEvent.featured,
      }

      const res = await fetch('/api/admin/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to update event')

      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Updated', description: 'Event updated' }))
      setEditingEvent(null)
      await fetchEvents()
    } catch (err: any) {
      console.error(err)
      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Error', description: err.message || 'Could not update event', variant: 'destructive' }))
      setEditingEvent(null)
      await fetchEvents()
    }
  }



  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading events...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="card-shadow">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-gray-900">Events Management</CardTitle>
          <div className="flex items-center gap-3">
            <Button variant="destructive" onClick={async () => {
              if (!confirm('Remove all events not posted by admins? This cannot be undone.')) return
              import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Cleaning', description: 'Removing non-admin events and portfolio items...' }))
              try {
                const res = await fetch('/api/admin/cleanup', { method: 'POST' })
                const json = await res.json()
                if (!res.ok) throw new Error(json?.error || 'Cleanup failed')
                import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Cleanup done', description: `Removed ${json.deletedEvents || 0} events and ${json.deletedPortfolio || 0} portfolio items` }))
                await fetchEvents()
              } catch (err: any) {
                console.error(err)
                import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Error', description: err.message || 'Cleanup failed', variant: 'destructive' }))
              }
            }}>Remove non-admin items</Button>

            <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={newEvent.title || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={newEvent.description || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newEvent.date || ""}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newEvent.time || ""}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newEvent.location || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter event location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Poster URL
                  </label>
                  <input
                    type="url"
                    value={newEvent.image || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Poster URL</label>
                  <input
                    type="url"
                    value={newEvent.image || ""}
                    onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                  <input type="file" accept="image/*" className="mt-2" onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    try {
                      const fd = new FormData();
                      fd.append('file', f);
                      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                      const json = await res.json();
                      if (!res.ok) throw new Error(json?.error || 'Upload failed');
                      setNewEvent({ ...newEvent, image: json.url });
                      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Uploaded', description: 'Poster uploaded' }));
                    } catch (err: any) {
                      console.error(err);
                      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Upload failed', description: err.message || 'Could not upload', variant: 'destructive' }));
                    }
                  }} />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    id="featured"
                    type="checkbox"
                    checked={!!newEvent.featured}
                    onChange={(e) => setNewEvent({ ...newEvent, featured: e.target.checked })}
                  />
                  <label htmlFor="featured" className="text-sm">Feature this event</label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={saveNewEvent}>
                    Save Event
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Event Dialog */}
          <Dialog open={!!editingEvent} onOpenChange={(open) => { if (!open) setEditingEvent(null) }}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
              </DialogHeader>
              {editingEvent && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                    <input type="text" value={editingEvent.title} onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea rows={3} value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input type="date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input type="text" value={editingEvent.location} onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Poster URL</label>
                    <input type="url" value={editingEvent.image} onChange={(e) => setEditingEvent({ ...editingEvent, image: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <input id="edit-featured" type="checkbox" checked={!!editingEvent.featured} onChange={(e) => setEditingEvent({ ...editingEvent, featured: e.target.checked })} />
                    <label htmlFor="edit-featured" className="text-sm">Feature this event</label>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setEditingEvent(null)}>Cancel</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={saveEditedEvent}>Save Changes</Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden card-shadow hover-lift">
              <div className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                {event.featured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{event.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {event.category}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="space-y-1 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-3 w-3 mr-1 text-blue-600" />
                    <span className="text-xs">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-3 w-3 mr-1 text-blue-600" />
                    <span className="text-xs">{event.location}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleFeatured(event.id)}
                    className="text-xs"
                  >
                    {event.featured ? 'Unfeature' : 'Feature'}
                  </Button>
                  
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingEvent(event)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
