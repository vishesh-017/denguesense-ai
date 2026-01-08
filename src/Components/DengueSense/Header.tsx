import { Bug, Bell, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass-effect">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/40 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
            <div className="relative bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Bug className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight flex items-center gap-2">
              DengueSense
              <Sparkles className="h-4 w-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </h1>
            <p className="text-xs text-muted-foreground -mt-0.5">AI-Powered Prevention</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-primary/10 hover:text-primary transition-colors duration-300"
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-accent border-0 animate-pulse">
              3
            </Badge>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-primary/10 hover:text-primary transition-colors duration-300"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};