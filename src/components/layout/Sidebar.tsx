import { cn } from "@/lib/utils";
import {
  IconActivity,
  IconAdjustmentsHorizontal,
  IconChevronDown,
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
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavChild {
  label: string;
  to: string;
}

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  beta?: boolean;
  children?: NavChild[];
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
  {
    label: "Settings",
    to: "/settings",
    icon: <IconSettings size={17} />,
  },
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

interface SidebarProps {
  collapsed: boolean;
}

function NavItemRow({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const location = useLocation();
  const isChildActive = item.children?.some((child) =>
    location.pathname.startsWith(child.to),
  );
  const [open, setOpen] = useState<boolean>(isChildActive ?? false);

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => !collapsed && setOpen((prev) => !prev)}
          className={cn(
            "w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded transition-colors",
            isChildActive
              ? "text-nb-gray-200"
              : "text-nb-gray-400 hover:text-nb-gray-200 hover:bg-nb-gray-920",
          )}
          title={collapsed ? item.label : undefined}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          {!collapsed && (
            <>
              <span className="truncate">{item.label}</span>
              <IconChevronDown
                size={14}
                className={cn(
                  "ml-auto transition-transform duration-200 text-nb-gray-500 flex-shrink-0",
                  open && "rotate-180",
                )}
              />
            </>
          )}
        </button>

        {open && !collapsed && (
          <div className="ml-3 border-l border-nb-gray-900 mb-0.5">
            {item.children.map((child) => (
              <NavLink
                key={child.to}
                to={child.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-1.5 text-sm rounded transition-colors",
                    isActive
                      ? "text-nb-gray-100"
                      : "text-nb-gray-500 hover:text-nb-gray-200 hover:bg-nb-gray-920",
                  )
                }
              >
                {child.label}
              </NavLink>
            ))}
          </div>
        )}
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
        )
      }
      title={collapsed ? item.label : undefined}
    >
      <span className="flex-shrink-0">{item.icon}</span>
      {!collapsed && (
        <>
          <span className="truncate">{item.label}</span>
          {item.beta && (
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-nb-gray-800 text-nb-gray-400 font-medium flex-shrink-0">
              Beta
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen bg-nb-gray-950 border-r border-nb-gray-900",
        "flex flex-col z-20 transition-all duration-300 overflow-hidden",
        collapsed ? "w-16" : "w-[220px]",
      )}
    >
      {/* Logo (only shown when expanded) */}
      {!collapsed && (
        <div className="flex items-center gap-2 px-4 h-12 border-b border-nb-gray-900 flex-shrink-0">
          <span className="text-netbird font-bold text-lg">✦</span>
          <span className="text-nb-gray-100 font-semibold text-sm tracking-tight">
            netbird
          </span>
        </div>
      )}

      {/* Collapsed */}
      {collapsed && <div className="h-12 flex-shrink-0" />}

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 flex flex-col gap-0.5">
        {navItems.map((item) => (
          <NavItemRow key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div
        className={cn(
          "px-2 py-3 border-t border-nb-gray-900 flex flex-col gap-0.5",
        )}
      >
        {bottomItems.map((item) => (
          <NavItemRow key={item.to} item={item} collapsed={collapsed} />
        ))}

        {/* Plan indicator (hidden when collapsed) */}
        {!collapsed && (
          <div className="mt-2 px-3 py-2 rounded bg-nb-gray-920 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-nb-gray-800 flex items-center justify-center flex-shrink-0">
              <IconUsers size={12} className="text-nb-gray-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-nb-gray-100 font-medium">Free</span>
              <span className="text-[10px] text-nb-gray-500">1 of 5 Users</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
