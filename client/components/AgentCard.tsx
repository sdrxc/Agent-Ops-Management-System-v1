import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Activity, 
  Bot, 
  Clock, 
  Play, 
  Settings, 
  TrendingUp, 
  DollarSign,
  Hash,
  Zap,
  AlertTriangle,
  Square,
  Pause
} from "lucide-react";
import { Agent } from "@shared/api";

interface AgentCardProps {
  agent: Agent;
  onTest?: (agent: Agent) => void;
  onConfigure?: (agentId: string) => void;
  onStart?: (agentId: string) => void;
  onStop?: (agentId: string) => void;
  onCardClick?: (agent: Agent) => void;
}

export function AgentCard({ agent, onTest, onConfigure, onStart, onStop, onCardClick }: AgentCardProps) {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'training':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'testing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />;
      case 'inactive':
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />;
      case 'training':
        return <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />;
      case 'testing':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Card
      className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-200/50 shadow-lg bg-gradient-to-br from-white via-gray-50/30 to-white backdrop-blur-sm cursor-pointer group relative overflow-hidden"
      onClick={() => onCardClick?.(agent)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <CardHeader className="pb-4 relative z-10">
        {/* Header with agent name, status, and version */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                {agent.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusIcon(agent.status)}
                <Badge variant="outline" className={`${getStatusColor(agent.status)} text-xs font-medium shadow-sm`}>
                  {agent.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-primary hover:bg-primary/10 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onConfigure?.(agent.id);
            }}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Version and Last Activity */}
        <div className="bg-gray-50/80 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">Version:</span>
            <Badge variant="secondary" className="text-xs font-mono bg-primary/10 text-primary">
              {agent.version}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">Last Activity:</span>
            <span className="text-gray-800 font-medium">{agent.lastActivity}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Success Rate */}
          <div className="text-center bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-3 border border-green-200/50 shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1 bg-green-100 rounded-full">
                <Activity className="h-3 w-3 text-green-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-green-900">
              {agent.performance.successRate}%
            </div>
            <div className="text-xs text-green-700 font-medium">Success Rate</div>
          </div>

          {/* Error Rate */}
          <div className="text-center bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl p-3 border border-red-200/50 shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1 bg-red-100 rounded-full">
                <AlertTriangle className="h-3 w-3 text-red-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-red-900">
              {agent.performance.errorRate}%
            </div>
            <div className="text-xs text-red-700 font-medium">Error Rate</div>
          </div>

          {/* Response Time */}
          <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 border border-blue-200/50 shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1 bg-blue-100 rounded-full">
                <Clock className="h-3 w-3 text-blue-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-blue-900">
              {agent.performance.responseTime}ms
            </div>
            <div className="text-xs text-blue-700 font-medium">Avg Response</div>
          </div>

          {/* Uptime */}
          <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-3 border border-purple-200/50 shadow-sm">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1 bg-purple-100 rounded-full">
                <TrendingUp className="h-3 w-3 text-purple-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-purple-900">
              {agent.performance.uptime}%
            </div>
            <div className="text-xs text-purple-700 font-medium">Uptime</div>
          </div>
        </div>

        <Separator />

        {/* Sessions and Cost */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl p-3 border border-indigo-200/50">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1 bg-indigo-100 rounded-full">
                <Hash className="h-3 w-3 text-indigo-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-indigo-900">
              {formatNumber(agent.sessions.total)}
            </div>
            <div className="text-xs text-indigo-700 font-medium">Sessions</div>
          </div>

          <div className="text-center bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-3 border border-emerald-200/50">
            <div className="flex items-center justify-center mb-2">
              <div className="p-1 bg-emerald-100 rounded-full">
                <DollarSign className="h-3 w-3 text-emerald-600" />
              </div>
            </div>
            <div className="text-lg font-bold text-emerald-900">
              ${agent.sessions.costPerSession.toFixed(3)}
            </div>
            <div className="text-xs text-emerald-700 font-medium">Cost/Session</div>
          </div>
        </div>

        {/* Token Usage */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 border border-amber-200/50">
          <div className="flex items-center space-x-2 mb-3">
            <div className="p-1 bg-amber-100 rounded-full">
              <Zap className="h-4 w-4 text-amber-600" />
            </div>
            <span className="text-sm font-semibold text-amber-800">Token Usage</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center">
              <div className="font-bold text-amber-900">{formatNumber(agent.tokens.input)}</div>
              <div className="text-amber-700 text-xs font-medium">Input</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-amber-900">{formatNumber(agent.tokens.output)}</div>
              <div className="text-amber-700 text-xs font-medium">Output</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-amber-900">{formatNumber(agent.tokens.total)}</div>
              <div className="text-amber-700 text-xs font-medium">Total</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {agent.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {agent.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{agent.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Quick Action Buttons */}
      <div className="p-4 pt-0 space-y-3 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          {agent.status === 'active' ? (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onStop?.(agent.id);
              }}
              className="h-9 border-2 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all"
            >
              <Pause className="h-3 w-3 mr-2" />
              Stop
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onStart?.(agent.id);
              }}
              className="h-9 border-2 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all"
            >
              <Play className="h-3 w-3 mr-2" />
              Start
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onConfigure?.(agent.id);
            }}
            className="h-9 border-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all"
          >
            <Settings className="h-3 w-3 mr-2" />
            Config
          </Button>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl h-10 font-semibold transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onTest?.(agent);
          }}
          size="sm"
        >
          <Play className="h-4 w-4 mr-2" />
          Test Agent
        </Button>
      </div>
    </Card>
  );
}
