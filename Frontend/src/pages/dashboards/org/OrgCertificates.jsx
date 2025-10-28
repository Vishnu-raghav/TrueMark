import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Award, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2,
  FileText,
  Calendar,
  User,
  AlertCircle,
  RefreshCw,
  Plus,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { listIssuedCertificates, deleteCertificate } from '../../../features/certificate/certificateSlice';
import { Link } from 'react-router-dom';

export default function OrgCertificates() {
  const dispatch = useDispatch();
  const { 
    certificates, 
    isLoading, 
    isError, 
    message 
  } = useSelector(state => state.certificate);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    console.log("🔄 Fetching certificates...");
    dispatch(listIssuedCertificates());
  }, [dispatch]);

  useEffect(() => {
    console.log("📜 Certificates data:", certificates);
    console.log("❌ Certificates error:", isError, message);
    
    if (isError) {
      setLocalError(message || 'Failed to load certificates');
    } else {
      setLocalError('');
    }
  }, [certificates, isError, message]);

  const filteredCertificates = certificates?.filter(cert => {
    const matchesSearch = 
      cert.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.recipient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.recipient?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }) || [];

  const handleDelete = async (certId, certTitle) => {
    if (window.confirm(`Are you sure you want to delete the certificate "${certTitle}"? This action cannot be undone.`)) {
      try {
        console.log("🗑️ Deleting certificate:", certId);
        await dispatch(deleteCertificate(certId)).unwrap();
        // Refresh the list after successful deletion
        dispatch(listIssuedCertificates());
      } catch (error) {
        console.error("❌ Failed to delete certificate:", error);
        setLocalError('Failed to delete certificate. Please try again.');
      }
    }
  };

  const handleRetry = () => {
    console.log("🔄 Retrying certificate fetch...");
    setLocalError('');
    dispatch(listIssuedCertificates());
  };

  const handleViewCertificate = (certificate) => {
    console.log("👀 Viewing certificate:", certificate);
    // Implement view certificate logic here
    // This could open a modal or navigate to a detail page
    alert(`View certificate: ${certificate.title}`);
  };

  const handleDownloadCertificate = (certificate) => {
    console.log("📥 Downloading certificate:", certificate);
    // Implement download logic here
    alert(`Download certificate: ${certificate.title}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'revoked':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'expired':
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'revoked':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'expired':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const CertificateCard = ({ certificate }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg mb-2">
              {certificate.title || 'Untitled Certificate'}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span className="font-medium">
                  {certificate.recipient?.name || certificate.recipientName || 'Unknown Recipient'}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {certificate.issueDate ? new Date(certificate.issueDate).toLocaleDateString() : 'No date'}
                </span>
              </div>
              
              {certificate.expiryDate && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Expires: {new Date(certificate.expiryDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {certificate.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {certificate.description}
              </p>
            )}

            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(certificate.status)}`}>
                {getStatusIcon(certificate.status)}
                <span className="capitalize">{certificate.status || 'unknown'}</span>
              </span>
              
              {certificate.certificateId && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  ID: {certificate.certificateId}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => handleViewCertificate(certificate)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
            title="View Certificate"
          >
            <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
          </button>
          
          <button 
            onClick={() => handleDownloadCertificate(certificate)}
            className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
            title="Download Certificate"
          >
            <Download className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
          </button>
          
          <button 
            onClick={() => handleDelete(certificate._id, certificate.title)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
            title="Delete Certificate"
          >
            <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all issued certificates ({certificates?.length || 0} total)
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/org/issue"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Issue New</span>
          </Link>
          <button 
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            onClick={handleRetry}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {localError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium text-red-800">Failed to load certificates</p>
              <p className="text-red-700 text-sm">{localError}</p>
            </div>
          </div>
          <button
            onClick={handleRetry}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, recipient name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center space-x-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-40"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="revoked">Revoked</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
              <span className="font-medium">{filteredCertificates.length}</span> certificates found
              {searchTerm && (
                <span> for "{searchTerm}"</span>
              )}
              {filterStatus !== 'all' && (
                <span> with status "{filterStatus}"</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div>
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredCertificates.length > 0 ? (
          <div className="space-y-4">
            {filteredCertificates.map((certificate) => (
              <CertificateCard 
                key={certificate._id || certificate.id} 
                certificate={certificate} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No certificates found' : 'No certificates issued yet'}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                : 'Get started by issuing your first certificate to your students or members.'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link
                to="/org/issue"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Issue Your First Certificate</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}