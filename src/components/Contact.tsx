import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  Star,
  MessageCircle,
  Calendar
} from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: '',
    event_date: '',
    expected_guests: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          event_type: formData.event_type || null,
          event_date: formData.event_date || null,
          expected_guests: formData.expected_guests || null,
          message: formData.message
        }]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 2 hours."
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        event_type: '',
        event_date: '',
        expected_guests: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+266 63812221", "+266 62545522", "28920432"],
      description: "Get instant quotes over the phone",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["TrinitySound@gmail.com"],
      description: "Send us your event details",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Kampala, Uganda"],
      description: "See our equipment showroom",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Clock,
      title: "Available",
      details: ["24/7 Support", "Same Day Response"],
      description: "We're here when you need us",
      color: "from-orange-500 to-red-600"
    }
  ];

  const paymentMethods = [
    { name: "ECOCASH", number: "0000102135", icon: "💳" },
    { name: "MPESA", number: "45974", icon: "📱" }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-primary/5"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,_theme(colors.accent/0.1)_0%,_transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to make your event unforgettable? Let's discuss your audio needs and create something amazing together
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-card/60 backdrop-blur-sm animate-slide-in-left">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
                  <MessageCircle className="h-8 w-8 text-accent" />
                  Send us a message
                </CardTitle>
                <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 2 hours</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Name *</label>
                      <Input 
                        placeholder="John Doe" 
                        className="h-12 border-2 focus:border-accent transition-colors duration-300"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Email *</label>
                      <Input 
                        placeholder="john@example.com" 
                        type="email"
                        className="h-12 border-2 focus:border-accent transition-colors duration-300"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input 
                        placeholder="+266 12345678"
                        className="h-12 border-2 focus:border-accent transition-colors duration-300"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Type</label>
                      <Input 
                        placeholder="Wedding, Corporate, etc."
                        className="h-12 border-2 focus:border-accent transition-colors duration-300"
                        value={formData.event_type}
                        onChange={(e) => handleInputChange('event_type', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Date</label>
                      <Input 
                        type="date"
                        className="h-12 border-2 focus:border-accent transition-colors duration-300"
                        value={formData.event_date}
                        onChange={(e) => handleInputChange('event_date', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expected Guests</label>
                      <Input 
                        placeholder="e.g., 100-200"
                        className="h-12 border-2 focus:border-accent transition-colors duration-300"
                        value={formData.expected_guests}
                        onChange={(e) => handleInputChange('expected_guests', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Details *</label>
                    <Textarea 
                      placeholder="Tell us about your event requirements, venue details, specific equipment needs, and any special requests..."
                      className="min-h-32 border-2 focus:border-accent transition-colors duration-300 resize-none"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 transition-all duration-300 hover-lift shadow-lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
                
                <div className="text-center text-sm text-muted-foreground">
                  <CheckCircle className="inline h-4 w-4 mr-1 text-green-500" />
                  We respond within 2 hours during business hours
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 animate-slide-in-right">
            {/* Contact Methods */}
            {contactMethods.map((method, index) => (
              <Card 
                key={method.title}
                className="group hover:shadow-xl transition-all duration-300 hover-lift border-0 bg-card/60 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors duration-300">
                        {method.title}
                      </h4>
                      <div className="space-y-1 mb-2">
                        {method.details.map((detail, idx) => (
                          <p key={idx} className="text-foreground font-medium">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Payment Methods */}
            <Card className="border-0 bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  Payment Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.name} className="flex items-center justify-between p-3 bg-card/60 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{method.icon}</span>
                      <span className="font-semibold">{method.name}</span>
                    </div>
                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {method.number}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Response Guarantee */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl p-6 border border-green-200/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-lg">Quick Response Guarantee</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We respond to all inquiries within 2 hours during business hours. 
                For urgent requests, please call us directly for immediate assistance.
              </p>
            </div>

            {/* Book Consultation Button */}
            <Button 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover-lift shadow-lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
