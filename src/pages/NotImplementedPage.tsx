import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconLayoutDashboard,
  IconServer,
  IconShield,
  IconNetwork,
} from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";

const implementedPages = [
  {
    label: "Control Center",
    to: "/",
    icon: <IconLayoutDashboard size={15} />,
    description: "Network overview, topology map, getting started",
  },
  {
    label: "Peers",
    to: "/peers",
    icon: <IconServer size={15} />,
    description: "All connected machines with health summary",
  },
  {
    label: "Access Control — Policies",
    to: "/access-control/policies",
    icon: <IconShield size={15} />,
    description: "Expandable policy rows with plain-english summaries",
  },
  {
    label: "Access Control — Groups",
    to: "/access-control/groups",
    icon: <IconNetwork size={15} />,
    description: "Groups table with labeled column headers",
  },
];

export default function NotImplementedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const pageName =
    location.pathname
      .split("/")
      .filter(Boolean)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "))
      .join(" — ") || "This page";

  return (
    <div className="max-w-xl mx-auto mt-16 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded text-nb-gray-500 hover:text-nb-gray-200 hover:bg-nb-gray-920 transition-colors"
        >
          <IconArrowLeft size={16} />
        </button>
        <h1 className="text-nb-gray-100 text-xl font-semibold">{pageName}</h1>
      </div>

      <p className="text-nb-gray-500 text-sm mb-8 ml-9">
        This page is not part of this demo. The rebuild is focused on the areas
        with the most significant UX improvements.
      </p>

      {/* Divider */}
      <div className="ml-9 border-t border-nb-gray-900 mb-6" />

      {/* Implemented pages */}
      <div className="ml-9">
        <p className="text-xs text-nb-gray-600 uppercase tracking-wide mb-3">
          Pages included in this demo
        </p>
        <div className="flex flex-col gap-2">
          {implementedPages.map((page) => (
            <button
              key={page.to}
              onClick={() => navigate(page.to)}
              className={cn(
                "flex items-start gap-3 px-4 py-3 rounded-lg border text-left",
                "border-nb-gray-900 bg-nb-gray-920 hover:border-nb-gray-800",
                "transition-colors group",
              )}
            >
              <span className="text-netbird mt-0.5 flex-shrink-0">
                {page.icon}
              </span>
              <div>
                <p className="text-nb-gray-100 text-sm font-medium group-hover:text-white transition-colors">
                  {page.label}
                </p>
                <p className="text-nb-gray-500 text-xs mt-0.5">
                  {page.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
