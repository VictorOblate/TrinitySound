
import { Award, Users, Clock, Headphones } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Expert Team",
      description: "Professional technicians with years of experience"
    },
    {
      icon: Users,
      title: "500+ Events",
      description: "Successfully delivered across all event types"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock technical assistance"
    },
    {
      icon: Headphones,
      title: "Premium Equipment",
      description: "Top-quality sound systems and equipment"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_theme(colors.accent)_0%,_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_theme(colors.primary)_0%,_transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              About <span className="text-gradient">Trinity Sound</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transforming events with professional audio solutions that create unforgettable experiences
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-foreground">
                  Decade of Excellence in Sound
                </h3>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Trinity Events & Entertainment has been the premier choice for professional sound hire services 
                  across Uganda for over a decade. We specialize in delivering crystal-clear audio 
                  solutions that elevate every moment of your special events.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our team of experienced technicians and state-of-the-art equipment ensure your event 
                  runs flawlessly. From intimate gatherings to large corporate functions, we bring 
                  the perfect sound experience to life.
                </p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-6">
                <div className="group">
                  <div className="bg-gradient-to-br from-accent to-primary text-white p-6 rounded-2xl hover-lift transition-all duration-300 group-hover:shadow-xl">
                    <div className="text-4xl font-black mb-2">500+</div>
                    <div className="text-sm opacity-90">Events Completed</div>
                  </div>
                </div>
                <div className="group">
                  <div className="bg-gradient-to-br from-primary to-accent text-white p-6 rounded-2xl hover-lift transition-all duration-300 group-hover:shadow-xl">
                    <div className="text-4xl font-black mb-2">10+</div>
                    <div className="text-sm opacity-90">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Side */}
            <div className="animate-slide-in-right">
              <div className="relative">
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl hover-lift transition-all duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop"
                    alt="Professional Sound Equipment"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 cursor-pointer group">
                      <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1 group-hover:scale-110 transition-transform duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Card */}
                <div className="absolute -bottom-8 -left-8 bg-card border border-border rounded-2xl p-6 shadow-xl glass-effect animate-bounce-in">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">Certified</div>
                      <div className="text-sm text-muted-foreground">Professional</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
