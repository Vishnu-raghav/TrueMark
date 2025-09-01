import crypto from "crypto";
import { nanoid } from "nanoid";

const SECRET_KEY = process.env.HMAC_SECRET || "MY_SUPER_SECRET_KEY";

export const generateHMAC = (data) => {
  if (!data) throw new Error("No data provided for hashing");
  const bufferData = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf-8");
  return crypto.createHmac("sha256", SECRET_KEY).update(bufferData).digest("hex");
};

export const compareHMAC = (hmac1, hmac2) => {
  if (!hmac1 || !hmac2) return false;

  const buf1 = Buffer.from(hmac1, "hex");
  const buf2 = Buffer.from(hmac2, "hex");
  if (buf1.length !== buf2.length) return false;

  return crypto.timingSafeEqual(buf1, buf2);
};

export const issueCertificate = (studentData) => {
  const verificationId = nanoid(8);
  const certData = JSON.stringify(studentData);
  const hmac = generateHMAC(certData);

  return {
    verificationId,
    studentData,
    hmac,
  };
};

export const verifyCertificate = (certId, studentData, storedHMAC) => {
  const dataToVerify = JSON.stringify(studentData);
  const inputHMAC = generateHMAC(dataToVerify);

  console.log(`Verifying Certificate ID: ${certId}`);
  return compareHMAC(inputHMAC, storedHMAC);
};
