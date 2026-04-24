import PeersHealthBar from "@/components/peers/PeersHealthBar";
import PeersTable from "@/components/peers/PeersTable";
import { IconServer } from "@tabler/icons-react";

export default function PeersPage() {
  return (
    <div>
      {/* Page header */}
      <div className="mb-5">
        <p className="text-nb-gray-500 text-xs mb-2 flex items-center gap-1.5">
          <IconServer size={12} />
          <span>Peers</span>
        </p>
        <h1 className="text-nb-gray-100 text-xl font-semibold mb-1">Peers</h1>
        <p className="text-nb-gray-500 text-sm">
          A list of all machines and devices connected to your private network.{" "}
          <a
            href="https://docs.netbird.io/how-to/add-machines-to-your-network"
            target="_blank"
            rel="noreferrer"
            className="text-netbird hover:text-netbird-300 transition-colors"
          >
            Learn more ↗
          </a>
        </p>
      </div>

      <PeersHealthBar />
      <PeersTable />
    </div>
  );
}
