import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Rocket,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Sparkles,
  Bot,
  Settings,
  Play,
} from "lucide-react";

export function HostAgentCard() {
  const navigate = useNavigate();

  const handleHostAgent = () => {
    navigate("/host-agent");
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-amber-500/10 rounded-2xl" />

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 opacity-20">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-100" />
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-200" />
        </div>
      </div>

      <Card className="relative border-2 border-orange-200/50 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    Host an Agent
                    <Sparkles className="h-5 w-5 text-orange-500" />
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600 mt-1">
                    Deploy powerful AI agents with our guided setup process
                  </CardDescription>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-800 border-orange-200"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Quick Setup
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-200"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Enterprise Ready
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 border-green-200"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  5-6 Steps
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Bot className="h-4 w-4 text-orange-500" />
                Single Agent
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                  Registry Configuration
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                  Tools & Resources Setup
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                  Server Configuration
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                  Testing & Validation
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-500" />
                Multi-Agent
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  Complex Orchestration
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  Agent Communication
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  Workflow Management
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  Advanced Testing
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">5-6</div>
                <div className="text-xs text-gray-600">Setup Steps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15min</div>
                <div className="text-xs text-gray-600">Avg Deploy Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleHostAgent}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              size="lg"
            >
              <Play className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Start Deployment
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              className="border-orange-200 hover:bg-orange-50 hover:border-orange-300 text-orange-700"
              size="lg"
            >
              <Bot className="h-4 w-4 mr-2" />
              View Guide
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Need help? Check our{" "}
              <span className="text-orange-600 hover:text-orange-700 cursor-pointer font-medium">
                deployment documentation
              </span>{" "}
              or contact support
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
