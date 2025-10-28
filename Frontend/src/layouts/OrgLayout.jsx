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
    return 'dashboard'; // Sirf 2 options hain
  };

  const activeTab = getActiveTabFromPath();

  console.log("🎯 Layout active tab:", activeTab);

  return (
    <div className="flex h-screen bg-gray-50  overflow-hidden">
      {/* Sidebar */}
      <OrgSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
      />
      
      {/* Main Content - Proper spacing */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
      }`}>
        {/* Header */}
        <OrgHeader 
          onMenuToggle={toggleSidebar}
          title={getPageTitle(activeTab)}
        />
        
        {/* Main Content Area - Compact padding */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper function to get page title based on active tab
function getPageTitle(activeTab) {
  const titles = {
    'dashboard': 'Dashboard',
    'issue': 'Issue Certificate'
  };
  return titles[activeTab] || 'Dashboard';
}