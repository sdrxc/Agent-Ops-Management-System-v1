import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSSOLogin = async () => {
    setIsLoading(true);
    // Simulate SSO login process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard after successful auth
      navigate("/");
    }, 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating elements for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main login container */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <Bot className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Agentrix</h1>
          <p className="text-white/80 text-lg">AI Agent Management Platform</p>
        </div>

        {/* Login card */}
        <Card className="backdrop-blur-md bg-white/95 border-0 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to access your agent dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* SSO Login Button */}
            <Button
              onClick={handleSSOLogin}
              disabled={isLoading}
              className="w-full h-12 text-lg font-medium bg-gradient-to-r from-[#30B7B5] to-[#EC7200] hover:from-[#2a9f9d] hover:to-[#d4630a] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Continue with SSO</span>
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Secure Enterprise Login
                </span>
              </div>
            </div>

            {/* Security note */}
            <div className="text-center text-sm text-gray-500 space-y-1">
              <p>Protected by enterprise-grade security</p>
              <p>Single Sign-On authentication required</p>
            </div>

            {/* Back to dashboard link */}
            <div className="text-center">
              <Link
                to="/"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-white/80 text-sm">
            ZS Associates | Copyright © {currentYear}
          </p>
        </footer>
      </div>
    </div>
  );
}
