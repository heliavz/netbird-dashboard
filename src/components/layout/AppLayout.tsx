import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-nb-gray-950">
      <Sidebar collapsed={collapsed} />
      <TopBar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />
      <main
        className="pt-12 min-h-screen transition-all duration-300"
        style={{ marginLeft: collapsed ? "64px" : "220px" }}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
