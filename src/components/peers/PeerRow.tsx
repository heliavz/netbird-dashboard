import { cn } from "@/lib/utils";
import { type Peer } from "@/data/mockData";
import {
  IconBrandApple,
  IconBrandWindows,
  IconBrandAndroid,
  IconClock,
  IconServer,
} from "@tabler/icons-react";

function OSIcon({ os }: { os: Peer["os"] }) {
  const cls = "text-nb-gray-400";
  const size = 15;
  switch (os) {
    case "macos":
    case "ios":
      return <IconBrandApple size={size} className={cls} />;
    case "windows":
      return <IconBrandWindows size={size} className={cls} />;
    case "android":
      return <IconBrandAndroid size={size} className={cls} />;
    case "linux":
    default:
      return <IconServer size={size} className={cls} />;
  }
}

function FlagEmoji({ country }: { country: string }) {
  const flags: Record<string, string> = {
    DE: "🇩🇪",
    US: "🇺🇸",
    GB: "🇬🇧",
    FR: "🇫🇷",
  };
  return (
    <span className="text-sm" title={country}>
      {flags[country] ?? "🌐"}
    </span>
  );
}

interface PeerRowProps {
  peer: Peer;
}

export default function PeerRow({ peer }: PeerRowProps) {
  const isOnline = peer.status === "online";

  return (
    <tr
      className={cn(
        "border-b border-nb-gray-900 transition-colors hover:bg-nb-gray-920",
        !isOnline && "opacity-60",
      )}
    >
      {/* Status + Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "w-2 h-2 rounded-full flex-shrink-0",
              isOnline ? "bg-green-400" : "bg-nb-gray-600",
            )}
          />
          <span className="text-nb-gray-100 text-sm font-medium">
            {peer.name}
          </span>
        </div>
      </td>

      {/* Address */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <FlagEmoji country={peer.country} />
          <div className="flex flex-col">
            <span className="text-nb-gray-300 text-xs">{peer.fqdn}</span>
            <span className="text-nb-gray-500 text-xs">{peer.ip}</span>
          </div>
        </div>
      </td>

      {/* Groups */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {peer.groups.map((group) => (
            <span
              key={group}
              className="inline-flex items-center px-2 py-0.5 rounded text-[11px] bg-nb-gray-900 text-nb-gray-300 border border-nb-gray-800"
            >
              {group}
            </span>
          ))}
        </div>
      </td>

      {/* Last seen */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5 text-nb-gray-500 text-xs">
          <IconClock size={13} />
          {peer.lastSeen}
        </div>
      </td>

      {/* OS */}
      <td className="px-4 py-3">
        <OSIcon os={peer.os} />
      </td>

      {/* Version */}
      <td className="px-4 py-3">
        <span className="text-nb-gray-500 text-xs">{peer.version}</span>
      </td>
    </tr>
  );
}
