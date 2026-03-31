import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./DashboardLayout.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-root">
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
