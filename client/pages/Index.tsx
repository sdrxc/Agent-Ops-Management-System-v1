import { useState, useEffect } from "react";
import { AgentCard } from "@/components/AgentCard";
import { AgentPlayground } from "@/components/AgentPlayground";
import { AgentDetailModal } from "@/components/AgentDetailModal";
import { KPIDashboard } from "@/components/KPIDashboard";
import { OnboardingTutorial } from "@/components/OnboardingTutorial";
import { HostAgentCard } from "@/components/HostAgentCard";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Filter, SortAsc, ChevronDown } from "lucide-react";
import { Agent, DashboardMetrics } from "@shared/api";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalAgents: 0,
    activeAgents: 0,
    averagePerformance: 0,
    totalTests: 0,
    successRate: 0,
    averageResponseTime: 0,
  });
  const [playgroundAgent, setPlaygroundAgent] = useState<Agent | null>(null);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [detailAgent, setDetailAgent] = useState<Agent | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [originalAgents, setOriginalAgents] = useState<Agent[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockAgents: Agent[] = [
      {
        id: "1",
        name: "Customer Support Bot",
        description:
          "Intelligent customer service assistant that handles common inquiries and escalates complex issues to human agents.",
        status: "active",
        version: "v2.1.3",
        model: "GPT-4",
        lastActivity: "2 minutes ago",
        performance: {
          successRate: 94.5,
          responseTime: 150,
          uptime: 99.8,
          errorRate: 2.1,
        },
        sessions: {
          total: 15420,
          costPerSession: 0.045,
        },
        tokens: {
          input: 1250000,
          output: 890000,
          total: 2140000,
        },
        tags: ["Customer Service", "NLP", "Support"],
      },
      {
        id: "2",
        name: "Content Generator",
        description:
          "Creative AI that generates high-quality marketing content, blog posts, and social media content.",
        status: "active",
        version: "v1.8.2",
        model: "GPT-4",
        lastActivity: "5 minutes ago",
        performance: {
          successRate: 91.2,
          responseTime: 200,
          uptime: 99.9,
          errorRate: 3.4,
        },
        sessions: {
          total: 8750,
          costPerSession: 0.067,
        },
        tokens: {
          input: 980000,
          output: 1340000,
          total: 2320000,
        },
        tags: ["Content", "Marketing", "Creative"],
      },
      {
        id: "3",
        name: "Code Review Assistant",
        description:
          "Automated code review agent that analyzes pull requests and provides suggestions for improvements.",
        status: "training",
        version: "v0.9.1-beta",
        model: "CodeLlama",
        lastActivity: "30 minutes ago",
        performance: {
          successRate: 88.7,
          responseTime: 300,
          uptime: 98.5,
          errorRate: 5.2,
        },
        sessions: {
          total: 3420,
          costPerSession: 0.032,
        },
        tokens: {
          input: 2100000,
          output: 780000,
          total: 2880000,
        },
        tags: ["Development", "Code Review", "Quality"],
      },
      {
        id: "4",
        name: "Data Analyst",
        description:
          "Advanced analytics agent that processes large datasets and generates insights and reports.",
        status: "active",
        version: "v3.0.1",
        model: "GPT-4",
        lastActivity: "1 hour ago",
        performance: {
          successRate: 96.1,
          responseTime: 120,
          uptime: 99.7,
          errorRate: 1.8,
        },
        sessions: {
          total: 22800,
          costPerSession: 0.089,
        },
        tokens: {
          input: 3200000,
          output: 1800000,
          total: 5000000,
        },
        tags: ["Analytics", "Data Science", "Reports"],
      },
      {
        id: "5",
        name: "Translation Service",
        description:
          "Multi-language translation agent supporting 50+ languages with context-aware translations.",
        status: "error",
        version: "v2.3.0",
        model: "mT5",
        lastActivity: "2 hours ago",
        performance: {
          successRate: 89.3,
          responseTime: 180,
          uptime: 97.2,
          errorRate: 8.7,
        },
        sessions: {
          total: 12300,
          costPerSession: 0.052,
        },
        tokens: {
          input: 1850000,
          output: 1650000,
          total: 3500000,
        },
        tags: ["Translation", "Multilingual", "Communication"],
      },
      {
        id: "6",
        name: "Sales Assistant",
        description:
          "AI-powered sales agent that qualifies leads, schedules meetings, and follows up with prospects.",
        status: "testing",
        version: "v1.5.4",
        model: "GPT-4",
        lastActivity: "15 minutes ago",
        performance: {
          successRate: 92.8,
          responseTime: 160,
          uptime: 99.1,
          errorRate: 2.9,
        },
        sessions: {
          total: 5680,
          costPerSession: 0.073,
        },
        tokens: {
          input: 950000,
          output: 1150000,
          total: 2100000,
        },
        tags: ["Sales", "Lead Generation", "CRM"],
      },
    ];

    const mockMetrics: DashboardMetrics = {
      totalAgents: mockAgents.length,
      activeAgents: mockAgents.filter((agent) => agent.status === "active")
        .length,
      averagePerformance:
        mockAgents.reduce(
          (sum, agent) => sum + agent.performance.successRate,
          0,
        ) / mockAgents.length,
      totalTests: mockAgents.reduce(
        (sum, agent) => sum + agent.sessions.total,
        0,
      ),
      successRate:
        mockAgents.reduce(
          (sum, agent) => sum + agent.performance.successRate,
          0,
        ) / mockAgents.length,
      averageResponseTime:
        mockAgents.reduce(
          (sum, agent) => sum + agent.performance.responseTime,
          0,
        ) / mockAgents.length,
    };

    setOriginalAgents(mockAgents);
    setAgents(mockAgents);
    setMetrics(mockMetrics);

    // Check if this is the user's first visit and show tutorial after a brief delay
    const hasSeenTutorial = localStorage.getItem("agenthub-tutorial-completed");
    if (!hasSeenTutorial) {
      setTimeout(() => {
        setShowOnboarding(true);
      }, 1000); // Show tutorial after 1 second delay
    }
  }, []);

  // Filter and sort agents based on search query and sort option
  useEffect(() => {
    let filteredAgents = [...originalAgents];

    // Apply search filter
    if (searchQuery.trim()) {
      filteredAgents = filteredAgents.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          agent.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Apply sorting
    filteredAgents.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "performance":
          return b.performance.successRate - a.performance.successRate;
        case "lastActivity":
          // Convert relative time to comparable values (newer first)
          const getTimeValue = (timeStr: string) => {
            if (timeStr.includes("minute")) return parseInt(timeStr) || 0;
            if (timeStr.includes("hour")) return (parseInt(timeStr) || 0) * 60;
            if (timeStr.includes("day")) return (parseInt(timeStr) || 0) * 1440;
            return 0;
          };
          return getTimeValue(a.lastActivity) - getTimeValue(b.lastActivity);
        case "cost":
          return a.sessions.costPerSession - b.sessions.costPerSession;
        default:
          return 0;
      }
    });

    setAgents(filteredAgents);
  }, [originalAgents, searchQuery, sortBy]);

  const handleTestAgent = (agent: Agent) => {
    setPlaygroundAgent(agent);
    setIsPlaygroundOpen(true);
  };

  const handleConfigureAgent = (agentId: string) => {
    const agent = agents.find((a) => a.id === agentId);
    if (agent) {
      alert(`Configuring ${agent.name}...`);
      // In a real app, this would open a configuration modal or page
    }
  };

  const handleStartAgent = (agentId: string) => {
    const agent = originalAgents.find((a) => a.id === agentId);
    if (agent) {
      // Update agent status to active
      setOriginalAgents(
        originalAgents.map((a) =>
          a.id === agentId ? { ...a, status: "active" as const } : a,
        ),
      );
      alert(`Starting ${agent.name}...`);
    }
  };

  const handleStopAgent = (agentId: string) => {
    const agent = originalAgents.find((a) => a.id === agentId);
    if (agent) {
      // Update agent status to inactive
      setOriginalAgents(
        originalAgents.map((a) =>
          a.id === agentId ? { ...a, status: "inactive" as const } : a,
        ),
      );
      alert(`Stopping ${agent.name}...`);
    }
  };

  const handleCardClick = (agent: Agent) => {
    setDetailAgent(agent);
    setIsDetailModalOpen(true);
  };

  const handleTutorialComplete = () => {
    localStorage.setItem("agenthub-tutorial-completed", "true");
    setShowOnboarding(false);
  };

  return (
    <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-8">
        {/* Host an Agent Section */}
        <HostAgentCard />

        {/* Agent Dashboard Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Agent Dashboard
            </h2>
            <p className="text-gray-600 mt-1">
              Monitor and manage your AI agents from a single dashboard
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] h-9">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="lastActivity">Last Activity</SelectItem>
                <SelectItem value="cost">Cost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Dashboard */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Key Performance Indicators
          </h3>
          <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl p-6">
            <KPIDashboard metrics={metrics} />
          </div>
        </div>

        {/* Agents Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              All Agents ({agents.length})
            </h2>
            <div className="text-sm text-gray-500">
              {metrics.activeAgents} active •{" "}
              {agents.filter((a) => a.status === "training").length} training •{" "}
              {agents.filter((a) => a.status === "testing").length} testing
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onTest={handleTestAgent}
                onConfigure={handleConfigureAgent}
                onStart={handleStartAgent}
                onStop={handleStopAgent}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>

        {/* Agent Playground Modal */}
        <AgentPlayground
          agent={playgroundAgent}
          isOpen={isPlaygroundOpen}
          onClose={() => {
            setIsPlaygroundOpen(false);
            setPlaygroundAgent(null);
          }}
        />

        {/* Agent Detail Modal */}
        <AgentDetailModal
          agent={detailAgent}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setDetailAgent(null);
          }}
        />
      </div>

      {/* Onboarding Tutorial */}
      <OnboardingTutorial
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onComplete={handleTutorialComplete}
      />
    </Layout>
  );
}
