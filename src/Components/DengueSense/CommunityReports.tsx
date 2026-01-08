import { useState } from "react";
import { FileText, MapPin, AlertTriangle, Send, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  type: "breeding_site" | "suspected_case" | "cleanup_done";
  location: string;
  description: string;
  status: "pending" | "verified" | "resolved";
  timestamp: Date;
}

const mockReports: Report[] = [
  {
    id: "1",
    type: "breeding_site",
    location: "Sector 21, Near Park",
    description: "Stagnant water in construction site",
    status: "verified",
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    id: "2",
    type: "suspected_case",
    location: "Block B, Apartment 405",
    description: "Neighbor showing dengue symptoms",
    status: "pending",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "3",
    type: "cleanup_done",
    location: "Community Garden",
    description: "Cleared all water containers",
    status: "resolved",
    timestamp: new Date(Date.now() - 7200000),
  },
];

export const CommunityReports = () => {
  const [reports] = useState<Report[]>(mockReports);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "breeding_site",
    location: "",
    description: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report Submitted!",
      description: "Thank you for helping protect your community.",
    });
    setShowForm(false);
    setFormData({ type: "breeding_site", location: "", description: "" });
  };

  const getStatusBadge = (status: Report["status"]) => {
    const styles = {
      pending: "bg-warning/20 text-warning",
      verified: "bg-primary/20 text-primary",
      resolved: "bg-success/20 text-success",
    };
    const icons = {
      pending: <Clock className="h-3 w-3" />,
      verified: <AlertTriangle className="h-3 w-3" />,
      resolved: <CheckCircle2 className="h-3 w-3" />,
    };
    return (
      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeIcon = (type: Report["type"]) => {
    const icons = {
      breeding_site: <AlertTriangle className="h-4 w-4 text-destructive" />,
      suspected_case: <FileText className="h-4 w-4 text-warning" />,
      cleanup_done: <CheckCircle2 className="h-4 w-4 text-success" />,
    };
    return icons[type];
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Community Reports</h3>
          <p className="text-sm text-muted-foreground">Recent reports from your area</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          <FileText className="h-4 w-4" />
          New Report
        </Button>
      </div>

      {/* Report Form */}
      {showForm && (
        <Card className="border-primary/20 animate-in slide-in-from-top-2 duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Submit Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Report Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-2 rounded-lg bg-muted border-none text-sm"
                >
                  <option value="breeding_site">Breeding Site Found</option>
                  <option value="suspected_case">Suspected Dengue Case</option>
                  <option value="cleanup_done">Cleanup Completed</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter location or address"
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border-none text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what you observed..."
                  className="w-full p-3 rounded-lg bg-muted border-none text-sm min-h-[80px] resize-none"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 gap-2">
                  <Send className="h-4 w-4" />
                  Submit Report
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reports List */}
      <div className="space-y-3">
        {reports.map((report) => (
          <Card key={report.id} className="hover-lift group">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg group-hover:scale-110 transition-transform">
                  {getTypeIcon(report.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{report.location}</h4>
                    {getStatusBadge(report.status)}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {report.timestamp.toLocaleDateString()} at{" "}
                    {report.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
