import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authslice.js';
import { logoutOrganization } from '../features/organization/organizationSlice.js';

const DashboardHeader = ({ 
  title = "Dashboard", 
  showNotifications = true,
  onMenuToggle 
}) => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);
  const dropdownRef = useRef(null);

  // Get user/organization data from Redux
  const { user } = useSelector((state) => state.auth);
  const { organization } = useSelector((state) => state.organization);
  
  const currentUser = user || organization;
  const userRole = user ? 'Member' : (organization ? 'Organization' : 'User');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setShowNotificationsPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (user) {
      dispatch(logoutUser());
    } else if (organization) {
      dispatch(logoutOrganization());
    }
  };

  const notifications = [
    { id: 1, text: 'New certificate issued', time: '5 min ago', unread: true },
    { id: 2, text: 'Profile update required', time: '1 hour ago', unread: true },
    { id: 3, text: 'System maintenance scheduled', time: '2 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-md hover:bg-gray-100 transition-colors lg:hidden"
            onClick={onMenuToggle}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">
              Welcome back, {currentUser?.name || currentUser?.email || 'User'}!
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
          </div>

          {/* Notifications */}
          {showNotifications && (
            <div className="relative" ref={dropdownRef}>
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-4.66-7.5 1 1 0 00-1.2-1.2 7.97 7.97 0 006.16 10.02 1 1 0 001.7 0 5.97 5.97 0 012-1.32z" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotificationsPanel && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {unreadCount} new
                      </span>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                          notification.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <p className="text-sm font-medium text-gray-900">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-2">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {currentUser?.name?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {currentUser?.name || currentUser?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
              <svg className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {currentUser?.name?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {currentUser?.name || currentUser?.email?.split('@')[0] || 'User'}
                      </p>
                      <p className="text-sm text-gray-500">{currentUser?.email || 'No email'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </a>
                  <a href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </a>
                  <a href="/help" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Help & Support
                  </a>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;