
import { Button } from '@/components/ui/button';
import { Play, Mic, Music, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Floating Orbs */}
      <div className="absolute inset-0 floating-orbs"></div>
      
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Main Heading with Gradient Text */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight">
            <span className="text-gradient">SOUND</span>
            <br />
            <span className="text-foreground">HIRE!</span>
          </h1>
          
          {/* Animated Subtitle */}
          <div className="flex items-center justify-center gap-2 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Music className="h-6 w-6 text-accent animate-pulse-slow" />
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Professional audio equipment rental for all your events
            </p>
            <Mic className="h-6 w-6 text-accent animate-pulse-slow" />
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up mb-12" style={{ animationDelay: '0.6s' }}>
            <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 transition-all duration-300 hover-lift animate-glow">
              <Play className="mr-2 h-5 w-5" />
              Get Quote
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-accent/10 transition-all duration-300 hover-lift glass-effect">
              <Users className="mr-2 h-5 w-5" />
              View Services
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-bounce-in" style={{ animationDelay: '0.9s' }}>
            {[
              { number: '500+', label: 'Events' },
              { number: '10+', label: 'Years' },
              { number: '24/7', label: 'Support' },
              { number: '100%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card/80 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-scale-in" style={{ animationDelay: '1.5s' }}>
          {[
            { name: 'Graduations', icon: '🎓' },
            { name: 'Office Meetings', icon: '💼' },
            { name: 'Weddings', icon: '💒' },
            { name: 'Corporate Events', icon: '🏢' },
            { name: 'Birthday Parties', icon: '🎉' },
            { name: 'House Warming', icon: '🏠' },
            { name: 'Church Services', icon: '⛪' },
            { name: 'Outdoor Events', icon: '🌳' }
          ].map((service, index) => (
            <div
              key={service.name}
              className="group bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 hover:bg-card/80 transition-all duration-300 hover-lift cursor-pointer"
              style={{ animationDelay: `${1.8 + index * 0.1}s` }}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <p className="font-medium text-sm md:text-base group-hover:text-accent transition-colors duration-300">
                {service.name}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
