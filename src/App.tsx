import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ControlCenterPage from "./pages/ControlCenterPage";
import GroupsPage from "./pages/GroupsPage";
import PeersPage from "./pages/PeersPage";
import PoliciesPage from "./pages/PoliciesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<ControlCenterPage />} />
          <Route path="/peers" element={<PeersPage />} />
          <Route path="/access-control/policies" element={<PoliciesPage />} />
          <Route path="/access-control/groups" element={<GroupsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
