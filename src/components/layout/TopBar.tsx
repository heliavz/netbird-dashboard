import { cn } from "@/lib/utils";
import {
  IconHelp,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

interface TopBarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function TopBar({ collapsed, onToggleCollapse }: TopBarProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-12 bg-nb-gray-950 border-b border-nb-gray-900",
        "flex items-center z-10 transition-all duration-300",
      )}
      style={{ left: collapsed ? "64px" : "220px" }}
    >
      {/* Left side: logo + collapse toggle */}
      <div className="flex items-center gap-1 px-3 border-r border-nb-gray-900 h-full">
        {collapsed && (
          <Link to="/" className="flex items-center gap-2 mr-2">
            <span className="text-netbird font-bold text-lg">✦</span>
            <span className="text-nb-gray-100 font-semibold text-sm tracking-tight">
              netbird
            </span>
          </Link>
        )}
        <button
          onClick={onToggleCollapse}
          className="w-7 h-7 flex items-center justify-center rounded
                     text-nb-gray-500 hover:text-nb-gray-200 hover:bg-nb-gray-920
                     transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <IconLayoutSidebarLeftExpand size={17} />
          ) : (
            <IconLayoutSidebarLeftCollapse size={17} />
          )}
        </button>
      </div>

      {/* Right side: help + avatar */}
      <div className="flex items-center gap-2 px-4 ml-auto">
        <button
          className="w-7 h-7 flex items-center justify-center rounded-full
                     text-nb-gray-500 hover:text-nb-gray-200 hover:bg-nb-gray-920
                     transition-colors border border-nb-gray-900"
          title="Help"
        >
          <IconHelp size={15} />
        </button>

        {/* Avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className={cn(
              "w-7 h-7 rounded-full border flex items-center justify-center",
              "text-xs font-medium text-nb-gray-200 transition-colors",
              "bg-nb-gray-700 hover:border-nb-gray-500",
              profileOpen ? "border-netbird" : "border-nb-gray-600",
            )}
            title="Profile"
          >
            HV
          </button>

          {profileOpen && (
            <ProfileDropdown onClose={() => setProfileOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
}
