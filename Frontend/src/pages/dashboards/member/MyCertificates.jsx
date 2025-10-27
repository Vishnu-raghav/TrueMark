import  { useState } from 'react';

export default function MyCertificates() {
  const [filter, setFilter] = useState('all');
  
  const certificates = [
    {
      id: 3,
      name: 'Cloud Fundamentals',
      issuer: 'Cloud Institute',
      issueDate: '2024-01-05',
      expiryDate: null,
      status: 'pending',
      type: 'Cloud',
      badge: '☁️',
      verificationId: 'CERT-003'
    },
    {
      id: 4,
      name: 'Project Management Professional',
      issuer: 'PM Institute',
      issueDate: '2023-12-20',
      expiryDate: '2025-12-20',
      status: 'verified',
      type: 'Management',
      badge: '📊',
      verificationId: 'CERT-004'
    }
  ];

  const filteredCertificates = certificates.filter(cert => 
    filter === 'all' ? true : cert.status === filter
  );

  const statusColors = {
    verified: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    expired: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
          <p className="text-gray-600 mt-2">Manage and view all your certificates in one place</p>
        </div>

        {/* Stats and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{certificates.length}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {certificates.filter(c => c.status === 'verified').length}
                </div>
                <div className="text-sm text-gray-600">Verified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {certificates.filter(c => c.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === 'all' 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Certificates
              </button>
              <button
                onClick={() => setFilter('verified')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === 'verified' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Verified
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === 'pending' 
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((certificate) => (
            <div key={certificate.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              {/* Certificate Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{certificate.badge}</div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[certificate.status]}`}>
                  {certificate.status === 'verified' ? '✅ Verified' : '⏳ Pending'}
                </span>
              </div>

              {/* Certificate Details */}
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-gray-900">{certificate.name}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Issuer:</span>
                  <span className="ml-2">{certificate.issuer}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Type:</span>
                  <span className="ml-2">{certificate.type}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Issued:</span>
                  <span className="ml-2">{certificate.issueDate}</span>
                </div>
                {certificate.expiryDate && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Expires:</span>
                    <span className="ml-2">{certificate.expiryDate}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">ID:</span>
                  <span className="ml-2 font-mono">{certificate.verificationId}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
                <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates found</h3>
            <p className="text-gray-600 mb-6">There are no certificates matching your current filter.</p>
            <button 
              onClick={() => setFilter('all')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View All Certificates
            </button>
          </div>
        )}
      </div>
    </div>
  );
}