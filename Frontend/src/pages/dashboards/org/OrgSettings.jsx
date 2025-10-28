import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Settings, 
  Building, 
  Mail, 
  Globe, 
  Shield, 
  Bell, 
  Users,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { getOrganizationProfile } from '../../../features/organization/organizationSlice';

export default function OrgSettings() {
  const dispatch = useDispatch();
  const { organization, isLoading } = useSelector(state => state.organization);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    // General Settings
    name: '',
    email: '',
    website: '',
    phone: '',
    address: '',
    description: '',
    
    // Security Settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification Settings
    emailNotifications: true,
    certificateIssued: true,
    studentRegistered: true,
    monthlyReports: true,
  });

  useEffect(() => {
    dispatch(getOrganizationProfile());
  }, [dispatch]);

  useEffect(() => {
    if (organization) {
      setFormData(prev => ({
        ...prev,
        name: organization.name || '',
        email: organization.email || '',
        website: organization.website || '',
        phone: organization.phone || '',
        address: organization.address || '',
        description: organization.description || '',
      }));
    }
  }, [organization]);

  const tabs = [
    { id: 'general', label: 'General', icon: Building, description: 'Organization profile and basic information' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Password and security settings' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Email and notification preferences' },
    { id: 'team', label: 'Team', icon: Users, description: 'Manage team members and permissions' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (section) => {
    setSaving(true);
    setSaveSuccess(false);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Organization Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your organization profile and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {currentTab && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <currentTab.icon className="w-5 h-5" />
                      <span>{currentTab.label} Settings</span>
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">{currentTab.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {saveSuccess && (
                      <div className="flex items-center space-x-2 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Saved successfully!</span>
                      </div>
                    )}
                    <button
                      onClick={() => handleSave(activeTab)}
                      disabled={saving}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      {saving ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter organization name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="organization@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter organization address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Brief description of your organization..."
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6 max-w-md">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-yellow-800">Security Notice</h3>
                          <p className="text-yellow-700 text-sm mt-1">
                            Changing your password will log you out of all active sessions.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-gray-600 text-sm">Receive email notifications for important events</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.emailNotifications}
                          onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Certificate Issued</h4>
                          <p className="text-gray-600 text-sm">When you issue a new certificate</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.certificateIssued}
                            onChange={(e) => handleInputChange('certificateIssued', e.target.checked)}
                            className="sr-only peer"
                            disabled={!formData.emailNotifications}
                          />
                          <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                            !formData.emailNotifications 
                              ? 'bg-gray-100 cursor-not-allowed' 
                              : 'bg-gray-200 peer-checked:bg-blue-600'
                          }`}></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Student Registered</h4>
                          <p className="text-gray-600 text-sm">When a new student registers with your domain</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.studentRegistered}
                            onChange={(e) => handleInputChange('studentRegistered', e.target.checked)}
                            className="sr-only peer"
                            disabled={!formData.emailNotifications}
                          />
                          <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                            !formData.emailNotifications 
                              ? 'bg-gray-100 cursor-not-allowed' 
                              : 'bg-gray-200 peer-checked:bg-blue-600'
                          }`}></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Monthly Reports</h4>
                          <p className="text-gray-600 text-sm">Monthly analytics and performance reports</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.monthlyReports}
                            onChange={(e) => handleInputChange('monthlyReports', e.target.checked)}
                            className="sr-only peer"
                            disabled={!formData.emailNotifications}
                          />
                          <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                            !formData.emailNotifications 
                              ? 'bg-gray-100 cursor-not-allowed' 
                              : 'bg-gray-200 peer-checked:bg-blue-600'
                          }`}></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'team' && (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Team Management</h3>
                    <p className="text-gray-500 mb-4">
                      Manage your organization team members and their permissions
                    </p>
                    <p className="text-sm text-gray-400">
                      Team management features coming soon
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}