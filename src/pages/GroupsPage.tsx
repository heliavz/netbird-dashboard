import GroupsTable from "@/components/access-control/GroupsTable";
import { IconShield } from "@tabler/icons-react";

export default function GroupsPage() {
  return (
    <div>
      <div className="mb-5">
        <p className="text-nb-gray-500 text-sm mb-2 flex items-center gap-1.5">
          <IconShield size={12} />
          <span>Access Control</span>
          <span>›</span>
          <span>Groups</span>
        </p>
        <h1 className="text-nb-gray-100 text-xl font-semibold mb-1">Groups</h1>
        <p className="text-nb-gray-500 text-sm">
          Overview of all groups in your organization. Groups are used to
          organize peers and define access in policies.{" "}
          <a
            href="https://docs.netbird.io/how-to/manage-network-access"
            target="_blank"
            rel="noreferrer"
            className="text-netbird hover:text-netbird-300 transition-colors"
          >
            Learn more ↗
          </a>
        </p>
      </div>

      <GroupsTable />
    </div>
  );
}
