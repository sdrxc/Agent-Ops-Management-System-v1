import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Play, Plus, RotateCcw, X } from "lucide-react";
import { Agent } from "@shared/api";

interface AgentPlaygroundProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
}

interface TestResult {
  id: string;
  prompt: string;
  response: string;
  timestamp: string;
  status: 'success' | 'error' | 'running';
  responseTime: number;
  cost: number;
}

interface Variable {
  key: string;
  value: string;
}

export function AgentPlayground({ agent, isOpen, onClose }: AgentPlaygroundProps) {
  const [activeTab, setActiveTab] = useState("default");
  const [systemPrompt, setSystemPrompt] = useState("You are an expert in geography");
  const [userPrompt, setUserPrompt] = useState("What is the capital of {{country}}?");
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [variables, setVariables] = useState<Variable[]>([
    { key: "country", value: "India" }
  ]);
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      id: "1",
      prompt: "What is the capital of India?",
      response: "The capital of India is New Delhi.",
      timestamp: "1s",
      status: "success",
      responseTime: 1.67,
      cost: 0.000052
    }
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const addVariable = () => {
    setVariables([...variables, { key: "", value: "" }]);
  };

  const updateVariable = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...variables];
    updated[index][field] = value;
    setVariables(updated);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const runTest = async () => {
    setIsRunning(true);
    
    // Replace variables in the prompt
    let processedPrompt = userPrompt;
    variables.forEach(variable => {
      if (variable.key && variable.value) {
        processedPrompt = processedPrompt.replace(`{{${variable.key}}}`, variable.value);
      }
    });

    // Simulate API call
    setTimeout(() => {
      const newResult: TestResult = {
        id: Date.now().toString(),
        prompt: processedPrompt,
        response: `Mock response for: ${processedPrompt}`,
        timestamp: "0s",
        status: "success",
        responseTime: Math.random() * 3,
        cost: Math.random() * 0.001
      };
      
      setTestResults([newResult, ...testResults]);
      setIsRunning(false);
    }, 2000);
  };

  const addTestCase = () => {
    // In a real implementation, this would allow adding predefined test cases
    alert("Add test case functionality would be implemented here");
  };

  if (!agent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">
              Playground - {agent.name}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Compare
              </Button>
              <Button variant="outline" size="sm">
                Variant
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Configuration */}
          <div className="w-1/2 border-r overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="default">default</TabsTrigger>
                  <TabsTrigger value="last_modified">Last modified</TabsTrigger>
                </TabsList>

                <TabsContent value="default" className="mt-4 space-y-6">
                  {/* Model Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
                        <SelectItem value="gpt-4">gpt-4</SelectItem>
                        <SelectItem value="gpt-4-turbo">gpt-4-turbo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* System Prompt */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">System</Label>
                    <Textarea
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      placeholder="Enter system prompt..."
                      className="min-h-[80px]"
                    />
                  </div>

                  {/* User Prompt */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">User</Label>
                    <Textarea
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="Enter user prompt..."
                      className="min-h-[80px]"
                    />
                  </div>

                  {/* Variables */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">Variables</Label>
                      <Button variant="outline" size="sm" onClick={addVariable}>
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {variables.map((variable, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            placeholder="Key"
                            value={variable.key}
                            onChange={(e) => updateVariable(index, 'key', e.target.value)}
                            className="flex-1"
                          />
                          <Input
                            placeholder="Value"
                            value={variable.value}
                            onChange={(e) => updateVariable(index, 'value', e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeVariable(index)}
                            className="h-8 w-8"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Run Button */}
                  <Button 
                    onClick={runTest} 
                    disabled={isRunning}
                    className="w-full"
                  >
                    {isRunning ? (
                      <>
                        <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="w-1/2 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Generations</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Clear
                  </Button>
                  <Button variant="outline" size="sm">
                    Load test set
                  </Button>
                  <Button variant="outline" size="sm">
                    Add all to test set
                  </Button>
                  <Button variant="default" size="sm">
                    Run all
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {testResults.map((result) => (
                  <Card key={result.id} className="border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {result.status === 'success' && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          {result.status === 'running' && (
                            <Clock className="h-4 w-4 text-yellow-500" />
                          )}
                          <Badge variant="outline">SUCCESS</Badge>
                          <span className="text-sm text-gray-500">{result.responseTime.toFixed(2)}s</span>
                          <span className="text-sm text-gray-500">32 / $0.{result.cost.toFixed(6).split('.')[1]}</span>
                        </div>
                        <span className="text-sm text-gray-500">{result.timestamp}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-xs text-gray-500 uppercase">Prompt</Label>
                        <p className="text-sm mt-1">{result.prompt}</p>
                      </div>
                      <Separator />
                      <div>
                        <Label className="text-xs text-gray-500 uppercase">Response</Label>
                        <p className="text-sm mt-1">{result.response}</p>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" onClick={addTestCase}>
                          Test case
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
