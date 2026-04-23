import { cn } from "@/lib/utils";
import { groups, type Group } from "@/data/mockData";
import {
  IconSearch,
  IconRefresh,
  IconTrash,
  IconArrowsSort,
  IconShield,
  IconServer,
  IconRoute,
  IconWorldWww,
  IconNetwork,
} from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

type Filter = "All" | "Used" | "Unused";

const columns: {
  key: keyof Group | "actions";
  label: string;
  icon?: React.ReactNode;
  description: string;
}[] = [
  {
    key: "name",
    label: "NAME",
    description: "Group name",
  },
  {
    key: "peersCount",
    label: "PEERS",
    icon: <IconServer size={12} />,
    description: "Number of peers in this group",
  },
  {
    key: "policiesCount",
    label: "POLICIES",
    icon: <IconShield size={12} />,
    description: "Access control policies using this group",
  },
  {
    key: "routesCount",
    label: "ROUTES",
    icon: <IconRoute size={12} />,
    description: "Network routes using this group",
  },
  {
    key: "dnsCount",
    label: "DNS",
    icon: <IconWorldWww size={12} />,
    description: "DNS nameservers using this group",
  },
  {
    key: "actions",
    label: "",
    description: "Actions",
  },
];

function CountBadge({ value, active }: { value: number; active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 rounded text-xs font-medium border",
        active && value > 0
          ? "bg-nb-gray-900 border-nb-gray-700 text-nb-gray-200"
          : "bg-transparent border-transparent text-nb-gray-600",
      )}
    >
      {value}
    </span>
  );
}

function GroupRow({ group }: { group: Group }) {
  return (
    <tr className="border-b border-nb-gray-900 hover:bg-nb-gray-920 transition-colors">
      {/* Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-nb-gray-900 border border-nb-gray-800 flex items-center justify-center">
            <IconNetwork size={12} className="text-nb-gray-400" />
          </div>
          <span className="text-nb-gray-100 text-sm font-medium">
            {group.name}
          </span>
          {group.isDefault && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-nb-gray-900 border border-nb-gray-800 text-nb-gray-500">
              default
            </span>
          )}
          {/* Online indicator */}
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 ml-1" />
        </div>
      </td>

      {/* Peers */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <CountBadge value={group.peersCount} active={group.peersCount > 0} />
        </div>
      </td>

      {/* Policies */}
      <td className="px-4 py-3">
        <CountBadge
          value={group.policiesCount}
          active={group.policiesCount > 0}
        />
      </td>

      {/* Routes */}
      <td className="px-4 py-3">
        <CountBadge value={group.routesCount} active={group.routesCount > 0} />
      </td>

      {/* DNS */}
      <td className="px-4 py-3">
        <CountBadge value={group.dnsCount} active={group.dnsCount > 0} />
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-end">
          {!group.isDefault && (
            <button
              onClick={() =>
                toast(`Group "${group.name}" cannot be deleted in this demo`, {
                  icon: "⚠",
                  duration: 3000,
                })
              }
              className="p-1.5 rounded text-nb-gray-600 hover:text-red-400 hover:bg-nb-gray-900 transition-colors"
            >
              <IconTrash size={14} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export default function GroupsTable() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");

  const filtered = groups.filter((g) => {
    const isUsed = g.policiesCount > 0 || g.routesCount > 0 || g.dnsCount > 0;

    const matchesFilter =
      filter === "All" ||
      (filter === "Used" && isUsed) ||
      (filter === "Unused" && !isUsed);

    const matchesSearch =
      search === "" || g.name.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <IconSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-nb-gray-500"
          />
          <input
            type="text"
            placeholder="Search group by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-10 py-2 text-sm bg-nb-gray-920 border border-nb-gray-900
                       rounded text-nb-gray-100 placeholder-nb-gray-600
                       focus:outline-none focus:border-nb-gray-700 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-nb-gray-600 font-mono">
            ⌘K
          </span>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center rounded border border-nb-gray-900 overflow-hidden">
          {(["All", "Used", "Unused"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 text-xs transition-colors",
                filter === f
                  ? "bg-nb-gray-800 text-nb-gray-100"
                  : "text-nb-gray-500 hover:text-nb-gray-300 hover:bg-nb-gray-920",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <button
          onClick={() =>
            toast("Groups refreshed", { icon: "↻", duration: 2000 })
          }
          className="p-2 rounded text-nb-gray-500 hover:text-nb-gray-300 hover:bg-nb-gray-920 transition-colors border border-nb-gray-900"
        >
          <IconRefresh size={14} />
        </button>

        {/* Create group */}
        <button
          onClick={() =>
            toast("Create Group requires a live backend connection", {
              icon: "ℹ",
              duration: 3000,
            })
          }
          className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-medium rounded bg-netbird text-white hover:bg-netbird-500 transition-colors"
        >
          + Create Group
        </button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-nb-gray-900 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-nb-gray-900 bg-nb-gray-950">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2.5 text-left text-[11px] font-medium text-nb-gray-500 tracking-wide"
                  title={col.description}
                >
                  {col.label ? (
                    <div className="flex items-center gap-1.5">
                      {col.icon && (
                        <span className="text-nb-gray-600">{col.icon}</span>
                      )}
                      {col.label}
                      <IconArrowsSort size={11} className="text-nb-gray-700" />
                    </div>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-nb-gray-950">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-nb-gray-500 text-sm"
                >
                  No groups match your search.
                </td>
              </tr>
            ) : (
              filtered.map((group) => <GroupRow key={group.id} group={group} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-3 px-1">
        <span className="text-xs text-nb-gray-600">
          Showing {filtered.length} of {groups.length} groups
        </span>
      </div>
    </>
  );
}
