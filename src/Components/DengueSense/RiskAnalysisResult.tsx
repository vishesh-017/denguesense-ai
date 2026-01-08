import { AlertTriangle, CheckCircle, Shield, Bug, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export type RiskLevel = "high" | "medium" | "low" | null;

interface RiskAnalysisResultProps {
  imagePreview: string | null;
  riskLevel: RiskLevel;
  confidence: number;
  detectedIssues: string[];
  isAnalyzing: boolean;
}

const riskConfig = {
  high: {
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/30",
    glowColor: "shadow-destructive/20",
    icon: AlertTriangle,
    label: "High Risk",
    description: "Immediate action required",
  },
  medium: {
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
    glowColor: "shadow-warning/20",
    icon: Shield,
    label: "Medium Risk",
    description: "Preventive measures recommended",
  },
  low: {
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
    glowColor: "shadow-success/20",
    icon: CheckCircle,
    label: "Low Risk",
    description: "Continue monitoring",
  },
};

export const RiskAnalysisResult = ({
  imagePreview,
  riskLevel,
  confidence,
  detectedIssues,
  isAnalyzing,
}: RiskAnalysisResultProps) => {
  if (!imagePreview) return null;

  const config = riskLevel ? riskConfig[riskLevel] : null;
  const Icon = config?.icon;

  return (
    <Card className="overflow-hidden hover-lift">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image Preview */}
        <div className="relative aspect-video md:aspect-auto min-h-[250px]">
          <img
            src={imagePreview}
            alt="Uploaded site"
            className="w-full h-full object-cover"
          />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-ping" />
                  <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-full">
                    <Bug className="h-8 w-8 text-primary-foreground animate-pulse" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-accent animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-lg">Analyzing image...</p>
                  <p className="text-sm text-muted-foreground">AI scanning for breeding sites</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="p-6 bg-card">
          {config && Icon && !isAnalyzing ? (
            <div className="space-y-5 animate-in fade-in duration-500">
              <div className={cn("flex items-center gap-4 p-4 rounded-xl border shadow-lg", config.bgColor, config.borderColor, config.glowColor)}>
                <div className={cn("p-3 rounded-xl", config.bgColor)}>
                  <Icon className={cn("h-7 w-7", config.color)} />
                </div>
                <div>
                  <Badge
                    variant="outline"
                    className={cn("font-bold text-sm px-3 py-1", config.color, config.borderColor)}
                  >
                    {config.label}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    {config.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">AI Confidence</span>
                  <span className="font-bold text-primary">{confidence}%</span>
                </div>
                <div className="relative">
                  <Progress value={confidence} className="h-3 rounded-full" />
                  <div 
                    className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-primary to-accent opacity-50 blur-sm"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>

              {detectedIssues.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Detected Issues:</p>
                  <ul className="space-y-2">
                    {detectedIssues.map((issue, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-center gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200"
                      >
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : !isAnalyzing ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <p>Awaiting analysis...</p>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
};