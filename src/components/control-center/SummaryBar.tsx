import { stats } from "@/data/mockData";
import {
  IconActivity,
  IconCircleCheck,
  IconCircleDashed,
  IconNetwork,
  IconServer,
  IconShield,
} from "@tabler/icons-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent?: "green" | "gray" | "orange" | "blue";
}

function StatCard({ icon, label, value, accent = "gray" }: StatCardProps) {
  const accentMap = {
    green: "text-green-400",
    gray: "text-nb-gray-400",
    orange: "text-netbird",
    blue: "text-nb-blue",
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-nb-gray-920 border border-nb-gray-900">
      <div className={`${accentMap[accent]}`}>{icon}</div>
      <div>
        <p className="text-nb-gray-100 text-lg font-semibold leading-none">
          {value}
        </p>
        <p className="text-nb-gray-500 text-xs mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function SummaryBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      <StatCard
        icon={<IconServer size={18} />}
        label="Total Peers"
        value={stats.totalPeers}
        accent="gray"
      />
      <StatCard
        icon={<IconCircleCheck size={18} />}
        label="Online"
        value={stats.onlinePeers}
        accent="green"
      />
      <StatCard
        icon={<IconCircleDashed size={18} />}
        label="Offline"
        value={stats.offlinePeers}
        accent="gray"
      />
      <StatCard
        icon={<IconShield size={18} />}
        label="Active Policies"
        value={stats.activePolicies}
        accent="orange"
      />
      <StatCard
        icon={<IconNetwork size={18} />}
        label="Networks"
        value={stats.totalNetworks}
        accent="blue"
      />
    </div>
  );
}
