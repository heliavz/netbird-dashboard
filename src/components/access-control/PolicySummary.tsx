import { type Policy } from "@/data/mockData";
import { IconArrowsLeftRight, IconArrowRight } from "@tabler/icons-react";

interface PolicySummaryProps {
  policy: Policy;
}

export default function PolicySummary({ policy }: PolicySummaryProps) {
  const sourceList = policy.sources.join(", ");
  const destList = policy.destinations.join(", ");
  const portList =
    policy.ports.length > 0 ? policy.ports.join(", ") : "all ports";
  const proto = policy.protocol === "ALL" ? "all protocols" : policy.protocol;

  return (
    <div className="flex items-center gap-2 flex-wrap text-xs text-nb-gray-400">
      <span className="text-nb-gray-200 font-medium">{sourceList}</span>

      {policy.direction === "bidirectional" ? (
        <IconArrowsLeftRight size={13} className="text-nb-blue flex-shrink-0" />
      ) : (
        <IconArrowRight size={13} className="text-netbird flex-shrink-0" />
      )}

      <span className="text-nb-gray-200 font-medium">{destList}</span>

      <span className="text-nb-gray-600">·</span>
      <span>{proto}</span>

      {policy.ports.length > 0 && (
        <>
          <span className="text-nb-gray-600">·</span>
          <span>ports {portList}</span>
        </>
      )}
    </div>
  );
}
