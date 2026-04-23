import { cn } from "@/lib/utils";
import { IconDeviceMobile, IconDevices, IconServer } from "@tabler/icons-react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

export type NodeData = {
  label: string;
  ip?: string;
  status?: "online" | "offline";
  kind?: "peer" | "group" | "network";
  os?: string;
  peerCount?: number;
  isSelected?: boolean;
};

function OSIcon({ os, size = 14 }: { os?: string; size?: number }) {
  if (os === "macos" || os === "ios") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-nb-gray-300"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  if (os === "windows") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-nb-gray-300"
      >
        <path d="M3 12V6.75l6-1.32v6.57H3zm17 0V5l-9 1.58V12h9zm-17 .75L3 18v-5.25h6v.75L3 12.75zm17 0H11v5.67L20 20v-7.25z" />
      </svg>
    );
  }
  if (os === "android") {
    return <IconDeviceMobile size={size} className="text-nb-gray-300" />;
  }
  if (os === "linux") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-nb-gray-300"
      >
        <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5zm-3 14h6l1 6H8l1-6z" />
      </svg>
    );
  }
  return <IconServer size={size} className="text-nb-gray-400" />;
}

export function PeerNode({ data }: NodeProps) {
  const nodeData = data as NodeData;
  const isOnline = nodeData.status === "online";

  return (
    <div
      className={cn(
        "relative flex flex-col items-start gap-1 px-3 py-2.5 rounded-lg border min-w-[140px]",
        "bg-nb-gray-920 shadow-lg transition-all duration-200",
        nodeData.isSelected
          ? "border-netbird shadow-netbird/20"
          : "border-nb-gray-800 hover:border-nb-gray-700",
      )}
    >
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-nb-blue !border-nb-gray-800 !w-2 !h-2"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-nb-blue !border-nb-gray-800 !w-2 !h-2"
      />

      <div className="flex items-center gap-2 w-full">
        {/* Status dot */}
        <div
          className={cn(
            "w-1.5 h-1.5 rounded-full flex-shrink-0",
            isOnline ? "bg-green-400" : "bg-nb-gray-600",
          )}
        />
        <OSIcon os={nodeData.os} size={13} />
        <span className="text-nb-gray-100 text-xs font-medium truncate">
          {nodeData.label}
        </span>
      </div>

      {nodeData.ip && (
        <span className="text-nb-gray-500 text-[10px] ml-[22px]">
          {nodeData.ip}
        </span>
      )}
    </div>
  );
}

export function GroupNode({ data }: NodeProps) {
  const nodeData = data as NodeData;

  return (
    <div className="flex flex-col items-start gap-1 px-3 py-2.5 rounded-lg border border-nb-gray-800 bg-nb-gray-930 min-w-[130px] shadow-lg">
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-nb-blue !border-nb-gray-800 !w-2 !h-2"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-nb-blue !border-nb-gray-800 !w-2 !h-2"
      />

      <div className="flex items-center gap-2">
        <IconDevices size={13} className="text-nb-gray-400 flex-shrink-0" />
        <span className="text-nb-gray-200 text-xs font-medium">
          {nodeData.label}
        </span>
      </div>

      {nodeData.peerCount !== undefined && (
        <span className="text-nb-gray-500 text-[10px] ml-[21px]">
          {nodeData.peerCount} peer{nodeData.peerCount !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}
