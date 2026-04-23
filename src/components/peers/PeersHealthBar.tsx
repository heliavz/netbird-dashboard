import { stats } from "@/data/mockData";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons-react";

export default function PeersHealthBar() {
  const onlinePercent = Math.round(
    (stats.onlinePeers / stats.totalPeers) * 100,
  );

  return (
    <div className="flex items-center gap-6 px-4 py-3 rounded-lg bg-nb-gray-920 border border-nb-gray-900 mb-5">
      {/* Counts */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <IconCircleCheck size={15} className="text-green-400" />
          <span className="text-sm text-nb-gray-100 font-medium">
            {stats.onlinePeers}
          </span>
          <span className="text-xs text-nb-gray-500">online</span>
        </div>
        <div className="flex items-center gap-1.5">
          <IconCircleDashed size={15} className="text-nb-gray-600" />
          <span className="text-sm text-nb-gray-100 font-medium">
            {stats.offlinePeers}
          </span>
          <span className="text-xs text-nb-gray-500">offline</span>
        </div>
      </div>

      {/* Bar */}
      <div className="flex-1 h-1.5 rounded-full bg-nb-gray-900 overflow-hidden">
        <div
          className="h-full rounded-full bg-green-400 transition-all duration-500"
          style={{ width: `${onlinePercent}%` }}
        />
      </div>

      <span className="text-xs text-nb-gray-500 flex-shrink-0">
        {stats.totalPeers} total
      </span>
    </div>
  );
}
