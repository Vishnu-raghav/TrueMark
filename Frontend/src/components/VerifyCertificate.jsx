import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyCertificate } from "../features/certificate/certificateSlice.js";
import Input from "./Input";

export default function VerifyCertificate() {
  const dispatch = useDispatch();
  const [certificateId, setCertificateId] = useState("");

  const { certificate, isLoading, isError, message } =
    useSelector((state) => state.certificate || {}) ;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!certificateId) return;
    dispatch(verifyCertificate(certificateId));
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Verify Certificate</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Certificate ID"
          name="certificateId"
          placeholder="Enter Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {isError && <p className="text-red-500 mt-2">{message}</p>}
      {certificate && !isError && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="font-semibold">Certificate Verified ✅</p>
          <p>Name: {certificate.name}</p>
          <p>ID: {certificate.id}</p>
        </div>
      )}
    </div>
  );
}
