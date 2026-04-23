import GettingStartedChecklist from "@/components/control-center/GettingStartedChecklist";
import NetworkMap from "@/components/control-center/NetworkMap";
import SummaryBar from "@/components/control-center/SummaryBar";
import { peers } from "@/data/mockData";
import { useState } from "react";

export default function ControlCenterPage() {
  const [viewMode, setViewMode] = useState<"empty" | "populated">("empty");
  const hasPeers = peers.length > 0;

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-nb-gray-100 text-xl font-semibold">
              Control Center
            </h1>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-nb-gray-800 text-nb-gray-400 font-medium">
              Beta
            </span>
          </div>
          <p className="text-nb-gray-500 text-sm">
            Live overview of your private network topology.
          </p>
        </div>

        {/* Toggle for demo purposes */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-nb-gray-920 border border-nb-gray-900">
          <button
            onClick={() => setViewMode("populated")}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              viewMode === "populated"
                ? "bg-nb-gray-800 text-nb-gray-100"
                : "text-nb-gray-500 hover:text-nb-gray-300"
            }`}
          >
            With data
          </button>
          <button
            onClick={() => setViewMode("empty")}
            className={`px-3 py-1.5 text-xs rounded transition-colors ${
              viewMode === "empty"
                ? "bg-nb-gray-800 text-nb-gray-100"
                : "text-nb-gray-500 hover:text-nb-gray-300"
            }`}
          >
            Empty state
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "empty" || !hasPeers ? (
        <GettingStartedChecklist />
      ) : (
        <>
          <SummaryBar />

          {/* Map tabs */}
          <div className="flex items-center gap-1 mb-4 border-b border-nb-gray-900">
            {["Peers", "Groups", "Networks"].map((tab) => (
              <button
                key={tab}
                className="px-4 py-2 text-sm text-nb-gray-400 border-b-2 border-transparent
                           hover:text-nb-gray-200 transition-colors
                           first:text-nb-gray-100 first:border-netbird"
              >
                {tab}
              </button>
            ))}
          </div>

          <NetworkMap />
        </>
      )}
    </div>
  );
}
