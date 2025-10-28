import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import OrgHeader from "../components/DashboardHeader";
import OrgSidebar from "../components/DashboardSidebar";

export default function OrgLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <OrgSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        {/* Header */}
        <OrgHeader 
          onMenuToggle={toggleSidebar}
          title={getPageTitle(activeTab)}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

// Helper function to get page title based on active tab
function getPageTitle(activeTab) {
  const titles = {
    'dashboard': 'Dashboard',
    'certificates': 'Certificates',
    'students': 'Students',
    'issue': 'Issue Certificate',
    'templates': 'Templates',
    'analytics': 'Analytics',
    'settings': 'Settings'
  };
  return titles[activeTab] || 'Dashboard';
}