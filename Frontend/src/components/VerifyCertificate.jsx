import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyCertificate } from "../features/certificate/certificateSlice.js";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, XCircle, FileText, Calendar, User, Building } from "lucide-react";

export default function VerifyCertificate() {
  const dispatch = useDispatch();
  const [certificateId, setCertificateId] = useState("");

  const { certificate, isLoading, isError, message, isSuccess } =
    useSelector((state) => state.certificate || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!certificateId.trim()) return;
    console.log("🔍 Verifying certificate ID:", certificateId.trim());
    dispatch(verifyCertificate(certificateId.trim()));
  };

  const certificateData = certificate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8 text-center">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Certificate Verification</h2>
        <p className="text-gray-300 mt-2 text-sm">
          Verify authenticity using Certificate ID
        </p>
      </div>

      {/* Form */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificate ID
            </label>
            <input
              type="text"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="Enter Certificate ID (e.g., ufiRsvLS)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white font-semibold py-3.5 rounded-xl hover:bg-gray-800 disabled:bg-gray-400 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying Certificate...
              </>
            ) : (
              "Verify Certificate"
            )}
          </button>
        </form>

        {/* Error State */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-6 rounded-xl bg-red-50 border border-red-200"
          >
            <div className="flex items-center gap-3 text-red-800">
              <XCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="font-semibold">Verification Failed</div>
                <p className="text-red-600 mt-1 text-sm">
                  {message || "Certificate verification failed. Please try again."}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Success State */}
        {isSuccess && certificateData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-6 rounded-xl bg-green-50 border border-green-200 space-y-4"
          >
            <div className="flex items-center gap-3 text-green-800">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <div className="font-semibold">Certificate Verified Successfully</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-600">Certificate Title</div>
                  <div className="font-medium">{certificateData.title || "N/A"}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Certificate ID</div>
                  <div className="font-mono font-medium text-gray-900">
                    {certificateData.certificateId || "N/A"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-600">Issued To</div>
                  <div className="font-medium">
                    {certificateData.recipient?.name || "N/A"}
                  </div>
                  {certificateData.recipient?.email && (
                    <div className="text-xs text-gray-500 mt-1">
                      {certificateData.recipient.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Building className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-600">Issued By</div>
                  <div className="font-medium">
                    {certificateData.issuedBy?.name || "N/A"}
                  </div>
                  {certificateData.issuedBy?.email && (
                    <div className="text-xs text-gray-500 mt-1">
                      {certificateData.issuedBy.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-600">Issue Date</div>
                  <div className="font-medium">
                    {certificateData.issueDate ? 
                      new Date(certificateData.issueDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      }) : "N/A"
                    }
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="font-medium capitalize text-green-700">
                    {certificateData.status || "Verified"}
                  </div>
                </div>
              </div>

              {certificateData.description && (
                <div className="flex items-start gap-3 text-gray-700 pt-2">
                  <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Description</div>
                    <div className="font-medium text-sm">
                      {certificateData.description}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {certificateData.fileUrl && (
              <div className="pt-4 border-t border-green-200">
                <a
                  href={certificateData.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  📄 View Certificate Document
                </a>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}