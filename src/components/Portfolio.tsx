
'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  ExternalLink, 
  MapPin, 
  Users, 
  Calendar,
  Filter,
  Grid,
  List
} from 'lucide-react'

interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  location: string
  guests: string
  date: string
  featured: boolean
}

export default function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Weddings', 'Corporate', 'Concerts', 'Private Events']

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch('/api/portfolio')
      const data = await response.json()
      setPortfolioItems(data)
    } catch (error) {
      console.error('Error fetching portfolio items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  const featuredItems = portfolioItems.filter(item => item.featured)

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading portfolio...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore our recent projects and see how we've helped create memorable 
              experiences for our clients across various event types.
            </p>
          </div>

          {/* Featured Projects */}
          {featuredItems.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredItems.map((item) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-white rounded-full p-3">
                              <ExternalLink className="h-6 w-6 text-purple-600" />
                            </div>
                          </div>
                          <Badge className="absolute top-4 left-4 bg-purple-600 text-white">
                            Featured
                          </Badge>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-purple-600 border-purple-600">
                              {item.category}
                            </Badge>
                            <span className="text-sm text-gray-500">{item.date}</span>
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                          <p className="text-gray-600 mb-4">{item.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{item.guests} guests</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative aspect-square">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Badge className="mb-2">{item.category}</Badge>
                            <h3 className="text-2xl font-bold">{item.title}</h3>
                          </div>
                          <p className="text-gray-600">{item.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-5 w-5 text-purple-600" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-5 w-5 text-purple-600" />
                              <span>{item.guests} guests</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-5 w-5 text-purple-600" />
                              <span>{item.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          )}

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex flex-wrap items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredItems.map((item) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div className={`group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}>
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 aspect-[4/3]' : 'aspect-[4/3]'
                    }`}>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white rounded-full p-2">
                          <ExternalLink className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-purple-600 border-purple-600 text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{item.guests}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative aspect-square">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Badge className="mb-2">{item.category}</Badge>
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5 text-purple-600" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-purple-600" />
                          <span>{item.guests} guests</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-purple-600" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
