import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import ReactECharts from "echarts-for-react";
import { errorTrendsData } from "@/lib/chart-data";
import { IncidentFormDialog } from "@/components/IncidentFormDialog";
import {
  AlertTriangle,
  Activity,
  RotateCcw,
  TrendingDown,
  Clock,
  Search,
  Filter,
  Download,
  Play,
  Pause,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  BarChart3,
  Database,
  Server,
  Zap,
  Target,
  GitBranch,
  Eye,
  Settings,
  Bell,
  Tag,
  Cpu,
  Network,
  Shield,
  RefreshCw,
  FileText,
  LineChart,
  Plus,
} from "lucide-react";

interface FailedExecution {
  id: string;
  agentId: string;
  agentName: string;
  timestamp: string;
  errorType: string;
  errorMessage: string;
  severity: "low" | "medium" | "high" | "critical";
  duration: number;
  retryCount: number;
  status: "investigating" | "resolved" | "escalated";
  affectedUsers: number;
}

interface RollbackCandidate {
  id: string;
  version: string;
  deployedAt: string;
  stability: number;
  successRate: number;
  errorCount: number;
  canRollback: boolean;
  recommended: boolean;
}

interface SLOMetric {
  name: string;
  current: number;
  target: number;
  threshold: number;
  status: "healthy" | "warning" | "critical";
  trend: "up" | "down" | "stable";
}

interface AlertChain {
  id: string;
  name: string;
  source: string;
  dependencies: string[];
  status: "active" | "failed" | "disabled";
  lastTriggered: string;
}

const mockFailedExecutions: FailedExecution[] = [
  {
    id: "fe1",
    agentId: "agent-001",
    agentName: "Customer Support Bot",
    timestamp: "2025-01-13T15:30:00Z",
    errorType: "API_TIMEOUT",
    errorMessage: "External API timeout after 30s",
    severity: "high",
    duration: 30000,
    retryCount: 3,
    status: "investigating",
    affectedUsers: 45,
  },
  {
    id: "fe2",
    agentId: "agent-002",
    agentName: "Data Processor",
    timestamp: "2025-01-13T14:45:00Z",
    errorType: "MEMORY_LIMIT",
    errorMessage: "Memory limit exceeded during batch processing",
    severity: "critical",
    duration: 0,
    retryCount: 0,
    status: "escalated",
    affectedUsers: 120,
  },
  {
    id: "fe3",
    agentId: "agent-003",
    agentName: "Analytics Engine",
    timestamp: "2025-01-13T14:20:00Z",
    errorType: "VALIDATION_ERROR",
    errorMessage: "Invalid input schema detected",
    severity: "medium",
    duration: 5000,
    retryCount: 1,
    status: "resolved",
    affectedUsers: 12,
  },
];

const mockRollbackCandidates: RollbackCandidate[] = [
  {
    id: "v2.4.1",
    version: "v2.4.1",
    deployedAt: "2025-01-12T10:00:00Z",
    stability: 98.5,
    successRate: 99.2,
    errorCount: 3,
    canRollback: true,
    recommended: true,
  },
  {
    id: "v2.4.0",
    version: "v2.4.0",
    deployedAt: "2025-01-10T16:30:00Z",
    stability: 95.8,
    successRate: 97.8,
    errorCount: 8,
    canRollback: true,
    recommended: false,
  },
  {
    id: "v2.3.9",
    version: "v2.3.9",
    deployedAt: "2025-01-08T14:15:00Z",
    stability: 97.2,
    successRate: 98.5,
    errorCount: 5,
    canRollback: true,
    recommended: false,
  },
];

const mockSLOMetrics: SLOMetric[] = [
  {
    name: "Availability",
    current: 99.2,
    target: 99.5,
    threshold: 99.0,
    status: "warning",
    trend: "down",
  },
  {
    name: "Response Time",
    current: 850,
    target: 500,
    threshold: 1000,
    status: "critical",
    trend: "up",
  },
  {
    name: "Error Rate",
    current: 0.8,
    target: 0.5,
    threshold: 1.0,
    status: "warning",
    trend: "up",
  },
  {
    name: "Throughput",
    current: 1250,
    target: 1000,
    threshold: 800,
    status: "healthy",
    trend: "up",
  },
];

