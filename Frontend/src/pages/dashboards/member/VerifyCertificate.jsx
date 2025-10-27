import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyCertificate } from '../../redux/certificate/certificateSlice';

export default function VerifyCertificate() {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message, certificate } = useSelector((state) => state.certificate);
  
  const [certificateId, setCertificateId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certificateId.trim()) return;

    try {
      const result = await dispatch(verifyCertificate(certificateId)).unwrap();
      setVerificationResult({ valid: true, certificate: result });
    } catch (error) {
      setVerificationResult({ valid: false, error: error });
    }
  };

  const recentVerifications = [
    { id: 'CERT-001', name: 'React Developer', status: 'valid', date: '2024-01-15' },
    { id: 'CERT-002', name: 'JavaScript Course', status: 'valid', date: '2024-01-10' },
    { id: 'CERT-003', name: 'Cloud Fundamentals', status: 'invalid', date: '2024-01-08' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Verify Certificate</h1>
          <p className="text-gray-600 mt-2">
            Verify the authenticity of any certificate using its unique ID
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Verification Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Enter Certificate ID</h2>
                  <p className="text-gray-600 text-sm">Paste the certificate verification ID below</p>
                </div>
              </div>

              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Verification ID
                  </label>
                  <input
                    type="text"
                    id="certificateId"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    placeholder="e.g., CERT-123456789"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !certificateId.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    'Verify Certificate'
                  )}
                </button>
              </form>

              {/* Verification Result */}
              {verificationResult && (
                <div className={`mt-6 p-4 rounded-xl border ${
                  verificationResult.valid 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      verificationResult.valid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {verificationResult.valid ? '✓' : '✗'}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        verificationResult.valid ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {verificationResult.valid ? 'Certificate is Valid' : 'Certificate Not Found'}
                      </h3>
                      <p className={`text-sm ${
                        verificationResult.valid ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {verificationResult.valid 
                          ? 'This certificate has been verified and is authentic.'
                          : verificationResult.error || 'The certificate ID you entered is invalid or does not exist.'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  {verificationResult.valid && verificationResult.certificate && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Certificate Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Name:</span>
                          <p className="font-medium">{verificationResult.certificate.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Issuer:</span>
                          <p className="font-medium">{verificationResult.certificate.issuer}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Issue Date:</span>
                          <p className="font-medium">{verificationResult.certificate.issueDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Status:</span>
                          <p className="font-medium text-green-600">Verified</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Recent Verifications */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Verifications</h3>
              <div className="space-y-3">
                {recentVerifications.map((verification) => (
                  <div key={verification.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{verification.name}</p>
                      <p className="text-sm text-gray-600">{verification.id}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      verification.status === 'valid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {verification.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Verification Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Ensure the certificate ID is correct</li>
                  <li>• Check for any typos or missing characters</li>
                  <li>• Contact support if verification fails</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}