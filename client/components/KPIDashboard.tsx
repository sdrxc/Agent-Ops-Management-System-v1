import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Bot, Clock, Target, TrendingUp, Zap } from "lucide-react";
import { DashboardMetrics } from "@shared/api";

interface KPIDashboardProps {
  metrics: DashboardMetrics;
}

export function KPIDashboard({ metrics }: KPIDashboardProps) {
  const kpiCards = [
    {
      title: "Total Agents",
      value: metrics.totalAgents,
      icon: Bot,
      description: `${metrics.activeAgents} active`,
      trend: "+12%",
      trendPositive: true,
    },
    {
      title: "Success Rate",
      value: `${metrics.successRate.toFixed(1)}%`,
      icon: Target,
      description: "Test success rate",
      trend: "+5.2%",
      trendPositive: true,
    },
    {
      title: "Avg Performance",
      value: `${metrics.averagePerformance.toFixed(1)}%`,
      icon: Activity,
      description: "Overall performance",
      trend: "+2.1%",
      trendPositive: true,
    },
    {
      title: "Total Tests",
      value: metrics.totalTests.toLocaleString(),
      icon: Zap,
      description: "Tests completed",
      trend: "+18%",
      trendPositive: true,
    },
    {
      title: "Response Time",
      value: `${metrics.averageResponseTime}ms`,
      icon: Clock,
      description: "Average response",
      trend: "-8ms",
      trendPositive: true,
    },
    {
      title: "Uptime",
      value: "99.9%",
      icon: TrendingUp,
      description: "System availability",
      trend: "+0.1%",
      trendPositive: true,
    },
  ];

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpiCards.map((kpi, index) => {
        const IconComponent = kpi.icon;
        return (
          <Card
            key={index}
            className="relative overflow-hidden border-0 shadow-sm bg-white/80 backdrop-blur-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              <div className="p-2 bg-primary/10 rounded-md">
                <IconComponent className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {kpi.value}
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">{kpi.description}</p>
                <div
                  className={`flex items-center text-xs ${
                    kpi.trendPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp
                    className={`h-3 w-3 mr-1 ${
                      kpi.trendPositive ? "" : "rotate-180"
                    }`}
                  />
                  {kpi.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
