import { useState } from "react";
import { peers } from "@/data/mockData";
import PeerRow from "./PeerRow";
import { IconSearch, IconRefresh, IconArrowsSort } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Filter = "All" | "Online" | "Offline";

const columns = [
  { key: "name", label: "NAME" },
  { key: "address", label: "ADDRESS" },
  { key: "groups", label: "GROUPS" },
  { key: "lastSeen", label: "LAST SEEN" },
  { key: "os", label: "OS" },
  { key: "version", label: "VERSION" },
];

export default function PeersTable() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");

  const filtered = peers.filter((p) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Online" && p.status === "online") ||
      (filter === "Offline" && p.status === "offline");

    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.ip.includes(search) ||
      p.groups.some((g) => g.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div>
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
            placeholder="Search by name, IP or group..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm bg-nb-gray-920 border border-nb-gray-900
                       rounded text-nb-gray-100 placeholder-nb-gray-600
                       focus:outline-none focus:border-nb-gray-700 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-nb-gray-600 font-mono">
            ⌘K
          </span>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center rounded border border-nb-gray-900 overflow-hidden">
          {(["All", "Online", "Offline"] as Filter[]).map((f) => (
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
            toast("Peers refreshed", { icon: "↻", duration: 2000 })
          }
          className="p-2 rounded text-nb-gray-500 hover:text-nb-gray-300 hover:bg-nb-gray-920 transition-colors border border-nb-gray-900"
        >
          <IconRefresh size={14} />
        </button>

        {/* Add peer */}
        <button
          onClick={() =>
            toast(
              "Adding a peer requires the NetBird agent installed on a machine",
              {
                icon: "ℹ",
                duration: 3500,
              },
            )
          }
          className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-medium rounded bg-netbird text-white hover:bg-netbird-500 transition-colors"
        >
          + Add Peer
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
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <IconArrowsSort size={11} className="text-nb-gray-700" />
                  </div>
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
                  No peers match your search.
                </td>
              </tr>
            ) : (
              filtered.map((peer) => <PeerRow key={peer.id} peer={peer} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 px-1">
        <span className="text-xs text-nb-gray-600">
          Showing {filtered.length} of {peers.length} peers
        </span>
      </div>
    </div>
  );
}
