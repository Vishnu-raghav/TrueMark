import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardSidebar = ({ 
  isOpen = true, 
  onClose,
  activeTab
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { organization } = useSelector((state) => state.organization);
  
  const isOrganization = !!organization;
  const isMember = !!user;
  const basePath = isMember ? '/member' : '/org';

  // ✅ CORRECTED: Routes ko actual app routes ke according banayein
  const commonMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'profile', label: 'Profile', icon: '👤', path: '/profile' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  // ✅ UPDATED: Organization menu me "Add Student" add kiya
  const orgMenuItems = [
    { id: 'students', label: 'Students', icon: '👥', path: '/students' },
    { id: 'add-student', label: 'Add Student', icon: '➕', path: '/add-student' }, // ✅ NEW
    { id: 'issue', label: 'Issue Certificate', icon: '🎫', path: '/issue' },
  ];

  const memberMenuItems = [
    { id: 'my-certificates', label: 'My Certificates', icon: '🎫', path: '/my-certificates' },
    { id: 'verify', label: 'Verify Certificate', icon: '🔍', path: '/verify' },
  ];

  // ✅ Combine menu items based on user type
  const allMenuItems = [
    ...commonMenuItems,
    ...(isOrganization ? orgMenuItems : []),
    ...(isMember ? memberMenuItems : []),
  ];

  const handleItemClick = (item) => {
    const fullPath = `${basePath}${item.path}`;
    console.log("🔄 Navigating to:", fullPath);
    navigate(fullPath);
    
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'issue':
        navigate('/org/issue');
        break;
      case 'verify':
        navigate(isMember ? '/member/verify' : '/verify');
        break;
      case 'invite':
        navigate('/org/students');
        break;
      case 'add-student':
        navigate('/org/add-student');
        break;
      default:
        break;
    }
    
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  // ✅ Get active tab from current route
  const getActiveTabFromRoute = () => {
    const currentPath = location.pathname;
    console.log("📍 Current path:", currentPath);
    
    const item = allMenuItems.find(item => {
      const fullPath = `${basePath}${item.path}`;
      return currentPath === fullPath || currentPath.startsWith(`${fullPath}/`);
    });
    
    return item ? item.id : 'dashboard';
  };

  const currentActiveTab = activeTab || getActiveTabFromRoute();

  console.log("🎯 Active tab:", currentActiveTab);
  console.log("👤 User type:", isOrganization ? 'Organization' : 'Member');
  console.log("🛣️ Base path:", basePath);

  return (
    <>
      {/* Mobile Overlay */}
      {!isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Fixed width and proper spacing */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        flex flex-col h-full
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate(`${basePath}/dashboard`)}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              🎓
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">CertiVerify</div>
              <div className="text-xs text-gray-500">SaaS Platform</div>
            </div>
          </div>
          <button 
            className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onClose}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Info - Compact */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {isOrganization 
                ? organization?.name?.charAt(0) || 'O'
                : user?.name?.charAt(0) || 'U'
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">
                {isOrganization 
                  ? organization?.name || 'Organization'
                  : user?.name || 'User'
                }
              </p>
              <p className="text-xs text-gray-500">
                {isOrganization ? 'Organization' : 'Member'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation - Better spacing */}
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="px-3 space-y-1">
            <div>
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Main
              </h3>
              <div className="space-y-1">
                {allMenuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-lg transition-all duration-200
                      ${currentActiveTab === item.id 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions - Better spacing */}
            <div className="mt-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {isOrganization && (
                  <>
                    <button 
                      onClick={() => handleQuickAction('add-student')}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-sm text-sm font-medium"
                    >
                      <span className="text-lg">➕</span>
                      <span>Add Student</span>
                    </button>
                    <button 
                      onClick={() => handleQuickAction('issue')}
                      className="w-full flex items-center space-x-3 px-3 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-sm text-sm font-medium"
                    >
                      <span className="text-lg">🎫</span>
                      <span>Issue Certificate</span>
                    </button>
                  </>
                )}
                <button 
                  onClick={() => handleQuickAction('verify')}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-sm text-sm font-medium"
                >
                  <span className="text-lg">🔍</span>
                  <span>Verify Certificate</span>
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer - Compact */}
        <div className="p-3 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center text-xs">
                ⭐
              </div>
              <div className="flex-1">
                <div className="font-semibold text-xs">Upgrade to Pro</div>
                <div className="text-xs opacity-90">All features</div>
              </div>
            </div>
            <button className="w-full bg-white text-blue-600 py-1.5 px-3 rounded text-xs font-semibold hover:bg-gray-100 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;