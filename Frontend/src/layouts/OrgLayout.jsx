import { useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import OrgHeader from "../components/DashboardHeader";
import OrgSidebar from "../components/DashboardSidebar";

export default function OrgLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get active tab from current route
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    console.log("🛣️ Layout path:", path);
    
    if (path.includes('/issue')) return 'issue';
    if (path.includes('/add-student')) return 'add-student';
    return 'dashboard';
  };

  const activeTab = getActiveTabFromPath();

  console.log("🎯 Layout active tab:", activeTab);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <OrgSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
      />
      
      {/* Main Content - FIXED: Remove ml-64 like MemberLayout */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Header */}
        <OrgHeader 
          onMenuToggle={toggleSidebar}
          title={getPageTitle(activeTab)}
        />
        
        {/* Main Content Area - Compact padding */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function getPageTitle(activeTab) {
  const titles = {
    'dashboard': 'Dashboard',
    'issue': 'Issue Certificate',
    'add-student': 'Add Student'
  };
  return titles[activeTab] || 'Dashboard';
}