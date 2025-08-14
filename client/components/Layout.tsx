import { Button } from "@/components/ui/button";
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";
import { UserProfileModal } from "@/components/UserProfileModal";
import { Bot, Menu, Search, Settings, User, Moon, Sun } from "lucide-react";
import { ReactNode, useState } from "react";
import { useTheme } from "next-themes";

interface LayoutProps {
  children: ReactNode;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function Layout({ children, searchQuery = "", onSearchChange }: LayoutProps) {
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex">
      {/* Sidebar */}
      <CollapsibleSidebar className="h-screen sticky top-0" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="px-4">
            <div className="flex h-16 items-center justify-between">
              {/* Search */}
              <div className="hidden md:flex flex-1 justify-start max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search agents..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-auto">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  title="Toggle dark mode"
                >
                  {theme === "light" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsUserProfileOpen(true)}
                  title="User profile"
                >
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 py-8 overflow-auto">
          {children}
        </main>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
      />
    </div>
  );
}
