
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  ExternalLink, 
  Calendar,
  MapPin,
  Users,
  Music,
  Heart,
  Briefcase,
  GraduationCap,
  Church,
  Lightbulb,
  Mic
} from 'lucide-react'
import Image from 'next/image'

interface PortfolioItem {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  location?: string
  guests?: string
  date?: string
  featured: boolean
}

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Weddings', 'Corporate', 'Entertainment', 'Outdoor Events', 'Concerts', 'Religious', 'Graduations']
  const [activeCategory, setActiveCategory] = useState('All')

  const iconMap: { [key: string]: any } = {
    'Weddings': Heart,
    'Corporate': Briefcase,
    'Entertainment': Music,
    'Outdoor Events': Users,
    'Concerts': Mic,
    'Religious': Church,
    'Graduations': GraduationCap
  }

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch('/api/portfolio')
      if (response.ok) {
        const data = await response.json()
        setPortfolioItems(data)
      }
    } catch (error) {
      console.error('Error fetching portfolio items:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredImages = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p>Loading portfolio...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle,_theme(colors.accent)_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle,_theme(colors.primary)_1px,_transparent_1px)] bg-[size:15px_15px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Our <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our recent events and professional sound setups that created unforgettable experiences
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover-lift animate-scale-in ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-accent to-primary text-white shadow-lg'
                  : 'hover:bg-accent/10 hover:border-accent'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No portfolio items found for this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((item, index) => {
              const IconComponent = iconMap[item.category] || Music
              return (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <div 
                      className={`group cursor-pointer animate-scale-in ${
                        item.featured ? 'md:col-span-2 lg:col-span-2' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setSelectedImage(item.imageUrl)}
                    >
                      <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift">
                        {/* Featured Badge */}
                        {item.featured && (
                          <div className="absolute top-4 left-4 z-10">
                            <Badge className="bg-gradient-to-r from-accent to-primary text-white">
                              Featured
                            </Badge>
                          </div>
                        )}
                        
                        {/* Main Image */}
                        <div className={`relative ${item.featured ? 'h-80' : 'h-64'}`}>
                          <Image
                            src={item.imageUrl}
                            alt={item.description}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {/* Play Button */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                              <Play className="h-6 w-6 text-white ml-1" />
                            </div>
                          </div>
                          
                          {/* External Link */}
                          <div className="absolute top-4 right-4">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                              <ExternalLink className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="h-4 w-4" />
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                          
                          <h3 className="font-bold text-lg mb-2 line-clamp-1">
                            {item.title}
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs opacity-90">
                            {item.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {item.location}
                              </div>
                            )}
                            {item.guests && (
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {item.guests}
                              </div>
                            )}
                            {item.date && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {item.date}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-4xl p-0 overflow-hidden">
                    <div className="relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.description}
                        width={800}
                        height={600}
                        className="w-full h-auto"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-lg opacity-90 mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          {item.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {item.location}
                            </div>
                          )}
                          {item.guests && (
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {item.guests}
                            </div>
                          )}
                          {item.date && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {item.date}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-12 animate-fade-in">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 text-lg hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover-lift"
          >
            Load More Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
