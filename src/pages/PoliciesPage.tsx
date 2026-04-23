import PoliciesTable from "@/components/access-control/PoliciesTable";

export default function PoliciesPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-nb-gray-100 text-xl font-semibold mb-1">
          Access Control Policies
        </h1>
        <p className="text-nb-gray-500 text-sm">
          Create rules to manage access in your network and define what peers
          can connect.{" "}
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

      <PoliciesTable />
    </div>
  );
}
