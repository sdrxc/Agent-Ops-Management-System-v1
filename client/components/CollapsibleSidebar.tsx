import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  PlayCircle,
  AlertTriangle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "agenthub",
    label: "AgentHub",
    icon: Bot,
    href: "/",
  },
  {
    id: "incident-reporting",
    label: "Incident Reporting",
    icon: AlertTriangle,
    href: "/incident-reporting",
  },
  {
    id: "cost-estimation",
    label: "Cost Estimation",
    icon: DollarSign,
    href: "/cost-estimation",
  },
];

interface CollapsibleSidebarProps {
  className?: string;
}

export function CollapsibleSidebar({ className }: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-background border-r border-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 min-h-[64px]">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-primary rounded-md">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Agentrix
              </h2>
              <p className="text-xs text-muted-foreground">AI Management</p>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 shrink-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link key={item.id} to={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    isCollapsed && "justify-center px-0",
                    isActive &&
                      "bg-primary/10 text-primary hover:bg-primary/15",
                  )}
                >
                  <IconComponent className="h-4 w-4 shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className="ml-auto bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        {!isCollapsed ? (
          <div className="text-xs text-muted-foreground text-center">
            <p>ZS Associates</p>
            <p>© {new Date().getFullYear()}</p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}
