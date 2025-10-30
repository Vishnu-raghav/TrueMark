import React, { useState, useEffect, useCallback } from 'react';
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
  const [dataFetched, setDataFetched] = useState(false); // ✅ NEW: Prevent multiple fetches

  // ✅ FIX: useCallback se fetch function banayein
  const fetchOrganizationData = useCallback(async () => {
    if (!dataFetched && !organization) {
      console.log("🔄 Fetching organization data...");
      try {
        await dispatch(getOrganizationProfile()).unwrap();
        setDataFetched(true);
      } catch (error) {
        console.error("Failed to fetch organization data:", error);
      }
    }
  }, [dispatch, dataFetched, organization]);

  // ✅ FIX: useEffect with proper dependencies
  useEffect(() => {
    fetchOrganizationData();
  }, [fetchOrganizationData]);

  // ✅ FIX: Separate useEffect for form data update
  useEffect(() => {
    if (organization && !isEditing) {
      console.log("📝 Updating form data with organization:", organization);
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
  }, [organization, isEditing]); // ✅ Only update when organization changes or editing stops

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      
      // Append basic fields
      Object.keys(formData).forEach(key => {
        if (key === 'settings') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== undefined && formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });
      
      // Append logo file if selected
      if (logoFile) {
        submitData.append('logo', logoFile);
      }

      console.log("💾 Saving organization profile...");
      await dispatch(updateOrganizationProfile(submitData)).unwrap();
      setIsEditing(false);
      setLogoFile(null); // Reset logo file after save
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

  const handleCancelEdit = () => {
    setIsEditing(false);
    setLogoFile(null);
    // Reset form data to original organization data
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
      setLogoPreview(organization.logo || '');
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

  // ✅ Loading state
  if (isLoading && !organization) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading organization profile...</p>
        </div>
      </div>
    );
  }

  // ✅ Error state
  if (isError && !organization) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to Load Profile</h2>
          <p className="text-gray-600 mb-4">{message}</p>
          <button
            onClick={fetchOrganizationData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4 overflow-hidden">
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

              {/* Tab Content - Rest of the form remains same */}
              <div className="p-6">
                {/* ... rest of your tab content code ... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}