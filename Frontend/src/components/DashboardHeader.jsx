import React, { useState, useRef, useEffect } from 'react';
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
    <header className="dashboard-header">
      {/* Left Section */}
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        
        <div className="page-info">
          <h1 className="page-title">{title}</h1>
          <span className="welcome-text">
            Welcome back, {currentUser?.name || currentUser?.email || 'User'}!
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Search Bar */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Notifications */}
        {showNotifications && (
          <div className="notifications-container" ref={dropdownRef}>
            <button 
              className="notification-btn"
              onClick={() => setShowNotificationsPanel(!showNotificationsPanel)}
            >
              <span className="notification-icon">🔔</span>
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            {showNotificationsPanel && (
              <div className="notifications-panel">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                  <span className="notifications-count">{unreadCount} new</span>
                </div>
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.unread ? 'unread' : ''}`}
                    >
                      <p className="notification-text">{notification.text}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                  ))}
                </div>
                <button className="view-all-btn">View All Notifications</button>
              </div>
            )}
          </div>
        )}

        {/* User Profile Dropdown */}
        <div className="user-profile-container" ref={dropdownRef}>
          <button 
            className="user-profile-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="user-avatar">
              {currentUser?.name?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
            </div>
            <div className="user-info">
              <span className="user-name">
                {currentUser?.name || currentUser?.email?.split('@')[0] || 'User'}
              </span>
              <span className="user-role">{userRole}</span>
            </div>
            <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
          </button>

          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-avatar">
                  {currentUser?.name?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
                </div>
                <div>
                  <div className="dropdown-name">
                    {currentUser?.name || currentUser?.email?.split('@')[0] || 'User'}
                  </div>
                  <div className="dropdown-email">
                    {currentUser?.email || 'No email'}
                  </div>
                </div>
              </div>
              
              <div className="dropdown-menu">
                <a href="/profile" className="dropdown-item">
                  <span className="item-icon">👤</span>
                  My Profile
                </a>
                <a href="/settings" className="dropdown-item">
                  <span className="item-icon">⚙️</span>
                  Settings
                </a>
                <a href="/help" className="dropdown-item">
                  <span className="item-icon">❓</span>
                  Help & Support
                </a>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout">
                  <span className="item-icon">🚪</span>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;