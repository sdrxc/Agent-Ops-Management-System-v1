import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    // Close the modal first
    onClose();

    // Navigate to login page
    navigate("/login");

    // In a real app, you would also clear authentication tokens/session here
    // localStorage.removeItem('authToken');
    // or call logout API
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-4 z-50">
      <div
        ref={modalRef}
        className="bg-background border border-border rounded-lg shadow-lg p-4 w-72 animate-in slide-in-from-top-2 duration-200"
      >
        {/* User info section */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              SS
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Shivam Shivam</h3>
            <p className="text-xs text-muted-foreground">Enterprise Architect</p>
          </div>
        </div>

        {/* Actions section */}
        <Button
          variant="destructive"
          size="sm"
          className="w-full justify-start h-8"
          onClick={handleLogout}
        >
          <LogOut className="h-3 w-3 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
