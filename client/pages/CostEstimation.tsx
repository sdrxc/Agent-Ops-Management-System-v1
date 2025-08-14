import { Layout } from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  Download,
  Plus,
  Search,
  TrendingUp,
  Server,
  Settings,
  AlertTriangle,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
} from "lucide-react";
import { useState } from "react";
import ReactECharts from "echarts-for-react";
import {
  costOverTimeData,
  stackedCostData,
  costByEntityData,
  costSplitData,
  usageHeatmapData,
} from "@/lib/chart-data";

interface CostEntry {
  id: string;
  name: string;
  type: "Agent" | "Tool" | "Server";
  estimatedCost: number;
  usageHours: number;
  costPerUnit: number;
  lastRun: string;
  status: "active" | "inactive";
  breakdown: string;
}

const costData: CostEntry[] = [
  {
    id: "1",
    name: "Agent A",
    type: "Agent",
    estimatedCost: 300,
    usageHours: 12,
    costPerUnit: 25,
    lastRun: "2025-08-06",
    status: "active",
    breakdown: "12 runs x ₹25",
  },
  {
    id: "2",
    name: "Tool X",
    type: "Tool",
    estimatedCost: 200,
    usageHours: 8,
    costPerUnit: 25,
    lastRun: "2025-08-05",
    status: "active",
    breakdown: "8 runs x ₹25",
  },
  {
    id: "3",
    name: "Server 1",
    type: "Server",
    estimatedCost: 100,
    usageHours: 24,
    costPerUnit: 4,
    lastRun: "2025-08-07",
    status: "inactive",
    breakdown: "24 hrs x ₹4",
  },
  {
    id: "4",
    name: "Agent B",
    type: "Agent",
    estimatedCost: 300,
    usageHours: 10,
    costPerUnit: 30,
    lastRun: "2025-08-04",
    status: "active",
    breakdown: "10 runs x ₹30",
  },
  {
    id: "5",
    name: "Tool Y",
    type: "Tool",
    estimatedCost: 0,
    usageHours: 7,
    costPerUnit: 28.5,
    lastRun: "2025-08-03",
    status: "inactive",
    breakdown: "7 runs x ₹28.5",
  },
];

export default function CostEstimation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntityType, setSelectedEntityType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 days");

  const filteredData = costData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedEntityType === "All" || item.type === selectedEntityType;
    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalEstimatedCost = costData.reduce(
    (sum, item) => sum + item.estimatedCost,
    0,
  );
  const agentCost = costData
    .filter((item) => item.type === "Agent")
    .reduce((sum, item) => sum + item.estimatedCost, 0);
  const toolCost = costData
    .filter((item) => item.type === "Tool")
    .reduce((sum, item) => sum + item.estimatedCost, 0);
  const serverCost = costData
    .filter((item) => item.type === "Server")
    .reduce((sum, item) => sum + item.estimatedCost, 0);
  const remainingBudget = 2000 - totalEstimatedCost;

  // Chart options for responsive behavior
  const chartOptions = {
    renderer: "canvas" as const,
    style: { height: "100%", width: "100%" },
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Cost & Billing Management System
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor, analyze, and optimize your agent, tool, and server costs
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4" />
              Create Budget
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Estimated Cost
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ₹{totalEstimatedCost}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Agent Cost
              </CardTitle>
              <Activity className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                ₹{agentCost}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tool Usage Cost
              </CardTitle>
              <Settings className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                ₹{toolCost}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Server Uptime Cost
              </CardTitle>
              <Server className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{serverCost}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Remaining Budget
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-700">
                ₹{remainingBudget}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Over Time Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Cost Over Time
              </CardTitle>
              <CardDescription>
                Cost trends with forecast projections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ReactECharts option={costOverTimeData} {...chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Stacked Cost by Entity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-500" />
                Stacked Cost by Entity
              </CardTitle>
              <CardDescription>
                Cumulative cost breakdown by service type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ReactECharts option={stackedCostData} {...chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Cost by Entity Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                Cost by Entity (Bar)
              </CardTitle>
              <CardDescription>
                Individual entity cost comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ReactECharts option={costByEntityData} {...chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Cost Split Donut Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="h-5 w-5 text-orange-500" />
                Cost Split (Donut)
              </CardTitle>
              <CardDescription>Proportional cost distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ReactECharts option={costSplitData} {...chartOptions} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Usage Heatmap
            </CardTitle>
            <CardDescription>
              Weekly usage patterns and intensity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ReactECharts option={usageHeatmapData} {...chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Filters and Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cost Breakdown</CardTitle>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <Select
                  value={selectedDateRange}
                  onValueChange={setSelectedDateRange}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                    <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                    <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <Select
                  value={selectedEntityType}
                  onValueChange={setSelectedEntityType}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Agent">Agent</SelectItem>
                    <SelectItem value="Tool">Tool</SelectItem>
                    <SelectItem value="Server">Server</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <Input
                  placeholder="Agent, Tool, Server..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-60"
                />
              </div>

              <Button variant="outline" size="sm">
                Download CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Estimated Cost</TableHead>
                  <TableHead>Usage (hrs)</TableHead>
                  <TableHead>Cost/Unit</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Breakdown</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {item.type === "Agent" && (
                          <Activity className="h-4 w-4 text-blue-500" />
                        )}
                        {item.type === "Tool" && (
                          <Settings className="h-4 w-4 text-orange-500" />
                        )}
                        {item.type === "Server" && (
                          <Server className="h-4 w-4 text-green-500" />
                        )}
                        {item.name}
                      </div>
                    </TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>₹{item.estimatedCost}</TableCell>
                    <TableCell>{item.usageHours}</TableCell>
                    <TableCell>₹{item.costPerUnit}</TableCell>
                    <TableCell>{item.lastRun}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === "active" ? "default" : "secondary"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {item.breakdown}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quota & Budget and Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quota & Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Quota & Budget
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Budget Used</span>
                  <span className="text-sm text-gray-600">60% of ₹2000</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Agent Quota Used</span>
                  <span className="text-sm text-gray-600">70% used</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Insights & Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Insights & Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Agent A</span> has exceeded
                    the cost threshold. Consider optimizing its usage pattern.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Tool Y</span> has been
                    inactive for 3 days. You may want to decommission or
                    repurpose it.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Server 1</span> has low
                    utilization. Consider consolidating workloads to save costs.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-medium">Cost Forecast:</span> If
                    current trends continue, you may exceed your budget in 6
                    days.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">Top Cost Drivers</p>
                    <div className="text-xs text-gray-600 space-y-1 mt-1">
                      <div>1. Agent A (₹300)</div>
                      <div>2. Agent B (₹300)</div>
                      <div>3. Tool X (₹200)</div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Quick Actions</p>
                    <div className="space-y-2 mt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7"
                      >
                        Set up cost alerts for high-usage agents
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7"
                      >
                        Decommission unused tools monthly
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
