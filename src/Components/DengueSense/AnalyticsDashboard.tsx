import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, MapPin, Users, AlertTriangle } from "lucide-react";

const weeklyData = [
  { name: "Mon", cases: 12, sites: 8 },
  { name: "Tue", cases: 19, sites: 12 },
  { name: "Wed", cases: 15, sites: 10 },
  { name: "Thu", cases: 8, sites: 15 },
  { name: "Fri", cases: 10, sites: 18 },
  { name: "Sat", cases: 6, sites: 22 },
  { name: "Sun", cases: 4, sites: 25 },
];

const monthlyTrend = [
  { month: "Jan", cases: 120 },
  { month: "Feb", cases: 98 },
  { month: "Mar", cases: 145 },
  { month: "Apr", cases: 210 },
  { month: "May", cases: 180 },
  { month: "Jun", cases: 95 },
];

const riskDistribution = [
  { name: "High Risk", value: 15, color: "hsl(var(--destructive))" },
  { name: "Medium Risk", value: 35, color: "hsl(var(--warning))" },
  { name: "Low Risk", value: 50, color: "hsl(var(--success))" },
];

const hotspots = [
  { area: "Sector 21", cases: 23, trend: "up" },
  { area: "Old City", cases: 18, trend: "down" },
  { area: "Industrial Zone", cases: 15, trend: "up" },
  { area: "Green Park", cases: 8, trend: "down" },
];

export const AnalyticsDashboard = () => {
  return (
    <div className="space-y-5">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-xs text-muted-foreground">Active Cases</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <TrendingDown className="h-3 w-3" />
              <span>12% vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <MapPin className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Sites Identified</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
              <TrendingUp className="h-3 w-3" />
              <span>8% vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Activity className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-xs text-muted-foreground">Sites Cleared</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>23% vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">1.2K</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-success">
              <TrendingUp className="h-3 w-3" />
              <span>45% vs last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Weekly Trend */}
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="casesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sitesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area type="monotone" dataKey="cases" stroke="hsl(var(--destructive))" fill="url(#casesGradient)" strokeWidth={2} />
                  <Area type="monotone" dataKey="sites" stroke="hsl(var(--primary))" fill="url(#sitesGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-destructive" />
                Cases
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-primary" />
                Sites Found
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Risk Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-xs">
              {riskDistribution.map((item) => (
                <span key={item.name} className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend & Hotspots */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Monthly Cases */}
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Monthly Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrend}>
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="cases" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hotspots */}
        <Card className="hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-destructive" />
              Hotspot Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hotspots.map((spot, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-6 h-6 flex items-center justify-center bg-primary/10 rounded-full text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{spot.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{spot.cases}</span>
                    {spot.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-destructive" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