const mockAlertChains: AlertChain[] = [
  {
    id: "ac1",
    name: "High Error Rate → Auto Scale",
    source: "Error Monitoring",
    dependencies: ["Load Balancer", "Auto Scaler", "Notification Service"],
    status: "active",
    lastTriggered: "2025-01-13T15:30:00Z",
  },
  {
    id: "ac2",
    name: "Memory Limit → Restart Service",
    source: "Resource Monitor",
    dependencies: ["Service Manager", "Health Checker"],
    status: "failed",
    lastTriggered: "2025-01-13T14:45:00Z",
  },
  {
    id: "ac3",
    name: "API Timeout → Circuit Breaker",
    source: "API Gateway",
    dependencies: ["Circuit Breaker", "Fallback Service"],
    status: "active",
    lastTriggered: "2025-01-13T14:20:00Z",
  },
];

export default function IncidentReporting() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [autoRollbackEnabled, setAutoRollbackEnabled] = useState(true);
  const [sloAutoActions, setSloAutoActions] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [searchTerm, setSearchTerm] = useState("");
  const [isIncidentDialogOpen, setIsIncidentDialogOpen] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      case "active":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      case "resolved":
        return "text-green-600";
      case "investigating":
        return "text-yellow-600";
      case "escalated":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const handleRollback = async (version: string) => {
    toast({
      title: "Initiating Rollback",
      description: `Rolling back to version ${version}...`,
      variant: "default",
    });

    // Simulate rollback process
    setTimeout(() => {
      toast({
        title: "Rollback Completed",
        description: `Successfully rolled back to version ${version}`,
        variant: "default",
      });
    }, 3000);
  };

  const handleAutoRCA = (executionId: string) => {
    toast({
      title: "RCA Analysis Started",
      description:
        "Analyzing execution logs and computing root cause metrics...",
      variant: "default",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Incident Diagnostics & Remediation
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor failures, analyze root causes, and automate recovery
              actions
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
            <Button
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
              onClick={() => setIsIncidentDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Create Incident
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Incidents
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">7</div>
              <p className="text-xs text-gray-600">+2 from last hour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Spike</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">+285%</div>
              <p className="text-xs text-gray-600">vs 1h ago</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Auto Rollbacks
              </CardTitle>
              <RotateCcw className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">3</div>
              <p className="text-xs text-gray-600">Last 24h</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MTTR</CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12m</div>
              <p className="text-xs text-gray-600">-8m improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="executions">Failed Executions</TabsTrigger>
            <TabsTrigger value="rollback">Rollback History</TabsTrigger>
            <TabsTrigger value="slo">SLO Monitoring</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Real-time Error Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5" />
                    Error Trends (24h)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ReactECharts
                      option={errorTrendsData}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* System Health Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSLOMetrics.map((metric) => (
                    <div key={metric.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {metric.name}
                        </span>
                        <span
                          className={`text-sm ${getStatusColor(metric.status)}`}
                        >
                          {metric.current}
                          {metric.name === "Response Time"
                            ? "ms"
                            : metric.name === "Error Rate"
                              ? "%"
                              : metric.name === "Availability"
                                ? "%"
                                : "/min"}
                        </span>
                      </div>
                      <Progress
                        value={(metric.current / metric.target) * 100}
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Critical Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Recent Critical Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockFailedExecutions
                    .filter(
                      (exec) =>
                        exec.severity === "critical" ||
                        exec.severity === "high",
                    )
                    .map((execution) => (
                      <div
                        key={execution.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <AlertTriangle
                            className={`h-5 w-5 ${execution.severity === "critical" ? "text-red-500" : "text-orange-500"}`}
                          />
                          <div>
                            <p className="font-medium">{execution.agentName}</p>
                            <p className="text-sm text-gray-600">
                              {execution.errorMessage}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getSeverityColor(execution.severity)}
                          >
                            {execution.severity}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Investigate
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Failed Executions Tab */}
          <TabsContent value="executions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  Failed Executions Analysis
                </CardTitle>
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <Input
                      placeholder="Search by agent, error type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                  </div>
                  <Select
                    value={selectedTimeRange}
                    onValueChange={setSelectedTimeRange}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Last 1h</SelectItem>
                      <SelectItem value="24h">Last 24h</SelectItem>
                      <SelectItem value="7d">Last 7d</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent</TableHead>
                      <TableHead>Error Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Affected Users</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockFailedExecutions.map((execution) => (
                      <TableRow key={execution.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{execution.agentName}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(execution.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {execution.errorType}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getSeverityColor(execution.severity)}
                          >
                            {execution.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{execution.affectedUsers}</TableCell>
                        <TableCell>{execution.duration}ms</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              execution.status === "resolved"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {execution.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAutoRCA(execution.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* RCA Analysis Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Root Cause Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Database className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="font-medium">Database Issues</p>
                    <p className="text-2xl font-bold text-blue-600">23%</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Network className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="font-medium">Network Timeouts</p>
                    <p className="text-2xl font-bold text-orange-600">45%</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Cpu className="h-8 w-8 mx-auto mb-2 text-red-500" />
                    <p className="font-medium">Resource Limits</p>
                    <p className="text-2xl font-bold text-red-600">32%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rollback History Tab */}
          <TabsContent value="rollback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Rollback Candidates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRollbackCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className={`p-4 border rounded-lg ${candidate.recommended ? "border-green-200 bg-green-50" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-mono font-bold">
                            {candidate.version}
                          </div>
                          {candidate.recommended && (
                            <Badge className="bg-green-100 text-green-800">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right text-sm">
                            <p className="font-medium">
                              Stability: {candidate.stability}%
                            </p>
                            <p className="text-gray-600">
                              Success: {candidate.successRate}%
                            </p>
                          </div>
                          <Button
                            size="sm"
                            disabled={!candidate.canRollback}
                            onClick={() => handleRollback(candidate.version)}
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Rollback
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Deployed</p>
                          <p>
                            {new Date(
                              candidate.deployedAt,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Error Count</p>
                          <p>{candidate.errorCount}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Success Rate</p>
                          <Progress
                            value={candidate.successRate}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SLO Monitoring Tab */}
          <TabsContent value="slo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  SLO-Based Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockSLOMetrics.map((metric) => (
                    <div key={metric.name} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{metric.name}</h3>
                        <Badge
                          className={getSeverityColor(
                            metric.status === "healthy"
                              ? "low"
                              : metric.status === "warning"
                                ? "medium"
                                : "critical",
                          )}
                        >
                          {metric.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current</span>
                          <span className={getStatusColor(metric.status)}>
                            {metric.current}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Target</span>
                          <span>{metric.target}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Threshold</span>
                          <span>{metric.threshold}</span>
                        </div>
                        <Progress
                          value={
                            metric.status === "healthy"
                              ? 100
                              : metric.status === "warning"
                                ? 60
                                : 30
                          }
                          className="mt-3"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Auto-Rollback Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    Auto-Rollback Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Enable SLO-based Auto Rollback
                      </p>
                      <p className="text-sm text-gray-600">
                        Automatically rollback when SLOs are breached
                      </p>
                    </div>
                    <Switch
                      checked={autoRollbackEnabled}
                      onCheckedChange={setAutoRollbackEnabled}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Rollback Triggers</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <span className="text-sm">
                          Error rate &gt; 5% for 5 minutes
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <span className="text-sm">
                          Response time &gt; 2s for 10 minutes
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">
                          Availability &lt; 95% for 3 minutes
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alert Chain Validation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Alert Chain Validation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAlertChains.map((chain) => (
                      <div
                        key={chain.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{chain.name}</p>
                          <p className="text-sm text-gray-600">
                            Source: {chain.source}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              chain.status === "active"
                                ? "default"
                                : chain.status === "failed"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {chain.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Annotation Tagging */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Annotation & Tagging System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Auto-tag incidents with metadata
                      </p>
                      <p className="text-sm text-gray-600">
                        Enrich incidents with contextual information
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Badge variant="outline">environment:prod</Badge>
                    <Badge variant="outline">severity:high</Badge>
                    <Badge variant="outline">component:api</Badge>
                    <Badge variant="outline">region:us-east</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Input placeholder="Add custom tag..." className="flex-1" />
                    <Button size="sm">
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Incident Form Dialog */}
      <IncidentFormDialog
        open={isIncidentDialogOpen}
        onOpenChange={setIsIncidentDialogOpen}
      />
    </Layout>
  );
}
