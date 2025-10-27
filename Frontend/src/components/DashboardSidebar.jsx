import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardSidebar = ({ 
  isOpen = true, 
  onClose,
  activeTab,
  setActiveTab 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { organization } = useSelector((state) => state.organization);
  
  const isOrganization = !!organization;
  const isMember = !!user;
  const basePath = isMember ? '/member' : '/org';

  const commonMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard', roles: ['org', 'member'] },
    { id: 'certificates', label: 'Certificates', icon: '📜', path: isMember ? '/my-certificates' : '/certificates', roles: ['org', 'member'] },
    { id: 'profile', label: 'Profile', icon: '👤', path: '/profile', roles: ['org', 'member'] },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings', roles: ['org', 'member'] },
  ];

  const orgMenuItems = [
    { id: 'members', label: 'Team Members', icon: '👥', path: '/members', roles: ['org'] },
    { id: 'templates', label: 'Templates', icon: '🎨', path: '/templates', roles: ['org'] },
    { id: 'analytics', label: 'Analytics', icon: '📈', path: '/analytics', roles: ['org'] },
    { id: 'reports', label: 'Reports', icon: '📋', path: '/reports', roles: ['org'] },
  ];

  const memberMenuItems = [
    { id: 'my-certificates', label: 'My Certificates', icon: '🎫', path: '/my-certificates', roles: ['member'] },
    { id: 'verify', label: 'Verify Certificate', icon: '🔍', path: '/verify', roles: ['member'] },
    { id: 'achievements', label: 'Achievements', icon: '🏆', path: '/achievements', roles: ['member'] },
  ];

  const allMenuItems = [
    ...commonMenuItems,
    ...(isOrganization ? orgMenuItems : []),
    ...(isMember ? memberMenuItems : []),
  ];

  const handleItemClick = (item) => {
    const fullPath = `${basePath}${item.path}`;
    setActiveTab(item.id);
    navigate(fullPath);
    
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'issue':
        navigate(`${basePath}/certificates?action=issue`);
        break;
      case 'verify':
        navigate(isMember ? `${basePath}/verify` : '/verify');
        break;
      case 'invite':
        navigate(`${basePath}/members?action=invite`);
        break;
      default:
        break;
    }
    
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  // Determine active tab based on current route
  const getActiveTabFromRoute = () => {
    const currentPath = location.pathname;
    const item = allMenuItems.find(item => 
      currentPath === `${basePath}${item.path}` || 
      currentPath.startsWith(`${basePath}${item.path}/`)
    );
    return item ? item.id : 'dashboard';
  };

  const currentActiveTab = activeTab || getActiveTabFromRoute();

  return (
    <>
      {/* Mobile Overlay */}
      {!isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        flex flex-col h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate(`${basePath}/dashboard`)}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              🎓
            </div>
            <div>
              <div className="font-bold text-gray-900">CertiVerify</div>
              <div className="text-xs text-gray-500">SaaS Platform</div>
            </div>
          </div>
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {isOrganization 
                ? organization?.name?.charAt(0) || 'O'
                : user?.name?.charAt(0) || 'U'
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {isOrganization 
                  ? organization?.name || 'Organization'
                  : user?.name || 'User'
                }
              </p>
              <p className="text-sm text-gray-500">
                {isOrganization ? 'Organization' : 'Member'}
              </p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-2">
            <div>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Main
              </h3>
              <div className="space-y-1">
                {allMenuItems
                  .filter(item => item.roles.includes(isOrganization ? 'org' : 'member'))
                  .map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors
                      ${currentActiveTab === item.id 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {isOrganization && (
                  <button 
                    onClick={() => handleQuickAction('issue')}
                    className="w-full flex items-center space-x-3 px-3 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm"
                  >
                    <span className="text-lg">➕</span>
                    <span className="font-medium">Issue Certificate</span>
                  </button>
                )}
                <button 
                  onClick={() => handleQuickAction('verify')}
                  className="w-full flex items-center space-x-3 px-3 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-sm"
                >
                  <span className="text-lg">🔍</span>
                  <span className="font-medium">Verify Certificate</span>
                </button>
                {isOrganization && (
                  <button 
                    onClick={() => handleQuickAction('invite')}
                    className="w-full flex items-center space-x-3 px-3 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-sm"
                  >
                    <span className="text-lg">👥</span>
                    <span className="font-medium">Invite Member</span>
                  </button>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                ⭐
              </div>
              <div>
                <div className="font-semibold text-sm">Upgrade to Pro</div>
                <div className="text-xs opacity-90">Get access to all features</div>
              </div>
            </div>
            <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;