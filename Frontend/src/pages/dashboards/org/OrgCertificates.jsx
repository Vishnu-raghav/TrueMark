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
  User
} from 'lucide-react';
import { listIssuedCertificates, deleteCertificate } from '../../../features/certificate/certificateSlice';

export default function OrgCertificates() {
  const dispatch = useDispatch();
  const { certificates, isLoading } = useSelector(state => state.certificate);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCertificates, setSelectedCertificates] = useState([]);

  useEffect(() => {
    dispatch(listIssuedCertificates());
  }, [dispatch]);

  const filteredCertificates = certificates?.filter(cert => {
    const matchesSearch = cert.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.recipient?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesStatus;
  }) || [];

  const handleDelete = async (certId) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      await dispatch(deleteCertificate(certId));
      dispatch(listIssuedCertificates());
    }
  };

  const handleBulkAction = (action) => {
    // Implement bulk actions
    console.log(`${action} selected certificates:`, selectedCertificates);
  };

  const CertificateCard = ({ certificate }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{certificate.title}</h3>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{certificate.recipient?.name || 'Unknown'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
              </div>
            </div>
            {certificate.description && (
              <p className="text-gray-600 text-sm mt-2">{certificate.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            certificate.status === 'active' 
              ? 'bg-green-100 text-green-800'
              : certificate.status === 'revoked'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {certificate.status}
          </span>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Eye className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            onClick={() => handleDelete(certificate._id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all issued certificates
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
            
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="revoked">Revoked</option>
              <option value="expired">Expired</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">
              {filteredCertificates.length} certificates found
            </span>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading Skeleton
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))
        ) : filteredCertificates.length > 0 ? (
          filteredCertificates.map((certificate) => (
            <CertificateCard key={certificate._id} certificate={certificate} />
          ))
        ) : (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by issuing your first certificate'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}