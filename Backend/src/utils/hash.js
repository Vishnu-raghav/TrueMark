import crypto from "crypto";

/**
 * Generate SHA-256 hash of a given file buffer
 * @param {Buffer | string} data - File buffer or string data
 * @returns {string} - Hexadecimal hash
 */
export const generateHash = (data) => {
  if (!data) throw new Error("No data provided for hashing");

  // If data is string, convert to Buffer
  const bufferData = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf-8");

  // Generate SHA-256 hash
  const hash = crypto.createHash("sha256").update(bufferData).digest("hex");
  return hash;
};

/**
 * Compare two hashes securely
 * @param {string} hash1 
 * @param {string} hash2 
 * @returns {boolean} - true if both hashes match
 */
export const compareHash = (hash1, hash2) => {
  if (!hash1 || !hash2) return false;

  // Use timingSafeEqual for security (prevents timing attacks)
  const buf1 = Buffer.from(hash1, "hex");
  const buf2 = Buffer.from(hash2, "hex");

  // Length mismatch → automatically false
  if (buf1.length !== buf2.length) return false;

  return crypto.timingSafeEqual(buf1, buf2);
};
