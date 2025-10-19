import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";

export default function MemberLayout() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="p-6 flex-1 bg-gray-50">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}
