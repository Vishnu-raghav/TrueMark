import { useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import OrgHeader from "../components/DashboardHeader";
import OrgSidebar from "../components/DashboardSidebar";

export default function OrgLayout({ organization }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getActiveTabFromPath = () => {
    const path = location.pathname;
    
    if (path.includes('/org/issue')) return 'issue';
    if (path.includes('/org/add-student')) return 'add-student';
    if (path.includes('/org/students')) return 'students';
    if (path.includes('/org/profile')) return 'profile';
    return 'dashboard';
  };

  const activeTab = getActiveTabFromPath();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <OrgSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        organization={organization}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Header */}
        <OrgHeader 
          onMenuToggle={toggleSidebar}
          title={getPageTitle(activeTab)}
          organization={organization}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet context={{ organization }} /> 
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
    'add-student': 'Add Student',
    'students': 'Manage Students',
    'profile': 'Organization Profile'
  };
  return titles[activeTab] || 'Dashboard';
}