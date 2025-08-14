import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Zap, Bot } from "lucide-react";

export default function Playground() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <PlayCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Playground</h1>
              <p className="text-gray-600 mt-1">
                Test and experiment with your AI agents in real-time
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Card */}
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader className="pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Zap className="h-12 w-12 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Playground Coming Soon</CardTitle>
            <CardDescription className="text-lg">
              We're building an amazing playground experience for testing your agents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-medium">Interactive Testing</span>
                <span className="text-gray-500 text-center">
                  Test agents with real prompts
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg">
                <PlayCircle className="h-6 w-6 text-primary" />
                <span className="font-medium">Live Results</span>
                <span className="text-gray-500 text-center">
                  See responses in real-time
                </span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 bg-gray-50 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
                <span className="font-medium">Performance Metrics</span>
                <span className="text-gray-500 text-center">
                  Track speed and accuracy
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              This feature is currently under development. Continue using the test functionality 
              in the agent cards on the dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
