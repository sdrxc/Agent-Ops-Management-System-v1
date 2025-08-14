/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Agent types for the dashboard
 */
export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'error' | 'training' | 'testing';
  version: string;
  model: string;
  lastActivity: string;
  performance: {
    successRate: number;
    responseTime: number;
    uptime: number;
    errorRate: number;
  };
  sessions: {
    total: number;
    costPerSession: number;
  };
  tokens: {
    input: number;
    output: number;
    total: number;
  };
  tags: string[];
}

/**
 * Dashboard KPI metrics
 */
export interface DashboardMetrics {
  totalAgents: number;
  activeAgents: number;
  averagePerformance: number;
  totalTests: number;
  successRate: number;
  averageResponseTime: number;
}
