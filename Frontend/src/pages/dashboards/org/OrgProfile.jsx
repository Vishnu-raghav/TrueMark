import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrganizationProfile, updateOrganizationProfile } from '../../../features/organization/organizationSlice';
import { 
  Building, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Users, 
  Award, 
  Settings,
  Edit3,
  Save,
  X,
  Upload,
  Shield,
  BarChart3,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function OrgProfile() {
  const dispatch = useDispatch();
  const { organization, isLoading, isError, message, isSuccess } = useSelector((state) => state.organization);
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    description: '',
    type: '',
    settings: {
      autoApproveCertificates: false,
      allowMemberRegistration: true,
      maxUsers: 1000,
      autoApproveByDomain: true
    }
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');

  useEffect(() => {
    dispatch(getOrganizationProfile());
  }, [dispatch]);

  useEffect(() => {
    if (organization) {
      setFormData({
        name: organization.name || '',
        email: organization.email || '',
        phone: organization.phone || '',
        website: organization.website || '',
        address: organization.address || '',
        description: organization.description || '',
        type: organization.type || '',
        settings: organization.settings || {
          autoApproveCertificates: false,
          allowMemberRegistration: true,
          maxUsers: 1000,
          autoApproveByDomain: true
        }
      });
      
      if (organization.logo) {
        setLogoPreview(organization.logo);
      }
    }
  }, [organization]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      
      // Append basic fields
      Object.keys(formData).forEach(key => {
        if (key === 'settings') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      
      // Append logo file if selected
      if (logoFile) {
        submitData.append('logo', logoFile);
      }

      await dispatch(updateOrganizationProfile(submitData)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { icon: Users, label: 'Total Members', value: organization?.members?.length || 0, color: 'blue' },
    { icon: Award, label: 'Certificates Issued', value: '1,247', color: 'green' },
    { icon: BarChart3, label: 'Active This Month', value: '89%', color: 'purple' },
    { icon: Shield, label: 'Verification Rate', value: '99.9%', color: 'orange' }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Building },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const organizationTypes = [
    'Educational Institution',
    'Corporate',
    'Training Center',
    'Government',
    'Non-Profit',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Organization Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your organization's information, settings, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              {/* Organization Logo & Basic Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {logoPreview ? (
                      <img 
                        src={logoPreview} 
                        alt="Organization Logo" 
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    ) : (
                      <Building className="w-8 h-8" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoChange}
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{organization?.name || 'Organization'}</h2>
                <p className="text-gray-600 text-sm">{organization?.email || 'No email'}</p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    organization?.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : organization?.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {organization?.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {organization?.status === 'pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {organization?.status?.toUpperCase() || 'UNKNOWN'}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                        <stat.icon className={`w-4 h-4 text-${stat.color}-600`} />
                      </div>
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Member Since */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {organization?.createdAt ? new Date(organization.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Tab Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {activeTab === 'profile' && 'Manage your organization basic information'}
                    {activeTab === 'settings' && 'Configure organization preferences and settings'}
                    {activeTab === 'security' && 'Security and access control settings'}
                    {activeTab === 'analytics' && 'View organization analytics and reports'}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {activeTab === 'profile' && (
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        isEditing
                          ? 'bg-gray-600 hover:bg-gray-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isEditing ? (
                        <>
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4" />
                          <span>Edit Profile</span>
                        </>
                      )}
                    </button>
                  )}
                  {isEditing && (
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'profile' && (
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization Type
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-colors"
                        >
                          <option value="">Select Type</option>
                          {organizationTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Globe className="w-4 h-4 inline mr-2" />
                          Website
                        </label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-colors"
                          placeholder="https://example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="w-4 h-4 inline mr-2" />
                          Address
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        disabled={!isEditing}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 transition-colors"
                        placeholder="Describe your organization, its mission, and values..."
                      />
                    </div>

                    {isEditing && (
                      <div className="flex space-x-3 pt-4 border-t border-gray-200">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </form>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <Settings className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-blue-900">Organization Settings</h3>
                          <p className="text-blue-700 text-sm mt-1">
                            Configure how your organization operates on the platform
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div>
                          <h4 className="font-medium text-gray-900">Auto-approve Certificates</h4>
                          <p className="text-gray-600 text-sm">Automatically approve certificates without manual review</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData.settings.autoApproveCertificates}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              settings: { ...prev.settings, autoApproveCertificates: e.target.checked }
                            }))}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div>
                          <h4 className="font-medium text-gray-900">Allow Member Registration</h4>
                          <p className="text-gray-600 text-sm">Allow new members to register with your organization email domain</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData.settings.allowMemberRegistration}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              settings: { ...prev.settings, allowMemberRegistration: e.target.checked }
                            }))}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div>
                          <h4 className="font-medium text-gray-900">Auto-approve by Domain</h4>
                          <p className="text-gray-600 text-sm">Automatically approve members with your organization email domain</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData.settings.autoApproveByDomain}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              settings: { ...prev.settings, autoApproveByDomain: e.target.checked }
                            }))}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="text-center py-12">
                    <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Security Settings</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Security and access control settings will be available in the next update.
                    </p>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Detailed analytics and reports will be available soon.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}