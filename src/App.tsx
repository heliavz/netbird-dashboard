import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AppLayout from "./components/layout/AppLayout";
import ControlCenterPage from "./pages/ControlCenterPage";
import GroupsPage from "./pages/GroupsPage";
import NotImplementedPage from "./pages/NotImplementedPage";
import PeersPage from "./pages/PeersPage";
import PoliciesPage from "./pages/PoliciesPage";

export default function App() {
  return (
    <BrowserRouter basename="/netbird-dashboard">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#2b2f33",
            border: "1px solid #3f444b",
            color: "#e4e7e9",
            fontSize: "13px",
          },
        }}
      />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<ControlCenterPage />} />
          <Route path="/peers" element={<PeersPage />} />
          <Route path="/access-control/policies" element={<PoliciesPage />} />
          <Route path="/access-control/groups" element={<GroupsPage />} />
          {/* All other routes go to not-implemented */}
          <Route path="*" element={<NotImplementedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
