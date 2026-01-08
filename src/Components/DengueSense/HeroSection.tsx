import { Shield, Zap, Users, ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 gradient-hero">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="text-center space-y-6 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
          <Zap className="h-4 w-4" />
          Powered by Azure AI Vision
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
          Protect Your Community from{" "}
          <span className="text-gradient">
            Dengue
          </span>
        </h2>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Upload photos of potential breeding sites and get instant AI-powered risk assessment
          with personalized prevention advice.
        </p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-6">
          {[
            { icon: Zap, text: "Instant AI Analysis", color: "primary" },
            { icon: Shield, text: "Personalized Advice", color: "success" },
            { icon: Users, text: "Community Impact", color: "accent" },
          ].map((item, i) => (
            <div 
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border/50 shadow-sm hover-lift cursor-default group"
            >
              <div className={`p-2 rounded-lg bg-${item.color}/10 group-hover:bg-${item.color}/20 transition-colors duration-300`}>
                <item.icon className={`h-5 w-5 text-${item.color}`} />
              </div>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
};