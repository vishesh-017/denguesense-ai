import { useState } from "react";
import { Header } from "@/components/DengueSense/Header";
import { HeroSection } from "@/components/DengueSense/HeroSection";
import { ImageUploader } from "@/components/DengueSense/ImageUploader";
import { RiskAnalysisResult, RiskLevel } from "@/components/DengueSense/RiskAnalysisResult";
import { PersonalizedAdvice } from "@/components/DengueSense/PersonalizedAdvice";
import { ImpactDashboard } from "@/components/DengueSense/ImpactDashboard";
import { HealthAssistant } from "@/components/DengueSense/HealthAssistant";
import { CommunityReports } from "@/components/DengueSense/CommunityReports";
import { AnalyticsDashboard } from "@/components/DengueSense/AnalyticsDashboard";
import { HotspotMap } from "@/components/DengueSense/HotspotMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, BarChart3, FileText, MapPin, Activity } from "lucide-react";

const Index = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(null);
  const [confidence, setConfidence] = useState(0);
  const [detectedIssues, setDetectedIssues] = useState<string[]>([]);

  // Mock stats - will be replaced with real data from Azure
  const impactStats = {
    sitesFound: 5,
    communitySitesEliminated: 47,
    livesSaved: 15,
    userRank: 12,
    weeklyGoal: 10,
    weeklyProgress: 5,
  };

  const handleImageUpload = async (file: File, preview: string) => {
    setImagePreview(preview);
    setIsAnalyzing(true);
    setRiskLevel(null);

    // Simulate AI analysis - will be replaced with Azure AI call
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Mock result based on random for demo
    const risks: RiskLevel[] = ["high", "medium", "low"];
    const mockRisk = risks[Math.floor(Math.random() * risks.length)];
    
    const issuesByRisk = {
      high: [
        "Stagnant water detected",
        "Open container identified",
        "Multiple potential larvae sites",
        "Near residential area",
      ],
      medium: [
        "Small water accumulation",
        "Partially covered container",
        "Moderate risk environment",
      ],
      low: [
        "Minimal water presence",
        "Well-maintained area",
      ],
    };

    setRiskLevel(mockRisk);
    setConfidence(Math.floor(Math.random() * 15) + 85);
    setDetectedIssues(mockRisk ? issuesByRisk[mockRisk] : []);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pb-12">
        <HeroSection />

        <Tabs defaultValue="scan" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8 p-1.5 bg-muted/50 rounded-xl">
            <TabsTrigger 
              value="scan" 
              className="gap-1.5 text-xs sm:text-sm data-[state=active]:bg-card data-[state=active]:shadow-lg data-[state=active]:text-primary rounded-lg transition-all duration-300"
            >
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Scan</span>
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              className="gap-1.5 text-xs sm:text-sm data-[state=active]:bg-card data-[state=active]:shadow-lg data-[state=active]:text-primary rounded-lg transition-all duration-300"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Map</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="gap-1.5 text-xs sm:text-sm data-[state=active]:bg-card data-[state=active]:shadow-lg data-[state=active]:text-primary rounded-lg transition-all duration-300"
            >
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reports" 
              className="gap-1.5 text-xs sm:text-sm data-[state=active]:bg-card data-[state=active]:shadow-lg data-[state=active]:text-primary rounded-lg transition-all duration-300"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
            <TabsTrigger 
              value="impact" 
              className="gap-1.5 text-xs sm:text-sm data-[state=active]:bg-card data-[state=active]:shadow-lg data-[state=active]:text-primary rounded-lg transition-all duration-300"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Impact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-8 animate-in fade-in duration-500">
            <ImageUploader onImageUpload={handleImageUpload} isAnalyzing={isAnalyzing} />
            
            <RiskAnalysisResult
              imagePreview={imagePreview}
              riskLevel={riskLevel}
              confidence={confidence}
              detectedIssues={detectedIssues}
              isAnalyzing={isAnalyzing}
            />

            <PersonalizedAdvice riskLevel={riskLevel} />
          </TabsContent>

          <TabsContent value="map" className="animate-in fade-in duration-500">
            <HotspotMap />
          </TabsContent>

          <TabsContent value="analytics" className="animate-in fade-in duration-500">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="reports" className="animate-in fade-in duration-500">
            <CommunityReports />
          </TabsContent>

          <TabsContent value="impact" className="animate-in fade-in duration-500">
            <ImpactDashboard stats={impactStats} />
          </TabsContent>
        </Tabs>
      </main>

      {/* AI Health Assistant */}
      <HealthAssistant />

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>DengueSense AI — Powered by Azure AI Vision</p>
          <p className="mt-1">Built for Microsoft AI Classroom Hackathon 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
