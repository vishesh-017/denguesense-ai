import { useState } from "react";
import { MapPin, AlertTriangle, CheckCircle2, Navigation, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Hotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  risk: "high" | "medium" | "low";
  cases: number;
  lastReported: string;
}

const mockHotspots: Hotspot[] = [
  { id: "1", name: "Sector 21 - Construction Site", lat: 23.0225, lng: 72.5714, risk: "high", cases: 12, lastReported: "2 hours ago" },
  { id: "2", name: "Old City Market", lat: 23.0300, lng: 72.5800, risk: "high", cases: 8, lastReported: "5 hours ago" },
  { id: "3", name: "Industrial Zone - Factory Area", lat: 23.0150, lng: 72.5600, risk: "medium", cases: 5, lastReported: "1 day ago" },
  { id: "4", name: "Green Park - Near Lake", lat: 23.0400, lng: 72.5500, risk: "medium", cases: 3, lastReported: "2 days ago" },
  { id: "5", name: "Residential Block C", lat: 23.0100, lng: 72.5900, risk: "low", cases: 1, lastReported: "3 days ago" },
];

export const HotspotMap = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const filteredHotspots = filter === "all" 
    ? mockHotspots 
    : mockHotspots.filter(h => h.risk === filter);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted";
    }
  };

  const getRiskBorderColor = (risk: string) => {
    switch (risk) {
      case "high": return "border-destructive/50";
      case "medium": return "border-warning/50";
      case "low": return "border-success/50";
      default: return "border-border";
    }
  };

  return (
    <div className="space-y-5">
      {/* Header with filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Dengue Hotspot Map
          </h3>
          <p className="text-sm text-muted-foreground">Real-time breeding site locations</p>
        </div>
        <div className="flex gap-2">
          {["all", "high", "medium", "low"].map((level) => (
            <Button
              key={level}
              variant={filter === level ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(level as typeof filter)}
              className={filter === level ? "" : "opacity-70"}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Map Placeholder with Hotspots */}
      <Card className="overflow-hidden">
        <div className="relative h-[400px] bg-gradient-to-br from-primary/5 via-muted to-accent/5">
          {/* Map background pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300897B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          
          {/* Simulated Map */}
          <div className="absolute inset-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
              {[...Array(64)].map((_, i) => (
                <div key={i} className="border border-border/10" />
              ))}
            </div>

            {/* Hotspot markers */}
            {filteredHotspots.map((hotspot, index) => {
              // Simulated positions based on index
              const positions = [
                { top: "20%", left: "30%" },
                { top: "35%", left: "65%" },
                { top: "55%", left: "25%" },
                { top: "70%", left: "55%" },
                { top: "45%", left: "80%" },
              ];
              const pos = positions[index % positions.length];

              return (
                <button
                  key={hotspot.id}
                  onClick={() => setSelectedHotspot(hotspot)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 ${
                    selectedHotspot?.id === hotspot.id ? "scale-125 z-10" : ""
                  }`}
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div className={`relative`}>
                    {/* Pulse animation for high risk */}
                    {hotspot.risk === "high" && (
                      <div className="absolute inset-0 rounded-full bg-destructive animate-ping opacity-30" style={{ width: "40px", height: "40px", marginLeft: "-8px", marginTop: "-8px" }} />
                    )}
                    <div className={`p-2 rounded-full shadow-lg ${getRiskColor(hotspot.risk)}`}>
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-xs font-bold bg-background rounded-full w-5 h-5 flex items-center justify-center border shadow">
                      {hotspot.cases}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 p-3 bg-card/90 backdrop-blur-sm rounded-lg border shadow-lg">
              <div className="flex items-center gap-2 mb-2 text-xs font-medium">
                <Layers className="h-3 w-3" />
                Risk Levels
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive" />
                  High Risk
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-warning" />
                  Medium Risk
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-success" />
                  Low Risk
                </div>
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button size="icon" variant="secondary" className="shadow-lg">
                <Navigation className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Selected hotspot info */}
          {selectedHotspot && (
            <Card className={`absolute bottom-4 right-4 w-64 shadow-2xl animate-in slide-in-from-right-4 ${getRiskBorderColor(selectedHotspot.risk)} border-2`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  {selectedHotspot.risk === "high" ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : (
                    <MapPin className="h-4 w-4 text-primary" />
                  )}
                  {selectedHotspot.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Risk Level</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskColor(selectedHotspot.risk)}`}>
                    {selectedHotspot.risk.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cases Reported</span>
                  <span className="font-bold">{selectedHotspot.cases}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Report</span>
                  <span className="text-xs">{selectedHotspot.lastReported}</span>
                </div>
                <Button size="sm" className="w-full mt-2 gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Mark as Cleared
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </Card>

      {/* Hotspots List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredHotspots.map((hotspot) => (
          <Card 
            key={hotspot.id} 
            className={`hover-lift cursor-pointer ${getRiskBorderColor(hotspot.risk)} ${
              selectedHotspot?.id === hotspot.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedHotspot(hotspot)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-sm">{hotspot.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {hotspot.cases} cases • {hotspot.lastReported}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(hotspot.risk)}`}>
                  {hotspot.risk.toUpperCase()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
