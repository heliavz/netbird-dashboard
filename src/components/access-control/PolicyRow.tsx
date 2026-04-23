import { cn } from "@/lib/utils";
import { type Policy } from "@/data/mockData";
import PolicySummary from "./PolicySummary";
import { IconChevronDown, IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

interface PolicyRowProps {
  policy: Policy;
  onEdit: (policy: Policy) => void;
  onToggleActive: (id: string) => void;
}

export default function PolicyRow({
  policy,
  onEdit,
  onToggleActive,
}: PolicyRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Main row */}
      <tr
        className={cn(
          "border-b border-nb-gray-900 transition-colors hover:bg-nb-gray-920 cursor-pointer",
        )}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {/* Name */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full flex-shrink-0",
                policy.active ? "bg-green-400" : "bg-nb-gray-600",
              )}
            />
            <span className="text-nb-gray-100 text-sm font-medium">
              {policy.name}
            </span>
          </div>
          {policy.description && (
            <p className="text-nb-gray-600 text-xs mt-0.5 ml-4 truncate max-w-[220px]">
              {policy.description}
            </p>
          )}
        </td>

        {/* Active toggle */}
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              onToggleActive(policy.id);
              toast(
                policy.active
                  ? `Policy "${policy.name}" disabled`
                  : `Policy "${policy.name}" enabled`,
                {
                  icon: policy.active ? "⏸" : "▶",
                  duration: 2500,
                },
              );
            }}
            className={cn(
              "w-8 h-4 rounded-full relative transition-colors cursor-pointer focus:outline-none",
              policy.active ? "bg-netbird" : "bg-nb-gray-800",
            )}
            title={policy.active ? "Disable policy" : "Enable policy"}
          >
            <div
              className={cn(
                "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-200",
                policy.active ? "translate-x-4" : "translate-x-0.5",
              )}
            />
          </button>
        </td>

        {/* Summary */}
        <td className="px-4 py-3" colSpan={4}>
          <PolicySummary policy={policy} />
        </td>

        {/* Actions */}
        {/* Actions */}
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-1 justify-end">
            <button
              onClick={() => onEdit(policy)}
              className="p-1.5 rounded text-nb-gray-500 hover:text-nb-gray-200 hover:bg-nb-gray-900 transition-colors"
              title="Edit policy"
            >
              <IconPencil size={14} />
            </button>
            <button
              className="p-1.5 rounded text-nb-gray-500 hover:text-red-400 hover:bg-nb-gray-900 transition-colors"
              title="Delete policy"
              onClick={() =>
                toast(
                  `Policy "${policy.name}" cannot be deleted in this demo`,
                  {
                    icon: "⚠",
                    duration: 3000,
                  },
                )
              }
            >
              <IconTrash size={14} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((prev) => !prev);
              }}
              className="p-1.5 rounded text-nb-gray-500 hover:text-nb-gray-200 hover:bg-nb-gray-900 transition-colors"
              title={expanded ? "Collapse" : "Expand"}
            >
              <IconChevronDown
                size={14}
                className={cn(
                  "transition-transform duration-200",
                  expanded && "rotate-180",
                )}
              />
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded detail row */}
      {expanded && (
        <tr className="border-b border-nb-gray-900 bg-nb-gray-960">
          <td colSpan={7} className="px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
              <div>
                <p className="text-nb-gray-600 uppercase tracking-wide mb-1.5 text-[10px]">
                  Sources
                </p>
                <div className="flex flex-wrap gap-1">
                  {policy.sources.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded bg-nb-gray-900 border border-nb-gray-800 text-nb-gray-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-nb-gray-600 uppercase tracking-wide mb-1.5 text-[10px]">
                  Destinations
                </p>
                <div className="flex flex-wrap gap-1">
                  {policy.destinations.map((d) => (
                    <span
                      key={d}
                      className="px-2 py-0.5 rounded bg-nb-gray-900 border border-nb-gray-800 text-nb-gray-300"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-nb-gray-600 uppercase tracking-wide mb-1.5 text-[10px]">
                  Protocol
                </p>
                <span className="px-2 py-0.5 rounded bg-nb-gray-900 border border-nb-gray-800 text-nb-gray-300">
                  {policy.protocol}
                </span>
              </div>

              <div>
                <p className="text-nb-gray-600 uppercase tracking-wide mb-1.5 text-[10px]">
                  Ports
                </p>
                <span className="text-nb-gray-400">
                  {policy.ports.length > 0 ? policy.ports.join(", ") : "All"}
                </span>
              </div>

              <div>
                <p className="text-nb-gray-600 uppercase tracking-wide mb-1.5 text-[10px]">
                  Direction
                </p>
                <span className="text-nb-gray-400 capitalize">
                  {policy.direction}
                </span>
              </div>

              <div>
                <p className="text-nb-gray-600 uppercase tracking-wide mb-1.5 text-[10px]">
                  Posture Checks
                </p>
                <span className="text-nb-gray-600">
                  {policy.postureChecks.length > 0
                    ? policy.postureChecks.join(", ")
                    : "None"}
                </span>
              </div>

              <div>
                <p className="text-nb-gray-600 uppercase tracking-wide mb-1.5 text-[10px]">
                  Status
                </p>
                <div className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      policy.active ? "bg-green-400" : "bg-nb-gray-600",
                    )}
                  />
                  <span className="text-nb-gray-400">
                    {policy.active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
