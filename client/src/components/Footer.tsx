
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Youtube,
  ArrowUp,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Sound System Rental',
    'DJ Services', 
    'Technical Support',
    'Event Planning',
    'Wedding Packages',
    'Corporate Events'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/95 to-accent text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_white_1px,_transparent_1px)] bg-[size:30px_30px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/lovable-uploads/c3321c93-8cd0-4ed0-9569-83336a29543c.png" 
                alt="Trinity Events & Entertainment" 
                className="h-16 w-auto brightness-0 invert transition-transform duration-300 hover:scale-110"
              />
              <div>
                <h3 className="text-2xl font-bold">Trinity Sound</h3>
                <p className="text-primary-foreground/80">Professional Audio Solutions</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/90 leading-relaxed text-lg max-w-md">
              Creating unforgettable experiences with professional sound hire services. 
              Over a decade of excellence in audio solutions for all your events.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-primary-foreground/90 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">+266 63812221 • +266 62545522</p>
                  <p className="text-sm text-primary-foreground/70">24/7 Support Available</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-primary-foreground/90 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">TrinitySound@gmail.com</p>
                  <p className="text-sm text-primary-foreground/70">Quick Response Guaranteed</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-primary-foreground/90 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Kampala, Uganda</p>
                  <p className="text-sm text-primary-foreground/70">Visit Our Showroom</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 group-hover:text-accent transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-in-left">
            <h3 className="font-bold text-xl mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-primary-foreground/80 hover:text-white transition-all duration-300 hover:translate-x-2 block animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-slide-in-right">
            <h3 className="font-bold text-xl mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={service}>
                  <span 
                    className="text-primary-foreground/80 hover:text-white transition-colors duration-300 cursor-pointer block animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-primary-foreground/20 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-bold text-lg mb-2 text-white">Payment Methods</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white/10 px-4 py-2 rounded-lg">
                  <span className="font-medium">ECOCASH:</span> 0000102135
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg">
                  <span className="font-medium">MPESA:</span> 45974
                </div>
              </div>
            </div>
            
            {/* Scroll to Top Button */}
            <Button
              onClick={scrollToTop}
              className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 hover-lift group"
              size="lg"
            >
              <ArrowUp className="h-5 w-5 mr-2 group-hover:-translate-y-1 transition-transform duration-300" />
              Back to Top
            </Button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-primary-foreground/70">
              © 2024 Trinity Events & Entertainment. All rights reserved.
            </p>
            
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>for amazing events</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
