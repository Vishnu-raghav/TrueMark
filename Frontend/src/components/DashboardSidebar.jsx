import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../src/App.css'

const DashboardSidebar = ({ 
  isOpen = true, 
  onClose,
  activeTab,
  setActiveTab 
}) => {
  const { user } = useSelector((state) => state.auth);
  const { organization } = useSelector((state) => state.organization);
  
  const isOrganization = !!organization;
  const isMember = !!user;

  // Common menu items for both roles
  const commonMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', roles: ['org', 'member'] },
    { id: 'certificates', label: 'Certificates', icon: '📜', roles: ['org', 'member'] },
    { id: 'profile', label: 'Profile', icon: '👤', roles: ['org', 'member'] },
    { id: 'settings', label: 'Settings', icon: '⚙️', roles: ['org', 'member'] },
  ];

  // Organization specific menu items
  const orgMenuItems = [
    { id: 'members', label: 'Team Members', icon: '👥', roles: ['org'] },
    { id: 'templates', label: 'Templates', icon: '🎨', roles: ['org'] },
    { id: 'analytics', label: 'Analytics', icon: '📈', roles: ['org'] },
    { id: 'reports', label: 'Reports', icon: '📋', roles: ['org'] },
  ];

  // Member specific menu items
  const memberMenuItems = [
    { id: 'my-certificates', label: 'My Certificates', icon: '🎫', roles: ['member'] },
    { id: 'verify', label: 'Verify Certificate', icon: '🔍', roles: ['member'] },
    { id: 'achievements', label: 'Achievements', icon: '🏆', roles: ['member'] },
  ];

  // Combine menu items based on role
  const allMenuItems = [
    ...commonMenuItems,
    ...(isOrganization ? orgMenuItems : []),
    ...(isMember ? memberMenuItems : []),
  ];

  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {!isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}

      <aside className={`dashboard-sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">🎓</div>
            <div className="logo-text">
              <span className="logo-primary">CertiVerify</span>
              <span className="logo-subtitle">SaaS Platform</span>
            </div>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Organization/Member Info */}
        <div className="sidebar-user-info">
          <div className="user-avatar-large">
            {isOrganization 
              ? organization?.name?.charAt(0) || 'O'
              : user?.name?.charAt(0) || 'U'
            }
          </div>
          <div className="user-details">
            <div className="user-name">
              {isOrganization 
                ? organization?.name || 'Organization'
                : user?.name || 'User'
              }
            </div>
            <div className="user-role">
              {isOrganization ? 'Organization' : 'Member'}
            </div>
            <div className="user-status">
              <span className="status-dot"></span>
              Online
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">MAIN</h3>
            <ul className="nav-menu">
              {allMenuItems
                .filter(item => item.roles.includes(isOrganization ? 'org' : 'member'))
                .map(item => (
                <li key={item.id} className="nav-item">
                  <button
                    className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    {item.subItems && (
                      <span 
                        className={`nav-arrow ${expandedItems[item.id] ? 'expanded' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(item.id);
                        }}
                      >
                        ▼
                      </span>
                    )}
                  </button>
                  
                  {/* Sub-items (if any) */}
                  {item.subItems && expandedItems[item.id] && (
                    <ul className="nav-submenu">
                      {item.subItems.map(subItem => (
                        <li key={subItem.id}>
                          <button
                            className={`nav-sub-link ${activeTab === subItem.id ? 'active' : ''}`}
                            onClick={() => handleItemClick(subItem.id)}
                          >
                            {subItem.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions Section */}
          <div className="nav-section">
            <h3 className="nav-section-title">QUICK ACTIONS</h3>
            <ul className="nav-menu">
              {isOrganization && (
                <li className="nav-item">
                  <button className="nav-link action-link">
                    <span className="nav-icon">➕</span>
                    <span className="nav-label">Issue Certificate</span>
                  </button>
                </li>
              )}
              <li className="nav-item">
                <button className="nav-link action-link">
                  <span className="nav-icon">🔍</span>
                  <span className="nav-label">Verify Certificate</span>
                </button>
              </li>
              {isOrganization && (
                <li className="nav-item">
                  <button className="nav-link action-link">
                    <span className="nav-icon">👥</span>
                    <span className="nav-label">Invite Member</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="upgrade-banner">
            <div className="upgrade-icon">⭐</div>
            <div className="upgrade-content">
              <div className="upgrade-title">Upgrade to Pro</div>
              <div className="upgrade-text">Get access to all features</div>
            </div>
            <button className="upgrade-btn">Upgrade</button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;