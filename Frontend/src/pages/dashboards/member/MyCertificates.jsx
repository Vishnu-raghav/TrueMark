import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listUserCertificates } from '../../../features/certificate/certificateSlice.js';

export default function MyCertificates() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [copiedId, setCopiedId] = useState('');

  const { certificates, isLoading, isError, message } = useSelector((state) => state.certificate);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(listUserCertificates());
  }, [dispatch]);

  // Filter certificates based on status
  const filteredCertificates = certificates.filter(cert => {
    if (filter === 'all') return true;
    if (filter === 'verified') return cert.status === 'active';
    if (filter === 'pending') return cert.status === 'pending';
    if (filter === 'expired') return cert.status === 'expired';
    return true;
  });

  const statusColors = {
    active: 'bg-green-100 text-green-800 border-green-200',
    revoked: 'bg-red-100 text-red-800 border-red-200',
    expired: 'bg-orange-100 text-orange-800 border-orange-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  const statusText = {
    active: '✅ Active',
    revoked: '❌ Revoked',
    expired: '⚠️ Expired',
    pending: '⏳ Pending'
  };

  const handleViewDetails = (certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
  };

  const handleCopyId = (certificateId) => {
    navigator.clipboard.writeText(certificateId);
    setCopiedId(certificateId);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const handleShare = async (certificate) => {
    const shareData = {
      title: certificate.title,
      text: `Check out my certificate: ${certificate.title}`,
      url: `${window.location.origin}/verify/${certificate.certificateId}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      // Fallback: copy verification link
      const verificationLink = `${window.location.origin}/verify/${certificate.certificateId}`;
      navigator.clipboard.writeText(verificationLink);
      alert('Verification link copied to clipboard!');
    }
  };

  const handleDownload = (certificate) => {
    if (certificate.fileUrl) {
      window.open(certificate.fileUrl, '_blank');
    } else {
      alert('Certificate file not available for download');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
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
                  {certificates.filter(c => c.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {certificates.filter(c => c.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {certificates.filter(c => c.status === 'expired').length}
                </div>
                <div className="text-sm text-gray-600">Expired</div>
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
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === 'active' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active
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
              <button
                onClick={() => setFilter('expired')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === 'expired' 
                    ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Expired
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 font-medium">Error:</div>
              <div className="text-red-600 ml-2">{message}</div>
            </div>
          </div>
        )}

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((certificate) => {
            const daysRemaining = getDaysRemaining(certificate.expiryDate);
            
            return (
              <div key={certificate._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                {/* Certificate Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">
                    {certificate.fileUrl ? '📜' : '📄'}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[certificate.status] || statusColors.pending}`}>
                      {statusText[certificate.status] || '⏳ Pending'}
                    </span>
                    {daysRemaining !== null && daysRemaining > 0 && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {daysRemaining} days left
                      </span>
                    )}
                    {daysRemaining !== null && daysRemaining <= 0 && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Expired
                      </span>
                    )}
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{certificate.title}</h3>
                  
                  {certificate.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{certificate.description}</p>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Issuer:</span>
                    <span className="ml-2">{certificate.issuedBy?.name || 'Unknown'}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Issued:</span>
                    <span className="ml-2">{formatDate(certificate.issueDate)}</span>
                  </div>
                  
                  {certificate.expiryDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Expires:</span>
                      <span className="ml-2">{formatDate(certificate.expiryDate)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-medium">ID:</span>
                      <span className="ml-2 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                        {certificate.certificateId}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyId(certificate.certificateId)}
                      className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                    >
                      {copiedId === certificate.certificateId ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Certificate Image Preview */}
                {certificate.fileUrl && (
                  <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={certificate.fileUrl} 
                      alt={certificate.title}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-32 bg-gray-100 items-center justify-center">
                      <span className="text-gray-400">Image not available</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2 mt-6 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => handleViewDetails(certificate)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleDownload(certificate)}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                    disabled={!certificate.fileUrl}
                  >
                    Download
                  </button>
                  <button 
                    onClick={() => handleShare(certificate)}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Share
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {certificates.length === 0 ? 'No certificates yet' : 'No certificates found'}
            </h3>
            <p className="text-gray-600 mb-6">
              {certificates.length === 0 
                ? "You haven't received any certificates yet." 
                : "There are no certificates matching your current filter."
              }
            </p>
            {certificates.length === 0 ? (
              <button 
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Refresh
              </button>
            ) : (
              <button 
                onClick={() => setFilter('all')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View All Certificates
              </button>
            )}
          </div>
        )}
      </div>

      {/* Certificate Detail Modal */}
      {showModal && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Certificate Details</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Certificate Image */}
              {selectedCertificate.fileUrl && (
                <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={selectedCertificate.fileUrl} 
                    alt={selectedCertificate.title}
                    className="w-full h-64 object-contain bg-gray-50"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Title</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedCertificate.title}</p>
                  </div>
                  
                  {selectedCertificate.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <p className="text-gray-900">{selectedCertificate.description}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Issuer</label>
                    <p className="text-gray-900">{selectedCertificate.issuedBy?.name || 'Unknown'}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Recipient</label>
                    <p className="text-gray-900">{user?.name || 'You'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Certificate ID</label>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-gray-100 px-3 py-2 rounded font-mono">
                        {selectedCertificate.certificateId}
                      </code>
                      <button
                        onClick={() => handleCopyId(selectedCertificate.certificateId)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {copiedId === selectedCertificate.certificateId ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Issue Date</label>
                    <p className="text-gray-900">{formatDate(selectedCertificate.issueDate)}</p>
                  </div>
                  
                  {selectedCertificate.expiryDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Expiry Date</label>
                      <p className="text-gray-900">{formatDate(selectedCertificate.expiryDate)}</p>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      statusColors[selectedCertificate.status] || statusColors.pending
                    }`}>
                      {statusText[selectedCertificate.status] || '⏳ Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => handleShare(selectedCertificate)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Share Certificate
                </button>
                <button 
                  onClick={() => handleDownload(selectedCertificate)}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
                  disabled={!selectedCertificate.fileUrl}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}