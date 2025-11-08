import { Activity } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">GlycoCare+</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link to="/dashboard">
              <Button variant={isActive("/dashboard") ? "default" : "ghost"}>
                Dashboard
              </Button>
            </Link>
            <Link to="/analyze">
              <Button variant={isActive("/analyze") ? "default" : "ghost"}>
                Analyze
              </Button>
            </Link>
            <Link to="/planner">
              <Button variant={isActive("/planner") ? "default" : "ghost"}>
                Planner
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant={isActive("/chat") ? "default" : "ghost"}>
                Chat
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant={isActive("/profile") ? "default" : "ghost"}>
                Profile
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
