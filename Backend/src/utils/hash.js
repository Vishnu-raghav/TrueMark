import crypto from "crypto";
import { nanoid } from "nanoid";

export const generateHash = (data) => {
  if (!data) throw new Error("No data provided for hashing");

  const bufferData = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf-8");
  return crypto.createHash("sha256").update(bufferData).digest("hex");
};

export const compareHash = (hash1, hash2) => {
  if (!hash1 || !hash2) return false;

  const buf1 = Buffer.from(hash1, "hex");
  const buf2 = Buffer.from(hash2, "hex");
  if (buf1.length !== buf2.length) return false;

  return crypto.timingSafeEqual(buf1, buf2);
};

export const issueCertificate = (studentData) => {
  const verificationId = nanoid(8);
  const certData = JSON.stringify(studentData);
  const hash = generateHash(certData);

  return {
    verificationId,
    studentData,
    hash,
  };
};

export const verifyCertificate = (certId, inputHash, storedHash) => {
  console.log(`Verifying Certificate ID: ${certId}`);
  return compareHash(inputHash, storedHash);
};
