import { useState } from 'react';
import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";

export default function MemberLayout({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user} 
      />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'
      }`}>
        {/* Header */}
        <DashboardHeader 
          onMenuToggle={toggleSidebar}
          title={getPageTitle(activeTab)}
          user={user} 
        />
        
        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet context={{ user }} /> 
        </main>
      </div>
    </div>
  );
}


function getPageTitle(activeTab) {
  const titles = {
    'dashboard': 'Dashboard',
    'my-certificates': 'My Certificates',
    'verify': 'Verify Certificate',
    'profile': 'My Profile',
    'settings': 'Settings',
    'achievements': 'Achievements'
  };
  return titles[activeTab] || 'Dashboard';
}