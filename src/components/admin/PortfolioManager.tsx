"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Trash2, Plus } from "lucide-react"

interface PortfolioItem {
  id: string
  title: string
  description?: string
  category?: string
  image_url?: string
  location?: string
  guests?: string
  date?: string
  featured?: boolean
}

export default function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [editing, setEditing] = useState<PortfolioItem | null>(null)
  const [form, setForm] = useState<Partial<PortfolioItem>>({ title: "", description: "", category: "", image_url: "", location: "", guests: "", date: "", featured: false })
  const [uploading, setUploading] = useState(false)

  useEffect(() => { fetchItems() }, [])

  const fetchItems = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/portfolio')
    const json = await res.json()
    if (!res.ok) {
      console.error('Failed to load portfolio', json)
      setLoading(false)
      return
    }
    setItems(json.data || [])
    setLoading(false)
  }

  const saveNew = async () => {
    const tempId = 'temp-' + Date.now()
    const optimistic: PortfolioItem = {
      id: tempId,
      title: form.title || 'Untitled',
      description: form.description || '',
      category: form.category || '',
      image_url: form.image_url || '',
      location: form.location || '',
      guests: form.guests || '',
      date: form.date || '',
      featured: !!form.featured,
    }

    // optimistic update
    setItems((s) => [optimistic, ...s])

    try {
      const payload = {
        title: form.title,
        description: form.description,
        category: form.category,
        image_url: form.image_url,
        location: form.location,
        guests: form.guests,
        date: form.date,
        featured: !!form.featured,
      }

      const res = await fetch('/api/admin/portfolio', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to create')

      // replace temp item with real item
      setItems((s) => s.map((it) => (it.id === tempId ? json.data : it)))
      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Created', description: 'Portfolio item added' }))
    } catch (err: any) {
      console.error(err)
      // revert optimistic
      setItems((s) => s.filter((it) => it.id !== tempId))
      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Error', description: err.message || 'Could not add item', variant: 'destructive' }))
    } finally {
      setIsAdding(false)
      setForm({ title: '', description: '', category: '', image_url: '', location: '', guests: '', date: '', featured: false })
    }
  }

  const saveEdit = async () => {
    if (!editing) return

    // optimistic update
    setItems((s) => s.map((it) => (it.id === editing.id ? editing : it)))

    try {
      const payload: any = { ...editing }
      const res = await fetch('/api/admin/portfolio', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to update')
      setEditing(null)
      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Updated', description: 'Portfolio item updated' }))
      await fetchItems()
    } catch (err: any) {
      console.error(err)
      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Error', description: err.message || 'Could not update item', variant: 'destructive' }))
      await fetchItems()
      setEditing(null)
    }
  }

  const handleDelete = async (id: string) => {
    // optimistic remove
    const previous = items
    setItems((s) => s.filter((it) => it.id !== id))

    try {
      const res = await fetch(`/api/admin/portfolio?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to delete')
      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Deleted', description: 'Portfolio item removed' }))
      await fetchItems()
    } catch (err: any) {
      console.error(err)
      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Error', description: err.message || 'Could not delete item', variant: 'destructive' }))
      // revert
      setItems(previous)
    }
  }

  if (loading) return <Card><CardContent className="p-6 text-center">Loading portfolio...</CardContent></Card>

  return (
    <Card className="card-shadow">
      <CardHeader className="border-b border-gray-200 flex items-center justify-between">
        <CardTitle>Portfolio Management</CardTitle>
        <div className="flex items-center gap-3">
          <Button variant="destructive" onClick={async () => {
            if (!confirm('Remove all portfolio items not posted by admins? This cannot be undone.')) return
            import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Cleaning', description: 'Removing non-admin portfolio items...' }))
            try {
              const res = await fetch('/api/admin/cleanup', { method: 'POST' })
              const json = await res.json()
              if (!res.ok) throw new Error(json?.error || 'Cleanup failed')
              import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Cleanup done', description: `Removed ${json.deletedPortfolio || 0} portfolio items` }))
              await fetchItems()
            } catch (err: any) {
              console.error(err)
              import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Error', description: err.message || 'Cleanup failed', variant: 'destructive' }))
            }
          }}>Remove non-admin items</Button>

          <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700"><Plus className="h-4 w-4 mr-2"/>Add Item</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Add Portfolio Item</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <div className="flex items-center gap-3">
                  <input type="url" value={form.image_url || ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-3 py-2 border" placeholder="https://... or upload a file" />
                  <input type="file" accept="image/*" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    try {
                      const fd = new FormData();
                      fd.append('file', file);
                      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
                      const json = await res.json();
                      if (!res.ok) throw new Error(json?.error || 'Upload failed');
                      setForm({ ...form, image_url: json.url });
                      // show toast
                      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Uploaded', description: 'Image uploaded successfully' }));
                    } catch (err: any) {
                      console.error(err);
                      import('@/hooks/use-toast').then(({ toast }) => toast({ title: 'Upload failed', description: err.message || 'Could not upload', variant: 'destructive' }));
                    } finally { setUploading(false) }
                  }} />
                </div>
                {uploading && <div className="text-sm text-gray-500 mt-2">Uploading...</div>}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={saveNew}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="border rounded overflow-hidden">
              {item.image_url && <div className="relative h-40 w-full"><img src={item.image_url} alt={item.title} className="object-cover w-full h-full"/></div>}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{item.title}</h3>
                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">{item.date} · {item.location}</div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline" onClick={() => setEditing(item)}><Edit className="h-3 w-3"/></Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)} className="text-red-600 hover:bg-red-50"><Trash2 className="h-3 w-3"/></Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit dialog */}
        <Dialog open={!!editing} onOpenChange={(open) => { if (!open) setEditing(null) }}>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Edit Item</DialogTitle></DialogHeader>
            {editing && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-3 py-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input value={editing.image_url || ''} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className="w-full px-3 py-2 border" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={saveEdit}>Save</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
