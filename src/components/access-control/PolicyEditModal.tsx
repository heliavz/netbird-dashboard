import { cn } from "@/lib/utils";
import { type Policy } from "@/data/mockData";
import {
  IconArrowsLeftRight,
  IconArrowRight,
  IconShield,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";

interface PolicyEditModalProps {
  policy: Policy | null;
  onClose: () => void;
}

type Tab = "name" | "policy" | "posture";

export default function PolicyEditModal({
  policy,
  onClose,
}: PolicyEditModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("name");

  if (!policy) return null;

  const tabs: { key: Tab; label: string }[] = [
    { key: "name", label: "Name & Description" },
    { key: "policy", label: "Policy" },
    { key: "posture", label: "Posture Checks" },
  ];

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="w-full max-w-lg bg-nb-gray-925 rounded-xl border border-nb-gray-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-3 px-5 pt-5 pb-4 border-b border-nb-gray-900">
          <div className="w-9 h-9 rounded-lg bg-netbird/10 border border-netbird/20 flex items-center justify-center flex-shrink-0">
            <IconShield size={18} className="text-netbird" />
          </div>
          <div className="flex-1">
            <h2 className="text-nb-gray-100 font-semibold text-sm">
              {policy.id === "new"
                ? "Create Access Control Policy"
                : "Update Access Control Policy"}
            </h2>
            <p className="text-nb-gray-500 text-xs mt-0.5">
              Use this policy to restrict access to groups of resources.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-nb-gray-500 hover:text-nb-gray-200 transition-colors"
          >
            <IconX size={16} />
          </button>
        </div>

        {/* Tabs: Name first, then Policy, then Posture */}
        <div className="flex items-center gap-1 px-5 border-b border-nb-gray-900">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-3 py-3 text-xs transition-colors border-b-2 -mb-px",
                activeTab === tab.key
                  ? "text-netbird border-netbird"
                  : "text-nb-gray-500 border-transparent hover:text-nb-gray-300",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="px-5 py-5 flex flex-col gap-5">
          {/* Name & Description tab */}
          {activeTab === "name" && (
            <>
              <div>
                <label className="block text-xs font-medium text-nb-gray-300 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={policy.name}
                  className="w-full px-3 py-2 text-sm bg-nb-gray-920 border border-nb-gray-800
                             rounded text-nb-gray-100 placeholder-nb-gray-600
                             focus:outline-none focus:border-nb-gray-700 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-nb-gray-300 mb-1.5">
                  Description{" "}
                  <span className="text-nb-gray-600 font-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  defaultValue={policy.description}
                  rows={3}
                  className="w-full px-3 py-2 text-sm bg-nb-gray-920 border border-nb-gray-800
                             rounded text-nb-gray-100 placeholder-nb-gray-600
                             focus:outline-none focus:border-nb-gray-700 transition-colors resize-none"
                />
              </div>
            </>
          )}

          {/* Policy tab */}
          {activeTab === "policy" && (
            <>
              {/* Protocol */}
              <div>
                <label className="block text-xs font-medium text-nb-gray-300 mb-1">
                  Protocol
                </label>
                <p className="text-xs text-nb-gray-600 mb-2">
                  Allow only specified network protocols. To change traffic
                  direction and ports, select TCP or UDP.
                </p>
                <select
                  defaultValue={policy.protocol}
                  className="px-3 py-2 text-sm bg-nb-gray-920 border border-nb-gray-800
                             rounded text-nb-gray-100 focus:outline-none focus:border-nb-gray-700
                             transition-colors"
                >
                  {["ALL", "TCP", "UDP", "ICMP"].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Source / Direction / Destination */}
              <div className="flex items-start gap-3">
                {/* Source */}
                <div className="flex-1">
                  <label className="block text-xs font-medium text-nb-gray-300 mb-1.5">
                    Source
                  </label>
                  <div className="min-h-[40px] px-3 py-2 rounded border border-nb-gray-800 bg-nb-gray-920 flex flex-wrap gap-1">
                    {policy.sources.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-nb-gray-900 border border-nb-gray-700 text-nb-gray-200 text-xs"
                      >
                        {s}
                        <button className="text-nb-gray-600 hover:text-nb-gray-300">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direction toggle */}
                <div className="flex flex-col items-center gap-1 pt-6">
                  <p className="text-[10px] text-nb-gray-600 mb-1">Direction</p>
                  <div className="flex flex-col gap-1">
                    <button
                      className={cn(
                        "flex items-center justify-center w-8 h-6 rounded border transition-colors",
                        policy.direction === "bidirectional"
                          ? "border-nb-blue bg-nb-blue/10 text-nb-blue"
                          : "border-nb-gray-800 text-nb-gray-600",
                      )}
                      title="Bidirectional"
                    >
                      <IconArrowsLeftRight size={13} />
                    </button>
                    <button
                      className={cn(
                        "flex items-center justify-center w-8 h-6 rounded border transition-colors",
                        policy.direction === "unidirectional"
                          ? "border-netbird bg-netbird/10 text-netbird"
                          : "border-nb-gray-800 text-nb-gray-600",
                      )}
                      title="Unidirectional"
                    >
                      <IconArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Destination */}
                <div className="flex-1">
                  <label className="block text-xs font-medium text-nb-gray-300 mb-1.5">
                    Destination
                  </label>
                  <div className="min-h-[40px] px-3 py-2 rounded border border-nb-gray-800 bg-nb-gray-920 flex flex-wrap gap-1">
                    {policy.destinations.map((d) => (
                      <span
                        key={d}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-nb-gray-900 border border-nb-gray-700 text-nb-gray-200 text-xs"
                      >
                        {d}
                        <button className="text-nb-gray-600 hover:text-nb-gray-300">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ports */}
              <div>
                <label className="block text-xs font-medium text-nb-gray-300 mb-1">
                  Ports
                </label>
                <p className="text-xs text-nb-gray-600 mb-2">
                  Allow network traffic only to specified ports or port ranges
                  between 1 and 65535.
                </p>
                <input
                  type="text"
                  defaultValue={policy.ports.join(", ")}
                  placeholder="e.g. 22, 443, 8000-8080"
                  className="w-full px-3 py-2 text-sm bg-nb-gray-920 border border-nb-gray-800
                             rounded text-nb-gray-100 placeholder-nb-gray-600
                             focus:outline-none focus:border-nb-gray-700 transition-colors"
                />
              </div>

              {/* Enable toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-nb-gray-900 bg-nb-gray-920">
                <div>
                  <p className="text-xs font-medium text-nb-gray-200">
                    Enable Policy
                  </p>
                  <p className="text-xs text-nb-gray-600 mt-0.5">
                    Use this switch to enable or disable the policy.
                  </p>
                </div>
                <div
                  className={cn(
                    "w-9 h-5 rounded-full relative transition-colors cursor-pointer",
                    policy.active ? "bg-netbird" : "bg-nb-gray-800",
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                      policy.active ? "translate-x-4" : "translate-x-0.5",
                    )}
                  />
                </div>
              </div>
            </>
          )}

          {/* Posture Checks tab */}
          {activeTab === "posture" && (
            <div className="py-6 flex flex-col items-center gap-3 text-center">
              <div className="w-10 h-10 rounded-lg bg-nb-gray-900 flex items-center justify-center">
                <IconShield size={18} className="text-nb-gray-600" />
              </div>
              <p className="text-nb-gray-400 text-sm font-medium">
                No posture checks assigned
              </p>
              <p className="text-nb-gray-600 text-xs max-w-xs">
                Posture checks allow you to restrict access based on device
                health, OS version, or location. Available on the Business plan.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-nb-gray-900">
          <a
            href="https://docs.netbird.io/how-to/manage-network-access"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-netbird hover:text-netbird-300 transition-colors"
          >
            Learn more about Access Controls ↗
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-nb-gray-400 hover:text-nb-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded bg-netbird text-white hover:bg-netbird-500 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
