import { Lightbulb, Droplets, Trash2, Shield, Phone, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RiskLevel } from "./RiskAnalysisResult";

interface PersonalizedAdviceProps {
  riskLevel: RiskLevel;
}

const adviceByRisk = {
  high: [
    {
      icon: Trash2,
      title: "Immediate Removal Required",
      description: "Empty all water containers within 24 hours. This breeding site can produce hundreds of mosquitoes.",
      priority: "urgent",
    },
    {
      icon: Phone,
      title: "Report to Authorities",
      description: "Contact your local health department for professional fumigation and area treatment.",
      priority: "urgent",
    },
    {
      icon: Shield,
      title: "Personal Protection",
      description: "Use mosquito repellent and wear long sleeves until the area is treated.",
      priority: "high",
    },
    {
      icon: Users,
      title: "Alert Neighbors",
      description: "Inform nearby residents to check their properties for similar breeding sites.",
      priority: "high",
    },
  ],
  medium: [
    {
      icon: Droplets,
      title: "Drain Standing Water",
      description: "Remove stagnant water from flower pots, buckets, and containers within 48 hours.",
      priority: "medium",
    },
    {
      icon: Shield,
      title: "Apply Larvicide",
      description: "Use BTI tablets in water storage containers that cannot be emptied.",
      priority: "medium",
    },
    {
      icon: Lightbulb,
      title: "Cover Water Storage",
      description: "Install tight-fitting covers on water tanks and containers.",
      priority: "medium",
    },
  ],
  low: [
    {
      icon: Lightbulb,
      title: "Maintain Vigilance",
      description: "Continue regular inspection of your surroundings weekly.",
      priority: "low",
    },
    {
      icon: Droplets,
      title: "Preventive Measures",
      description: "Ensure proper drainage and avoid water accumulation after rain.",
      priority: "low",
    },
  ],
};

const priorityStyles = {
  urgent: "border-destructive/40 bg-destructive/5 hover:bg-destructive/10 hover:border-destructive/60",
  high: "border-warning/40 bg-warning/5 hover:bg-warning/10 hover:border-warning/60",
  medium: "border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60",
  low: "border-success/40 bg-success/5 hover:bg-success/10 hover:border-success/60",
};

const priorityIconColors = {
  urgent: "text-destructive bg-destructive/10",
  high: "text-warning bg-warning/10",
  medium: "text-primary bg-primary/10",
  low: "text-success bg-success/10",
};

export const PersonalizedAdvice = ({ riskLevel }: PersonalizedAdviceProps) => {
  if (!riskLevel) return null;

  const advice = adviceByRisk[riskLevel];

  return (
    <Card className="hover-lift overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          Personalized Action Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {advice.map((item, i) => {
            const Icon = item.icon;
            const priority = item.priority as keyof typeof priorityStyles;
            return (
              <div
                key={i}
                className={`p-5 rounded-xl border-2 transition-all duration-300 cursor-default group ${priorityStyles[priority]}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 ${priorityIconColors[priority]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {riskLevel === "high" && (
          <div className="mt-6 flex gap-4">
            <Button className="flex-1 gap-2 bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive shadow-lg hover:shadow-xl hover:shadow-destructive/25 transition-all duration-300 hover:-translate-y-0.5" size="lg">
              <Phone className="h-4 w-4" />
              Report to Health Authority
            </Button>
            <Button variant="outline" className="flex-1 gap-2 border-2 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300 hover:-translate-y-0.5" size="lg">
              <Users className="h-4 w-4" />
              Share with Community
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};