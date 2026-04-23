import { cn } from "@/lib/utils";
import {
  IconActivity,
  IconAdjustmentsHorizontal,
  IconCode,
  IconFileDescription,
  IconKey,
  IconLayoutDashboard,
  IconNetwork,
  IconRoute,
  IconServer,
  IconSettings,
  IconShield,
  IconUsers,
  IconWorldWww,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  beta?: boolean;
  children?: { label: string; to: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Control Center",
    to: "/",
    icon: <IconLayoutDashboard size={17} />,
    beta: true,
  },
  {
    label: "Peers",
    to: "/peers",
    icon: <IconServer size={17} />,
  },
  {
    label: "Setup Keys",
    to: "/setup-keys",
    icon: <IconKey size={17} />,
  },
  {
    label: "Access Control",
    to: "/access-control",
    icon: <IconShield size={17} />,
    children: [
      { label: "Policies", to: "/access-control/policies" },
      { label: "Groups", to: "/access-control/groups" },
      { label: "Posture Checks", to: "/access-control/posture-checks" },
    ],
  },
  {
    label: "Networks",
    to: "/networks",
    icon: <IconNetwork size={17} />,
  },
  {
    label: "Network Routes",
    to: "/network-routes",
    icon: <IconRoute size={17} />,
  },
  {
    label: "DNS",
    to: "/dns",
    icon: <IconWorldWww size={17} />,
    children: [
      { label: "Nameservers", to: "/dns/nameservers" },
      { label: "Zones", to: "/dns/zones" },
      { label: "Settings", to: "/dns/settings" },
    ],
  },
  {
    label: "Team",
    to: "/team",
    icon: <IconUsers size={17} />,
    children: [
      { label: "Users", to: "/team/users" },
      { label: "Service Users", to: "/team/service-users" },
    ],
  },
  {
    label: "Activity",
    to: "/activity",
    icon: <IconActivity size={17} />,
    children: [
      { label: "Audit Events", to: "/activity/audit" },
      { label: "Traffic Events", to: "/activity/traffic" },
    ],
  },
];

const bottomItems: NavItem[] = [
  { label: "Settings", to: "/settings", icon: <IconSettings size={17} /> },
  {
    label: "Integrations",
    to: "/integrations",
    icon: <IconAdjustmentsHorizontal size={17} />,
  },
  {
    label: "Documentation",
    to: "/docs",
    icon: <IconFileDescription size={17} />,
  },
];

function NavItemRow({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const isChild = depth > 0;

  if (item.children) {
    return (
      <div>
        <div
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 text-nb-gray-400 text-sm rounded cursor-default select-none",
            "hover:text-nb-gray-200 hover:bg-nb-gray-920",
          )}
        >
          {item.icon}
          <span>{item.label}</span>
          {item.beta && (
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-nb-gray-800 text-nb-gray-400 font-medium">
              Beta
            </span>
          )}
        </div>
        <div className="ml-3 border-l border-nb-gray-900">
          {item.children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-4 py-1.5 text-sm rounded transition-colors",
                  isActive
                    ? "text-nb-gray-100 bg-nb-gray-920"
                    : "text-nb-gray-500 hover:text-nb-gray-200 hover:bg-nb-gray-920",
                )
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2.5 px-3 py-2 text-sm rounded transition-colors",
          isActive
            ? "text-nb-gray-100 bg-nb-gray-920"
            : "text-nb-gray-400 hover:text-nb-gray-200 hover:bg-nb-gray-920",
          isChild && "pl-6",
        )
      }
    >
      {!isChild && item.icon}
      <span>{item.label}</span>
      {item.beta && (
        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-nb-gray-800 text-nb-gray-400 font-medium">
          Beta
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-[220px] bg-nb-gray-950 border-r border-nb-gray-900 flex flex-col z-20">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-nb-gray-900">
        <img
          src="/netbird-logo.svg"
          alt="NetBird"
          className="h-6"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <span className="text-nb-gray-100 font-semibold text-base tracking-tight">
          netbird
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 flex flex-col gap-0.5">
        {navItems.map((item) => (
          <NavItemRow key={item.to} item={item} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-2 py-3 border-t border-nb-gray-900 flex flex-col gap-0.5">
        {bottomItems.map((item) => (
          <NavItemRow key={item.to} item={item} />
        ))}

        {/* Plan indicator */}
        <div className="mt-2 px-3 py-2 rounded bg-nb-gray-920 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-nb-gray-800 flex items-center justify-center">
            <IconUsers size={12} className="text-nb-gray-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-nb-gray-100 font-medium">Free</span>
            <span className="text-[10px] text-nb-gray-500">1 of 5 Users</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
