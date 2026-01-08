import { TrendingUp, MapPin, Heart, Users, Target, Award, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ImpactStats {
  sitesFound: number;
  communitySitesEliminated: number;
  livesSaved: number;
  userRank: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface ImpactDashboardProps {
  stats: ImpactStats;
}

export const ImpactDashboard = ({ stats }: ImpactDashboardProps) => {
  return (
    <div className="space-y-5">
      {/* Personal Impact */}
      <Card className="bg-gradient-to-br from-primary/15 via-card to-accent/10 border-primary/20 hover-lift overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Award className="h-5 w-5 text-primary" />
            </div>
            Your Impact
            <Sparkles className="h-4 w-4 text-accent ml-auto" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2 p-4 rounded-xl bg-card/50 hover:bg-card transition-colors duration-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground font-medium">Sites Found</span>
              </div>
              <p className="text-4xl font-bold text-gradient">{stats.sitesFound}</p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-card/50 hover:bg-card transition-colors duration-300">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground font-medium">Your Rank</span>
              </div>
              <p className="text-4xl font-bold">#{stats.userRank}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-muted-foreground font-medium">Weekly Goal Progress</span>
              <span className="font-bold text-primary">{stats.weeklyProgress}/{stats.weeklyGoal} sites</span>
            </div>
            <div className="relative">
              <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-3 rounded-full" />
              <div 
                className="absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r from-primary to-accent opacity-40 blur-sm"
                style={{ width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Stats */}
      <div className="grid grid-cols-2 gap-5">
        <Card className="hover-lift group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-success/10 rounded-2xl group-hover:bg-success/20 group-hover:scale-110 transition-all duration-300">
                <Users className="h-7 w-7 text-success" />
              </div>
              <div>
                <p className="text-3xl font-bold">{stats.communitySitesEliminated}</p>
                <p className="text-sm text-muted-foreground">Sites Eliminated</p>
                <p className="text-xs text-success font-semibold mt-1">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift group overflow-hidden relative bg-gradient-to-br from-success/10 to-card">
          <div className="absolute top-0 right-0 w-20 h-20 bg-success/20 rounded-full blur-2xl" />
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-success/10 rounded-2xl group-hover:bg-success/20 group-hover:scale-110 transition-all duration-300">
                <Heart className="h-7 w-7 text-success" />
              </div>
              <div>
                <p className="text-3xl font-bold text-success">~{stats.livesSaved}</p>
                <p className="text-sm text-muted-foreground">Cases Prevented</p>
                <p className="text-xs text-success font-semibold mt-1">Lives Saved ❤️</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending */}
      <Card className="hover-lift group">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg">Community Trend</p>
                <p className="text-sm text-muted-foreground">23% decrease in breeding sites</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-success font-bold text-lg">23%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};