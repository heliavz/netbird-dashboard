import { useState } from "react";
import { policies, type Policy } from "@/data/mockData";
import PolicyRow from "./PolicyRow";
import PolicyEditModal from "./PolicyEditModal";
import { IconSearch, IconRefresh } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type Filter = "All" | "Active" | "Inactive";

export default function PoliciesTable() {
  const [localPolicies, setLocalPolicies] = useState<Policy[]>(policies);
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);

  function handleToggleActive(id: string) {
    setLocalPolicies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)),
    );
  }

  const filtered = localPolicies.filter((p) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Active" && p.active) ||
      (filter === "Inactive" && !p.active);

    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

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
            placeholder="Search by name and description..."
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
          {(["All", "Active", "Inactive"] as Filter[]).map((f) => (
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

        <button className="p-2 rounded text-nb-gray-500 hover:text-nb-gray-300 hover:bg-nb-gray-920 transition-colors border border-nb-gray-900">
          <IconRefresh size={14} />
        </button>

        {/* Add policy */}
        <button className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-medium rounded bg-netbird text-white hover:bg-netbird-500 transition-colors">
          + Add Policy
        </button>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-nb-gray-900 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-nb-gray-900 bg-nb-gray-950">
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-nb-gray-500 tracking-wide w-[220px]">
                NAME
              </th>
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-nb-gray-500 tracking-wide w-[80px]">
                ACTIVE
              </th>
              <th
                className="px-4 py-2.5 text-left text-[11px] font-medium text-nb-gray-500 tracking-wide"
                colSpan={4}
              >
                SUMMARY
              </th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium text-nb-gray-500 tracking-wide w-[100px]">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-nb-gray-950">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-nb-gray-500 text-sm"
                >
                  No policies match your search.
                </td>
              </tr>
            ) : (
              filtered.map((policy) => (
                <PolicyRow
                  key={policy.id}
                  policy={policy}
                  onEdit={setEditingPolicy}
                  onToggleActive={handleToggleActive}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-3 px-1">
        <span className="text-xs text-nb-gray-600">
          Showing {filtered.length} of {localPolicies.length} policies
        </span>
      </div>

      {/* Edit modal */}
      <PolicyEditModal
        policy={editingPolicy}
        onClose={() => setEditingPolicy(null)}
      />
    </>
  );
}
