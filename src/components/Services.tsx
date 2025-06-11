
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Volume2, 
  Mic, 
  Settings, 
  Calendar,
  CheckCircle,
  Star,
  ArrowRight,
  Users,
  Music,
  Headphones
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Volume2,
      title: 'Sound System Rental',
      description: 'Professional-grade speakers, amplifiers, and mixing equipment for events of any size.',
      features: ['High-quality speakers', 'Professional mixing boards', 'Wireless microphones', 'Setup included'],
      price: 'From $50/day',
      popular: false
    },
    {
      icon: Mic,
      title: 'DJ Services',
      description: 'Experienced DJs with extensive music libraries for weddings, parties, and corporate events.',
      features: ['Professional DJs', 'Extensive music library', 'Custom playlists', 'MC services available'],
      price: 'From $100/event',
      popular: true
    },
    {
      icon: Settings,
      title: 'Technical Support',
      description: 'On-site technical support throughout your event to ensure everything runs smoothly.',
      features: ['On-site technicians', '24/7 support', 'Equipment maintenance', 'Troubleshooting'],
      price: 'From $30/hour',
      popular: false
    },
    {
      icon: Calendar,
      title: 'Event Planning',
      description: 'Complete event planning services from concept to execution.',
      features: ['Event coordination', 'Venue selection', 'Vendor management', 'Timeline planning'],
      price: 'Custom Quote',
      popular: false
    }
  ];

  const additionalServices = [
    { icon: Users, title: 'Corporate Events', description: 'Professional sound for meetings and conferences' },
    { icon: Music, title: 'Wedding Services', description: 'Complete audio solutions for your special day' },
    { icon: Headphones, title: 'Live Performances', description: 'Concert-grade equipment for live shows' }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-accent/5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive audio solutions and event services tailored to your specific needs
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover-lift animate-scale-in ${
                service.popular ? 'ring-2 ring-accent border-accent' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-accent to-primary text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  <Star className="inline w-3 h-3 mr-1" />
                  POPULAR
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Features List */}
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Price */}
                <div className="pt-4 border-t border-border">
                  <div className="text-2xl font-bold text-gradient mb-4">{service.price}</div>
                  <Button 
                    className="w-full group/btn bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 transition-all duration-300"
                  >
                    Get Quote
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {additionalServices.map((service, index) => (
            <div 
              key={service.title}
              className="group bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-card transition-all duration-300 hover-lift animate-slide-up"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center group-hover:from-accent group-hover:to-primary transition-all duration-300">
                  <service.icon className="h-6 w-6 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-bold text-lg group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offers Section */}
        <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-3xl p-8 text-center animate-bounce-in">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-gradient">Special Offers</h3>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border hover-lift transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-lg">Anniversary Packages</h4>
                </div>
                <p className="text-muted-foreground">
                  FREE sound equipment for your anniversary celebration when you book wedding functions with us!
                </p>
              </div>
              
              <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border hover-lift transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-lg">Payment Options</h4>
                </div>
                <div className="text-muted-foreground space-y-1">
                  <p><strong>ECOCASH:</strong> 0000102135</p>
                  <p><strong>MPESA:</strong> 45974</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
