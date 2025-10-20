import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyCertificate } from "../features/certificate/certificateSlice.js";
import Input from "./Input";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";

export default function VerifyCertificate() {
  const dispatch = useDispatch();
  const [certificateId, setCertificateId] = useState("");

  const { certificate, isLoading, isError, message } =
    useSelector((state) => state.certificate || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!certificateId) return;
    dispatch(verifyCertificate(certificateId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl bg-white rounded-[30px] shadow-2xl overflow-hidden border border-gray-200"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 text-center">
        <h2 className="text-3xl font-bold tracking-wide">Certificate Verification</h2>
        <p className="text-md text-blue-100 mt-2">
          Quickly verify authenticity of your certificates
        </p>
      </div>

      {/* Form */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Certificate ID"
            name="certificateId"
            placeholder="Enter your Certificate ID"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            className="text-lg"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-blue-700 text-white font-semibold py-3 rounded-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Certificate"
            )}
          </button>
        </form>

        {/* Error Message */}
        {isError && (
          <p className="text-red-600 text-center mt-4 font-semibold">{message}</p>
        )}

        {/* Success Section */}
        {certificate && !isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 rounded-2xl bg-green-50 border border-green-200 shadow-md"
          >
            <div className="flex items-center gap-3 mb-4 text-green-800 font-bold text-lg">
              <CheckCircle className="w-6 h-6" /> Certificate Verified
            </div>
            <div className="text-gray-800 space-y-2 text-base">
              <p>
                <span className="font-semibold">Title:</span> {certificate.title}
              </p>
              <p>
                <span className="font-semibold">ID:</span> {certificate.certificateId}
              </p>
              <p>
                <span className="font-semibold">Description:</span> {certificate.description}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {certificate.status}
              </p>
              <a
                href={certificate.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-semibold"
              >
                View Certificate
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
