import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Bot,
  PlayCircle,
  DollarSign,
  AlertTriangle,
  Settings,
  Target,
  Activity,
  Zap,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Rocket,
  Shield,
} from "lucide-react";

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  highlight: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to AgentHub",
    description:
      "Your comprehensive AI agent management platform. Let's explore the powerful features that will transform your AI workflow.",
    icon: <Bot className="h-12 w-12 text-primary" />,
    features: [
      "Deploy and manage multiple AI agents",
      "Real-time monitoring and analytics",
      "Advanced testing and optimization tools",
      "Cost tracking and budget management",
    ],
    highlight: "Enterprise-grade AI agent platform",
  },
  {
    id: 2,
    title: "Agent Dashboard",
    description:
      "Monitor all your AI agents from a centralized dashboard with real-time KPIs and performance metrics.",
    icon: <Activity className="h-12 w-12 text-blue-500" />,
    features: [
      "Real-time performance tracking",
      "Success rate monitoring",
      "Response time analytics",
      "System uptime reports",
    ],
    highlight: "6 agents monitored • 92.1% success rate",
  },
  {
    id: 3,
    title: "Host an Agent",
    description:
      "Deploy new AI agents with our step-by-step deployment pipeline supporting both single and multi-agent architectures.",
    icon: <Rocket className="h-12 w-12 text-orange-500" />,
    features: [
      "Single & Multi-agent deployment",
      "Registry and tool configuration",
      "Server setup and testing",
      "Orchestration for complex workflows",
    ],
    highlight: "5-6 step deployment process",
  },
  {
    id: 4,
    title: "Playground Testing",
    description:
      "Test and optimize your agents with advanced playground features including prompt engineering and model comparison.",
    icon: <PlayCircle className="h-12 w-12 text-green-500" />,
    features: [
      "Interactive prompt testing",
      "Multi-message templates",
      "Model parameter tuning",
      "Cost tracking per test",
    ],
    highlight: "Advanced testing environment",
  },
  {
    id: 5,
    title: "Cost Management",
    description:
      "Track, analyze, and optimize your AI agent costs with comprehensive billing analytics and forecasting.",
    icon: <DollarSign className="h-12 w-12 text-yellow-500" />,
    features: [
      "Real-time cost tracking",
      "Usage pattern analysis",
      "Budget alerts and forecasting",
      "Entity-wise cost breakdown",
    ],
    highlight: "Smart cost optimization",
  },
  {
    id: 6,
    title: "Incident Management",
    description:
      "Comprehensive diagnostics and automated remediation system with SLO monitoring and smart rollback capabilities.",
    icon: <Shield className="h-12 w-12 text-red-500" />,
    features: [
      "Real-time error monitoring",
      "Automated root cause analysis",
      "SLO-based auto rollback",
      "Alert chain validation",
    ],
    highlight: "12m MTTR • 3 auto rollbacks",
  },
];

interface OnboardingTutorialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

export function OnboardingTutorial({
  open,
  onOpenChange,
  onComplete,
}: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setDirection("next");
      setCurrentStep(currentStep + 1);
    } else {
      // Tutorial completed
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection("prev");
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
    onOpenChange(false);
  };

  const handleComplete = () => {
    onComplete();
    onOpenChange(false);
  };

  const goToStep = (stepIndex: number) => {
    setDirection(stepIndex > currentStep ? "next" : "prev");
    setCurrentStep(stepIndex);
  };

  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;
  const step = tutorialSteps[currentStep];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">
                  AgentHub Tour
                </DialogTitle>
                <DialogDescription>
                  Discover the powerful features of your AI management platform
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {tutorialSteps.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep
                    ? "bg-primary scale-125"
                    : index < currentStep
                      ? "bg-primary/60"
                      : "bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        {/* Main Content */}
        <div className="relative overflow-hidden">
          <div
            className={`transition-all duration-500 ease-in-out ${
              direction === "next"
                ? "animate-in slide-in-from-right"
                : "animate-in slide-in-from-left"
            }`}
          >
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl shadow-lg">
                    {step.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {step.title}
                </CardTitle>
                <CardDescription className="text-lg mt-2 max-w-2xl mx-auto">
                  {step.description}
                </CardDescription>
                <Badge
                  variant="secondary"
                  className="mt-3 bg-primary/10 text-primary"
                >
                  {step.highlight}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {step.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-gray-100"
                    >
                      <div className="p-1.5 bg-primary/10 rounded-full">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Visual Preview based on step */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  {currentStep === 0 && (
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                        <Target className="h-4 w-4" />
                        Ready to transform your AI workflow?
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Active Agents", value: "6", color: "blue" },
                        {
                          label: "Success Rate",
                          value: "92.1%",
                          color: "green",
                        },
                        {
                          label: "Avg Response",
                          value: "185ms",
                          color: "orange",
                        },
                      ].map((metric, i) => (
                        <div
                          key={i}
                          className="text-center p-3 bg-white rounded-lg"
                        >
                          <div
                            className={`text-lg font-bold text-${metric.color}-600`}
                          >
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-500">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {(currentStep === 2 ||
                    currentStep === 3 ||
                    currentStep === 4 ||
                    currentStep === 5) && (
                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        Experience these features hands-on after the tutorial
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700"
            >
              Skip Tour
            </Button>

            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              {currentStep === tutorialSteps.length - 1 ? (
                <>
                  Get Started
                  <Rocket className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
