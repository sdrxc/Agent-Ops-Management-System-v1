import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  Upload,
  CheckCircle,
  Circle,
  ArrowRight,
  ArrowLeft,
  Plus,
  Settings,
  Server,
  TestTube,
  FileText,
  GitBranch,
  Play,
  Eye,
  Code,
  Database,
  Network,
  Shield,
  Monitor,
  Zap,
  BookOpen,
  HelpCircle,
  Info,
} from "lucide-react";

type StepStatus = "pending" | "current" | "completed";

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: StepStatus;
}

interface AgentConfig {
  name: string;
  description: string;
  file: File | null;
  model: string;
  tools: string[];
  environment: string;
  resources: {
    cpu: string;
    memory: string;
    storage: string;
  };
}

export default function HostAgent() {
  const [isMultiAgent, setIsMultiAgent] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [agentConfigs, setAgentConfigs] = useState<AgentConfig[]>([
    {
      name: "",
      description: "",
      file: null,
      model: "gpt-4",
      tools: [],
      environment: "development",
      resources: {
        cpu: "1 vCPU",
        memory: "2GB",
        storage: "10GB",
      },
    },
  ]);

  const singleAgentSteps: Step[] = [
    {
      id: "registry",
      title: "Agent Registry",
      description: "Register and configure your AI agent",
      icon: Bot,
      status:
        currentStep === 0
          ? "current"
          : currentStep > 0
            ? "completed"
            : "pending",
    },
    {
      id: "tools",
      title: "Tool Registry",
      description: "Configure tools and integrations",
      icon: Settings,
      status:
        currentStep === 1
          ? "current"
          : currentStep > 1
            ? "completed"
            : "pending",
    },
    {
      id: "server",
      title: "Server Registry",
      description: "Configure hosting and deployment",
      icon: Server,
      status:
        currentStep === 2
          ? "current"
          : currentStep > 2
            ? "completed"
            : "pending",
    },
    {
      id: "testing",
      title: "Testing",
      description: "Run validation and performance tests",
      icon: TestTube,
      status:
        currentStep === 3
          ? "current"
          : currentStep > 3
            ? "completed"
            : "pending",
    },
    {
      id: "testcases",
      title: "Test Cases",
      description: "Define and execute test scenarios",
      icon: FileText,
      status:
        currentStep === 4
          ? "current"
          : currentStep > 4
            ? "completed"
            : "pending",
    },
  ];

  const multiAgentSteps: Step[] = [
    ...singleAgentSteps,
    {
      id: "orchestration",
      title: "Orchestration",
      description: "Configure multi-agent coordination",
      icon: GitBranch,
      status:
        currentStep === 5
          ? "current"
          : currentStep > 5
            ? "completed"
            : "pending",
    },
  ];

  const steps = isMultiAgent ? multiAgentSteps : singleAgentSteps;
  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addAgent = () => {
    setAgentConfigs([
      ...agentConfigs,
      {
        name: "",
        description: "",
        file: null,
        model: "gpt-4",
        tools: [],
        environment: "development",
        resources: {
          cpu: "1 vCPU",
          memory: "2GB",
          storage: "10GB",
        },
      },
    ]);
  };

  const updateAgentConfig = (
    index: number,
    field: keyof AgentConfig,
    value: any,
  ) => {
    const updated = [...agentConfigs];
    updated[index] = { ...updated[index], [field]: value };
    setAgentConfigs(updated);
  };

  const handleFileUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null;
    updateAgentConfig(index, "file", file);
  };

  const validateCurrentStep = () => {
    // Add validation logic here
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Agent Registry
        return (
          <div className="space-y-6">
            <div className="grid gap-6">
              {agentConfigs.map((config, index) => (
                <Card key={index} className="relative">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-primary" />
                        <span>Agent {index + 1} Configuration</span>
                      </div>
                      {isMultiAgent && agentConfigs.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updated = agentConfigs.filter(
                              (_, i) => i !== index,
                            );
                            setAgentConfigs(updated);
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`agent-name-${index}`}>
                          Agent Name
                        </Label>
                        <Input
                          id={`agent-name-${index}`}
                          placeholder="Enter agent name"
                          value={config.name}
                          onChange={(e) =>
                            updateAgentConfig(index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`agent-model-${index}`}>Model</Label>
                        <Select
                          value={config.model}
                          onValueChange={(value) =>
                            updateAgentConfig(index, "model", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">
                              GPT-3.5 Turbo
                            </SelectItem>
                            <SelectItem value="claude-3">Claude 3</SelectItem>
                            <SelectItem value="gemini-pro">
                              Gemini Pro
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`agent-description-${index}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`agent-description-${index}`}
                        placeholder="Describe the agent's purpose and capabilities"
                        rows={3}
                        value={config.description}
                        onChange={(e) =>
                          updateAgentConfig(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Agent Code/Configuration File</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            Upload agent configuration file (.py, .json, .yaml)
                          </p>
                          <input
                            type="file"
                            accept=".py,.json,.yaml,.yml"
                            onChange={(e) => handleFileUpload(index, e)}
                            className="hidden"
                            id={`file-upload-${index}`}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              document
                                .getElementById(`file-upload-${index}`)
                                ?.click()
                            }
                          >
                            Choose File
                          </Button>
                          {config.file && (
                            <p className="text-sm text-green-600 mt-2">
                              ✓ {config.file.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {isMultiAgent && (
              <div className="flex justify-center">
                <Button variant="outline" onClick={addAgent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Agent
                </Button>
              </div>
            )}
          </div>
        );

      case 1: // Tool Registry
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span>Tool Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: "web-search",
                      name: "Web Search",
                      description: "Enable web searching capabilities",
                      icon: "🔍",
                    },
                    {
                      id: "database",
                      name: "Database",
                      description: "Connect to databases",
                      icon: "🗄️",
                    },
                    {
                      id: "api-calls",
                      name: "API Integration",
                      description: "Make external API calls",
                      icon: "🔗",
                    },
                    {
                      id: "file-ops",
                      name: "File Operations",
                      description: "Read and write files",
                      icon: "📁",
                    },
                    {
                      id: "email",
                      name: "Email",
                      description: "Send and receive emails",
                      icon: "📧",
                    },
                    {
                      id: "calendar",
                      name: "Calendar",
                      description: "Schedule and manage events",
                      icon: "📅",
                    },
                  ].map((tool) => (
                    <Card
                      key={tool.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">{tool.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">
                              {tool.name}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {tool.description}
                            </p>
                            <div className="mt-2">
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Custom Tools</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Code className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Add custom tools and functions
                    </p>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Tool
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2: // Server Registry
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-primary" />
                  <span>Deployment Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Environment</h4>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Hosting Provider</h4>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aws">AWS</SelectItem>
                        <SelectItem value="gcp">Google Cloud</SelectItem>
                        <SelectItem value="azure">Microsoft Azure</SelectItem>
                        <SelectItem value="local">Local Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Resource Allocation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>CPU</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select CPU" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 vCPU</SelectItem>
                          <SelectItem value="2">2 vCPU</SelectItem>
                          <SelectItem value="4">4 vCPU</SelectItem>
                          <SelectItem value="8">8 vCPU</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Memory</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select memory" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2GB RAM</SelectItem>
                          <SelectItem value="4">4GB RAM</SelectItem>
                          <SelectItem value="8">8GB RAM</SelectItem>
                          <SelectItem value="16">16GB RAM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Storage</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10GB SSD</SelectItem>
                          <SelectItem value="25">25GB SSD</SelectItem>
                          <SelectItem value="50">50GB SSD</SelectItem>
                          <SelectItem value="100">100GB SSD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Security & Networking</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-sm">
                          SSL/TLS Encryption
                        </span>
                      </div>
                      <Switch defaultChecked />
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Network className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-sm">
                          Auto-scaling
                        </span>
                      </div>
                      <Switch />
                    </Card>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Database className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold">MCP Server Configuration</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Configure Model Context Protocol (MCP) servers to extend
                    your agent's capabilities with external integrations and
                    data sources.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          id: "supabase",
                          name: "Supabase",
                          description: "Database and authentication services",
                          icon: "🗄️",
                          category: "Database",
                          popular: true,
                        },
                        {
                          id: "netlify",
                          name: "Netlify",
                          description: "Hosting and deployment management",
                          icon: "🌐",
                          category: "Hosting",
                          popular: true,
                        },
                        {
                          id: "linear",
                          name: "Linear",
                          description: "Issue tracking and project management",
                          icon: "📋",
                          category: "Project Management",
                          popular: false,
                        },
                        {
                          id: "notion",
                          name: "Notion",
                          description: "Knowledge base and documentation",
                          icon: "📚",
                          category: "Documentation",
                          popular: false,
                        },
                        {
                          id: "sentry",
                          name: "Sentry",
                          description: "Error monitoring and debugging",
                          icon: "🐛",
                          category: "Monitoring",
                          popular: false,
                        },
                        {
                          id: "figma",
                          name: "Figma",
                          description: "Design to code conversion",
                          icon: "🎨",
                          category: "Design",
                          popular: true,
                        },
                      ].map((mcpServer) => (
                        <Card
                          key={mcpServer.id}
                          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-purple-200"
                        >
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="text-2xl">
                                    {mcpServer.icon}
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <h4 className="font-semibold text-sm">
                                        {mcpServer.name}
                                      </h4>
                                      {mcpServer.popular && (
                                        <Badge
                                          variant="secondary"
                                          className="bg-purple-100 text-purple-800 text-xs"
                                        >
                                          Popular
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                      {mcpServer.category}
                                    </p>
                                  </div>
                                </div>
                                <Switch />
                              </div>
                              <p className="text-xs text-gray-600">
                                {mcpServer.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Card className="border-2 border-dashed border-purple-300 bg-purple-50/50">
                      <CardContent className="p-6 text-center">
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <div className="p-3 bg-purple-100 rounded-full">
                              <Plus className="h-6 w-6 text-purple-600" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-purple-900">
                              Add Custom MCP Server
                            </h4>
                            <p className="text-sm text-purple-700 mt-1">
                              Connect your own MCP server or configure a custom
                              integration
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            className="border-purple-300 text-purple-700 hover:bg-purple-100"
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Configure Custom Server
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          MCP Server Endpoint
                        </Label>
                        <Input
                          placeholder="wss://your-mcp-server.com/mcp"
                          className="border-purple-200 focus:border-purple-400"
                        />
                        <p className="text-xs text-gray-500">
                          WebSocket endpoint for MCP server communication
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Authentication Token
                        </Label>
                        <Input
                          type="password"
                          placeholder="Enter MCP server token"
                          className="border-purple-200 focus:border-purple-400"
                        />
                        <p className="text-xs text-gray-500">
                          Secure token for server authentication
                        </p>
                      </div>
                    </div>

                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-1 bg-blue-100 rounded">
                            <Info className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium text-blue-900 text-sm">
                              MCP Integration Benefits
                            </h4>
                            <ul className="text-xs text-blue-800 space-y-1">
                              <li>• Seamless external service integration</li>
                              <li>
                                • Real-time data access and synchronization
                              </li>
                              <li>
                                • Enhanced agent capabilities and workflows
                              </li>
                              <li>
                                • Secure, protocol-standardized communication
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3: // Testing
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TestTube className="h-5 w-5 text-primary" />
                  <span>Agent Testing & Validation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <Monitor className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Performance Test</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Test response time and throughput
                    </p>
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Run Test
                    </Button>
                  </Card>

                  <Card className="p-4 text-center">
                    <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Security Test</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Validate security measures
                    </p>
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Run Test
                    </Button>
                  </Card>

                  <Card className="p-4 text-center">
                    <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Load Test</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Test under high load
                    </p>
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Run Test
                    </Button>
                  </Card>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Test Results</h4>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Basic Functionality",
                        status: "passed",
                        time: "2.3s",
                      },
                      {
                        name: "Error Handling",
                        status: "passed",
                        time: "1.8s",
                      },
                      {
                        name: "Performance Benchmark",
                        status: "running",
                        time: "...",
                      },
                      {
                        name: "Security Validation",
                        status: "pending",
                        time: "-",
                      },
                    ].map((test, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {test.status === "passed" && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                          {test.status === "running" && (
                            <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          )}
                          {test.status === "pending" && (
                            <Circle className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="text-sm font-medium">
                            {test.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {test.time}
                          </span>
                          <Badge
                            variant={
                              test.status === "passed"
                                ? "default"
                                : test.status === "running"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {test.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4: // Test Cases
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Test Cases & Scenarios</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      name: "Basic Query Handling",
                      description: "Test standard user queries and responses",
                      input: "What is the weather today?",
                      expected:
                        "Should provide weather information or request location",
                    },
                    {
                      name: "Error Recovery",
                      description: "Test how agent handles invalid inputs",
                      input: "Invalid command #@$%",
                      expected: "Should gracefully handle and provide help",
                    },
                    {
                      name: "Context Retention",
                      description: "Test conversation context memory",
                      input: "Follow-up question referring to previous context",
                      expected:
                        "Should maintain context from previous messages",
                    },
                  ].map((testCase, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-sm">
                            {testCase.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {testCase.description}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3 mr-1" />
                            Run
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-gray-500">INPUT</Label>
                          <p className="mt-1 p-2 bg-gray-50 rounded text-xs">
                            {testCase.input}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">
                            EXPECTED OUTPUT
                          </Label>
                          <p className="mt-1 p-2 bg-gray-50 rounded text-xs">
                            {testCase.expected}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Test Case
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5: // Orchestration (Multi-Agent only)
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  <span>Multi-Agent Orchestration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Coordination Strategy</h4>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select orchestration pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sequential">
                        Sequential Processing
                      </SelectItem>
                      <SelectItem value="parallel">
                        Parallel Processing
                      </SelectItem>
                      <SelectItem value="hierarchical">
                        Hierarchical Coordination
                      </SelectItem>
                      <SelectItem value="peer-to-peer">Peer-to-Peer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Agent Communication</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-sm">
                          Message Queue
                        </span>
                      </div>
                      <Switch defaultChecked />
                      <p className="text-xs text-gray-600 mt-1">
                        Enable asynchronous messaging
                      </p>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-sm">
                          Shared Memory
                        </span>
                      </div>
                      <Switch />
                      <p className="text-xs text-gray-600 mt-1">
                        Enable shared state management
                      </p>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Workflow Configuration</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <GitBranch className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Design agent workflow and dependencies
                    </p>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Workflow
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Host a New Agent
              </h1>
              <p className="text-gray-600 mt-1">
                Follow the steps to register, configure, and validate your AI
                agent. This tool guides you through a robust, production-grade
                onboarding process.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Tutorial
            </Button>
            <Button variant="outline" size="sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
          </div>
        </div>

        {/* Agent Type Toggle */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-4">
              <Label
                htmlFor="agent-type"
                className={`font-medium ${!isMultiAgent ? "text-primary" : "text-gray-500"}`}
              >
                Single Agent
              </Label>
              <Switch
                id="agent-type"
                checked={isMultiAgent}
                onCheckedChange={setIsMultiAgent}
              />
              <Label
                htmlFor="agent-type"
                className={`font-medium ${isMultiAgent ? "text-primary" : "text-gray-500"}`}
              >
                Multi-Agent
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-600">
                  {currentStep + 1} of {totalSteps}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Step Navigation */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.id} className="flex items-center space-x-4">
                  <div className="flex flex-col items-center space-y-2 min-w-[120px]">
                    <div
                      className={`
                      p-3 rounded-full border-2 transition-all
                      ${step.status === "completed" ? "bg-green-100 border-green-500 text-green-700" : ""}
                      ${step.status === "current" ? "bg-primary/10 border-primary text-primary" : ""}
                      ${step.status === "pending" ? "bg-gray-100 border-gray-300 text-gray-400" : ""}
                    `}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-sm font-medium ${step.status === "current" ? "text-primary" : step.status === "completed" ? "text-green-700" : "text-gray-500"}`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 max-w-[100px]">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight
                      className={`h-4 w-4 ${index < currentStep ? "text-green-500" : "text-gray-300"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            <Button variant="outline">Screenshot</Button>
            {currentStep < totalSteps - 1 ? (
              <Button onClick={nextStep} disabled={!validateCurrentStep()}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button className="bg-green-600 hover:bg-green-700">
                Deploy Agent
                <Play className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
